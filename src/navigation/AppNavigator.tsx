import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PhoneAuthScreen } from '@/screens/PhoneAuthScreen';
import { AdminLoginScreen } from '@/screens/AdminLoginScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReportsScreen } from '@/screens/ReportsScreen';
import { CategoryScreen } from '@/screens/CategoryScreen';

export const AppNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhoneAuthScreen />} />
        <Route path="/admin-login" element={<AdminLoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="/category/:type" element={<CategoryScreen />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
};