import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

export const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // For development, create a user entry first
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select()
        .eq('phone_number', phoneNumber)
        .single();

      if (!existingUser) {
        // Create a new user entry
        const { error: insertError } = await supabase
          .from('users')
          .insert([
            { 
              phone_number: phoneNumber,
              id: crypto.randomUUID(), // Generate a random UUID for development
            }
          ]);

        if (insertError) {
          console.error('Error creating user:', insertError);
          toast({
            title: "Error",
            description: "Could not create user account. Please try again.",
            variant: "destructive"
          });
          return;
        }
      }

      // For development, skip actual phone verification
      console.log('Development mode: Skipping phone verification');
      navigate('/home');
      
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "An error occurred during sign in. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const goToAdminLogin = () => {
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in with Phone
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your phone number to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSignIn}>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1">
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 1234567890"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <Button variant="outline" onClick={goToAdminLogin}>
          Admin Login
        </Button>
      </div>
    </div>
  );
};