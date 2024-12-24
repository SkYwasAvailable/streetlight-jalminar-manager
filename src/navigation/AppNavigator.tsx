import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReportsScreen } from '@/screens/ReportsScreen';
import { CategoryScreen } from '@/screens/CategoryScreen';
import { AdminDashboardScreen } from '@/screens/AdminDashboardScreen';
import { AdminItemsScreen } from '@/screens/AdminItemsScreen';
import { CreateItemScreen } from '@/screens/CreateItemScreen';
import { ItemFormScreen } from '@/screens/ItemFormScreen';

export const AppNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
        <Route path="/admin/items" element={<AdminItemsScreen />} />
        <Route path="/admin/items/create" element={<CreateItemScreen />} />
        <Route path="/admin/items/create/:type" element={<ItemFormScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/reports" element={<ReportsScreen />} />
        <Route path="/category/:type" element={<CategoryScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};