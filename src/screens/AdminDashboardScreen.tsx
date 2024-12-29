import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AdminBottomNav } from '@/components/AdminBottomNav';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { LightbulbIcon, BuildingIcon } from 'lucide-react';

export const AdminDashboardScreen = () => {
  const { toast } = useToast();

  const { data: reports = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-reports'],
    queryFn: async () => {
      console.log('Fetching reports...');
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          items (*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reports:', error);
        throw error;
      }
      console.log('Fetched reports:', data);
      return data;
    },
  });

  const updateStatus = async (reportId: string, itemId: string, newStatus: string) => {
    console.log('Updating status:', { reportId, itemId, newStatus });
    try {
      // Update the item status
      const { error: itemError } = await supabase
        .from('items')
        .update({ status: newStatus })
        .eq('id', itemId);

      if (itemError) {
        console.error('Error updating item:', itemError);
        throw itemError;
      }
      console.log('Successfully updated item status');

      // Update the report status
      const { error: reportError } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('id', reportId);

      if (reportError) {
        console.error('Error updating report:', reportError);
        throw reportError;
      }
      console.log('Successfully updated report status');

      toast({
        title: "Status updated",
        description: `Status changed to ${newStatus}`,
      });

      // Refetch to update the UI
      await refetch();
    } catch (error) {
      console.error('Error in updateStatus:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status",
      });
    }
  };

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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

        {isLoading ? (
          <div className="text-center py-4">Loading reports...</div>
        ) : reports.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-500">No reports to display</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
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

                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    variant={report.status === 'Problem' ? 'default' : 'outline'}
                    onClick={() => updateStatus(report.id, report.items?.id, 'Problem')}
                  >
                    Problem
                  </Button>
                  <Button
                    size="sm"
                    variant={report.status === 'Technician Assigned' ? 'default' : 'outline'}
                    onClick={() => updateStatus(report.id, report.items?.id, 'Technician Assigned')}
                  >
                    Assign Tech
                  </Button>
                  <Button
                    size="sm"
                    variant={report.status === 'Solved' ? 'default' : 'outline'}
                    onClick={() => updateStatus(report.id, report.items?.id, 'Solved')}
                  >
                    Solved
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AdminBottomNav />
    </div>
  );
};