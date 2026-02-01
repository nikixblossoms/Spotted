import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react'
import Feather from '@expo/vector-icons/Feather';

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ff3b58',
            tabBarStyle: {
                borderTopWidth: 1,
                height: 90,
                paddingBottom: 30,
                paddingTop: 10,
            },
            headerShown: false, // CHANGE LATER (maybe)!!
            headerShadowVisible: false,
        }}
    >
        
        <Tabs.Screen
            name='search'
            options={{
                title:'Search',
                tabBarIcon: ({ color, size }) => (
                    <Fontisto name='search' size={size} color={color} />
                )
                
            }}
        />
        <Tabs.Screen
            name='index'
            options={{
                title:'Map',
                tabBarIcon: ({ color, size }) => (
                    <Feather name="map-pin" size={size} color={color} />
                )
            }}
        />
        <Tabs.Screen
            name='profile'
            options={{
                title:'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name='person-outline' size={size} color={color} />
                )
            }}
        />
        
    </Tabs>
  )
}

export default TabsLayout