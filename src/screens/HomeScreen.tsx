import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryCard } from '@/components/CategoryCard';
import { BottomNav } from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';

export const HomeScreen = () => {
  const navigate = useNavigate();
  
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
    <div className="min-h-screen bg-gray-50 pb-20 relative">
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
      
      <Button
        variant="ghost"
        size="sm"
        className="fixed bottom-20 right-4 text-gray-500 hover:text-gray-700"
        onClick={() => navigate('/admin-login')}
      >
        <LockKeyhole className="h-4 w-4" />
        <span className="sr-only">Admin Login</span>
      </Button>
      
      <BottomNav />
    </div>
  );
};