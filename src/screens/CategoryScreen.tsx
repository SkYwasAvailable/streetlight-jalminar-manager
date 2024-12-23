import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { LightbulbIcon, BuildingIcon, SearchIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

export const CategoryScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();
  
  const { data: items = [], isLoading } = useQuery({
    queryKey: ['items', type, searchQuery],
    queryFn: async () => {
      const query = supabase
        .from('items')
        .select(`
          *,
          reports: reports(count)
        `)
        .eq('type', type);

      if (searchQuery) {
        query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      return data.map(item => ({
        ...item,
        reports: { count: item.reports[0]?.count || 0 }
      }));
    },
  });

  const createReport = useMutation({
    mutationFn: async (itemId: string) => {
      const { error } = await supabase
        .from('reports')
        .insert([{
          item_id: itemId,
          status: 'Problem'
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Report submitted",
        description: "Thank you for reporting this issue",
      });
      navigate('/reports');
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    },
  });

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
            {items.map((item) => (
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
                  <p>Reports: {item.reports.count}</p>
                </div>
                
                <Button
                  onClick={() => createReport.mutate(item.id)}
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