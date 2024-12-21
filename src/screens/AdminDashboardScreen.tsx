import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { supabase } from '@/integrations/supabase/client';

export const AdminDashboardScreen = () => {
  const [reports, setReports] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          *,
          items (name, type),
          users (phone_number)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReportStatus = async (reportId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('reports')
        .update({ status: newStatus })
        .eq('id', reportId);

      if (error) throw error;
      fetchReports();
    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  const renderReport = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.itemName}>{item.items.name}</Text>
      <Text style={styles.phoneNumber}>User: {item.users.phone_number}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <Text 
          style={styles.button}
          onPress={() => updateReportStatus(item.id, 'Technician Assigned')}
        >
          Assign Technician
        </Text>
        <Text 
          style={styles.button}
          onPress={() => updateReportStatus(item.id, 'Problem Solved')}
        >
          Mark as Solved
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading reports...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      
      <FlatList
        data={reports}
        renderItem={renderReport}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    gap: 15,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});