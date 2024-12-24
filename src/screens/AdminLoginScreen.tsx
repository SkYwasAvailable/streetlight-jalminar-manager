import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";

export const AdminLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user is admin
        const { data, error } = await supabase
          .from('users')
          .select('is_admin')
          .eq('phone_number', email)
          .maybeSingle();

        if (data?.is_admin) {
          navigate('/admin/dashboard');
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      
      // First sign in with Supabase Auth
      const { data: { session }, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) throw authError;

      // Then check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from('users')
        .select('is_admin')
        .eq('phone_number', email)
        .maybeSingle();

      if (adminError) throw adminError;

      if (!adminData?.is_admin) {
        throw new Error('Not authorized as admin');
      }

      toast({
        title: "Login successful",
        description: "Welcome back, admin!",
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h2>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <Button
              onClick={handleLogin}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="w-full mt-4"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};