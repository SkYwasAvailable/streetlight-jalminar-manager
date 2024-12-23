import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BottomNav } from '@/components/BottomNav';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['reports', searchQuery],
    queryFn: async () => {
      console.log('Fetching reports with search query:', searchQuery);
      let query = supabase
        .from('reports')
        .select(`
          *,
          items (
            id,
            name,
            type,
            location,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.textSearch('items.name', searchQuery);
      }

      const { data, error } = await query;
      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }
      console.log('Fetched reports:', data);
      return data;
    },
  });

  const getStatusColor = (status: string) => {
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
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">
                    {report.items?.name} ({report.items?.type})
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.items?.status || '')}`}>
                    {report.items?.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Location: {report.items?.location}</p>
                  <p>Reported: {format(new Date(report.created_at), 'PPP')}</p>
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

export default Reports;