import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { LightbulbIcon, BuildingIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Tables } from '@/integrations/supabase/types/tables';

export const CategoryScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  const { data: items, isLoading } = useQuery({
    queryKey: ['items', type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('type', type)
        .order('name');
        
      if (error) throw error;
      return data as Tables<'items'>[];
    },
  });

  const handleReport = async (itemId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          item_id: itemId,
        });

      if (error) throw error;
      
      navigate('/reports');
    } catch (error) {
      console.error('Error creating report:', error);
      alert('Failed to create report. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{type}s</h1>
        
        {isLoading ? (
          <div className="text-center py-4">Loading items...</div>
        ) : (
          <div className="space-y-4">
            {items?.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-3">
                  {item.type === 'Street Light' ? (
                    <LightbulbIcon className="w-6 h-6 text-blue-500" />
                  ) : (
                    <BuildingIcon className="w-6 h-6 text-blue-500" />
                  )}
                  <h3 className="font-semibold">{item.name}</h3>
                </div>
                
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Location: {item.location}</p>
                  {item.last_serviced && (
                    <p>Last Serviced: {format(new Date(item.last_serviced), 'PPP')}</p>
                  )}
                </div>
                
                <Button
                  onClick={() => handleReport(item.id)}
                  className="mt-3 w-full"
                  variant="secondary"
                >
                  Report Issue
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};