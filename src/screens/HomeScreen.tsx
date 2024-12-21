import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  StreetLights: undefined;
  Jalminars: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const categories = [
    {
      title: 'Street Light',
      image: 'https://images.unsplash.com/photo-1542662565-7e4b66bae529?auto=format&fit=crop&w=800',
      link: 'StreetLights'
    },
    {
      title: 'Jalminar',
      image: 'https://images.unsplash.com/photo-1576461419288-41be1a568c6b?auto=format&fit=crop&w=800',
      link: 'Jalminars'
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Utility Management</Text>
      
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate(category.link as keyof RootStackParamList)}
          >
            <Image
              source={{ uri: category.image }}
              style={styles.cardImage}
            />
            <View style={styles.cardOverlay} />
            <Text style={styles.cardTitle}>{category.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  grid: {
    gap: 20,
  },
  card: {
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  cardTitle: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});