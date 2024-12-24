import React from 'react';
import { CategoryCard } from '@/components/CategoryCard';

export const CreateItemScreen = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Item</h1>
        
        <div className="grid gap-4">
          <CategoryCard
            title="Street Light"
            image="/placeholder.svg"
            link="/admin/items/create/street-light"
          />
          <CategoryCard
            title="Jalminar"
            image="/placeholder.svg"
            link="/admin/items/create/jalminar"
          />
        </div>
      </div>
    </div>
  );
};