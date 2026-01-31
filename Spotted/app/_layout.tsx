import { Stack } from "expo-router";


export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen 
          name='(tabs)' 
          options={{
              title: 'Home'
          }} 
      />
      <Stack.Screen 
        name='details' 
        options={{
          title: 'Report a Spot',
          headerBackButtonDisplayMode: 'minimal',
          // presentation: 'modal',
          presentation: 'formSheet',
          // sheetAllowedDetents: [0.8],
          // sheetAllowedDetents: [0.3, 0.5, 0.7],
          // sheetGrabberVisible: true,
          // headerShown: false,
        }} 
      />
    </Stack>
  );
  
}
