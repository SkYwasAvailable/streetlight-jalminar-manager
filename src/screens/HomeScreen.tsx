import React from 'react';
import { CategoryCard } from '@/components/CategoryCard';
import { BottomNav } from '@/components/BottomNav';

export const HomeScreen = () => {
  const categories = [
    {
      title: 'Street Light',
      image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&w=800',
      link: '/category/Street Light'
    },
    {
      title: 'Jalminar',
      image: 'https://images.unsplash.com/photo-1576461419288-41be1a568c6b?auto=format&fit=crop&w=800',
      link: '/category/Jalminar'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Utility Management
        </h1>
        
        <div className="grid gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              image={category.image}
              link={category.link}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};