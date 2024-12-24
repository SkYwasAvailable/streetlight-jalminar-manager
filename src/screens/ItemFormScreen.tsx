import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ItemFormData {
  name: string;
  location: string;
}

export const ItemFormScreen = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<ItemFormData>({
    defaultValues: {
      name: '',
      location: '',
    },
  });

  const onSubmit = async (data: ItemFormData) => {
    try {
      const { error } = await supabase
        .from('items')
        .insert([
          {
            type: type === 'street-light' ? 'Street Light' : 'Jalminar',
            name: data.name,
            location: data.location,
          },
        ]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Item created successfully',
      });

      navigate('/admin/items');
    } catch (error) {
      console.error('Error creating item:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create item',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New {type === 'street-light' ? 'Street Light' : 'Jalminar'}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create Item
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};