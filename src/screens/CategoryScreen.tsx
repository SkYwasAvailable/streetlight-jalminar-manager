import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { LightbulbIcon, BuildingIcon, SearchIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tables } from '@/integrations/supabase/types/tables';
import { useToast } from '@/hooks/use-toast';

export const CategoryScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: items, isLoading } = useQuery({
    queryKey: ['items', type],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          reports:reports(count)
        `)
        .eq('type', type)
        .ilike('name', `%${searchQuery}%`)
        .order('name');
        
      if (error) throw error;
      return data as (Tables<'items'> & { reports: { count: number } })[];
    },
  });

  const handleReport = async (itemId: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to report an issue",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          item_id: itemId,
        });

      if (error) throw error;
      
      toast({
        title: "Report submitted",
        description: "Thank you for reporting this issue",
      });
      
      navigate('/reports');
    } catch (error) {
      console.error('Error creating report:', error);
      toast({
        title: "Error",
        description: "Failed to create report. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{type}s</h1>
        
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder={`Search ${type}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
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
                  <p>Reports: {item.reports?.[0]?.count || 0}</p>
                </div>
                
                <Button
                  onClick={() => handleReport(item.id)}
                  className="mt-3 w-full"
                  variant="destructive"
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