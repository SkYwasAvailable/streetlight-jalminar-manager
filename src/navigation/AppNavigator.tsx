import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneAuthScreen } from '@/screens/PhoneAuthScreen';
import { AdminLoginScreen } from '@/screens/AdminLoginScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReportsScreen } from '@/screens/ReportsScreen';

export const AppNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneAuthScreen />} />
        <Route path="/admin-login" element={<AdminLoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};