import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';

export const PhoneAuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    // Validate Indian phone number format
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert('Please enter a valid Indian phone number');
      return;
    }

    // For development, just show OTP input
    setShowOtpInput(true);
    
    // In production, uncomment this:
    /*
    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: phoneNumber
      });
      if (error) throw error;
      setShowOtpInput(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert(error.message);
    }
    */
  };

  const handleVerifyOtp = async () => {
    // For development, just navigate to home
    navigate('/home');
    
    // In production, uncomment this:
    /*
    try {
      const { error } = await supabase.auth.verifyOtp({
        phone: phoneNumber,
        token: otp,
        type: 'sms'
      });
      if (error) throw error;
      navigate('/home');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert(error.message);
    }
    */
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please verify your phone number to continue
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!showOtpInput ? (
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Enter phone number (+91)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <Button
                onClick={handleSendOtp}
                className="w-full"
              >
                Send OTP
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <Button
                onClick={handleVerifyOtp}
                className="w-full"
              >
                Verify OTP
              </Button>
            </div>
          )}
        </div>
      </div>

      <div 
        onClick={() => navigate('/admin-login')}
        className="absolute bottom-4 right-4 cursor-pointer text-blue-600 text-sm hover:text-blue-800"
      >
        Admin Login
      </div>
    </div>
  );
};