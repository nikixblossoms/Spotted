import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import Fontisto from '@expo/vector-icons/Fontisto';
import React from 'react'

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#ff6347',
            tabBarStyle: {
                borderTopWidth: 1,
                height: 90,
                paddingBottom: 30,
                paddingTop: 10,
            },
            headerShown: true, // CHANGE LATER!!
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
                    <Ionicons name='flash-outline' size={size} color={color} />
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