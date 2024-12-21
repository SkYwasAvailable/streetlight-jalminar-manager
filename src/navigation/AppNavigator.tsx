import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PhoneAuthScreen } from '@/screens/PhoneAuthScreen';
import { AdminLoginScreen } from '@/screens/AdminLoginScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { ReportsScreen } from '@/screens/ReportsScreen';
import { AdminDashboardScreen } from '@/screens/AdminDashboardScreen';

type RootStackParamList = {
  PhoneAuth: undefined;
  AdminLogin: undefined;
  Main: undefined;
  AdminDashboard: undefined;
};

type TabParamList = {
  Home: undefined;
  Reports: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Reports" component={ReportsScreen} />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PhoneAuth">
        <Stack.Screen 
          name="PhoneAuth" 
          component={PhoneAuthScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AdminLogin" 
          component={AdminLoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};