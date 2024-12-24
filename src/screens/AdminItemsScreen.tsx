import React from 'react';
import { AdminBottomNav } from '@/components/AdminBottomNav';
import { CategoryCard } from '@/components/CategoryCard';

export const AdminItemsScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Items</h1>
        
        <div className="grid gap-4">
          <CategoryCard
            title="Create New Item"
            image="/placeholder.svg"
            link="/admin/items/create"
          />
          <CategoryCard
            title="Edit Existing Item"
            image="/placeholder.svg"
            link="/admin/items/edit"
          />
        </div>
      </div>
      <AdminBottomNav />
    </div>
  );
};