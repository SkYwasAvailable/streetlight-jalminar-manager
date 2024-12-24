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
      console.log('Fetching items with search query:', searchQuery);
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
      if (error) {
        console.error('Error fetching items:', error);
        throw error;
      }
      console.log('Fetched items:', data);
      return data.map(item => ({
        ...item,
        reports: { count: item.reports[0]?.count || 0 }
      }));
    },
  });

  const createReport = useMutation({
    mutationFn: async (itemId: string) => {
      console.log('Creating report for item:', itemId);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // First update the item status
      const { error: itemError } = await supabase
        .from('items')
        .update({ status: 'Problem' })
        .eq('id', itemId);

      if (itemError) {
        console.error('Error updating item status:', itemError);
        throw itemError;
      }

      // Then create the report
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          item_id: itemId,
          user_id: user.id,
          status: 'Problem'
        }])
        .select();

      if (error) {
        console.error('Error creating report:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] });
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for reporting this issue. Our team will look into it.",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast({
        title: "Error",
        description: "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Problem':
        return 'text-red-500';
      case 'Technician Assigned':
        return 'text-yellow-500';
      case 'Solved':
        return 'text-green-500';
      default:
        return 'text-gray-500';
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
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.type === 'Street Light' ? (
                      <LightbulbIcon className="w-6 h-6 text-blue-500" />
                    ) : (
                      <BuildingIcon className="w-6 h-6 text-blue-500" />
                    )}
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                  <span className={`font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Location: {item.location}</p>
                  {item.last_serviced && (
                    <p>Last Serviced: {format(new Date(item.last_serviced), 'PPP')}</p>
                  )}
                  <p>Reports: {item.reports.count}</p>
                </div>
                
                <Button
                  onClick={() => {
                    console.log('Report button clicked for item:', item.id);
                    createReport.mutate(item.id);
                  }}
                  className="mt-3 w-full"
                  variant="destructive"
                  disabled={createReport.isPending}
                >
                  {createReport.isPending ? 'Submitting Report...' : 'Report Issue'}
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