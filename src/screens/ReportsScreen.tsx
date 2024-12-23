import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { LightbulbIcon, BuildingIcon, SearchIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';

export const ReportsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: reports, isLoading } = useQuery({
    queryKey: ['reports', searchQuery],
    queryFn: async () => {
      const query = supabase
        .from('reports')
        .select(`
          *,
          items (*)
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query.textSearch('items.name', searchQuery);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'Problem':
        return 'bg-red-100 text-red-800';
      case 'Technician Assigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'Solved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Reports</h1>
        
        <div className="relative mb-6">
          <Input
            type="search"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        {isLoading ? (
          <div className="text-center py-4">Loading reports...</div>
        ) : reports?.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-500">No reports yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports?.map((report) => (
              <div key={report.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center gap-3">
                  {report.items?.type === 'Street Light' ? (
                    <LightbulbIcon className="w-6 h-6 text-blue-500" />
                  ) : (
                    <BuildingIcon className="w-6 h-6 text-blue-500" />
                  )}
                  <h3 className="font-semibold">{report.items?.name}</h3>
                </div>
                
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Location: {report.items?.location}</p>
                  {report.items?.last_serviced && (
                    <p>Last Serviced: {format(new Date(report.items.last_serviced), 'PPP')}</p>
                  )}
                  <p>Reported on: {format(new Date(report.created_at || ''), 'PPP')}</p>
                </div>
                
                <div className="mt-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status || 'Not Solved'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};