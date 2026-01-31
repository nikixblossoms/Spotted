import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text, ScrollView, StyleSheet, TextInput } from "react-native";


export default function Details() {

  const params = useLocalSearchParams();

  // console.log(params);

  useEffect(() => {}, []);

  async function fetchLocationByName(name: string) {
    try {

    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Report a Spot', sheetAllowedDetents: [0.8],}} />
      <ScrollView
        contentContainerStyle={{
          gap: 16,
          padding: 16,
          // backgroundColor: 'pink',
        }}
      >
        <Text style={styles.subtitle}>Location details</Text>
        {/* <Text>{params.name}</Text> */}
        <TextInput
          placeholder="Place Name"
          placeholderTextColor="#D3D3D3"
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          placeholderTextColor="#D3D3D3"
          style={styles.input}
        />

        <Text style={styles.subtitle}>Key Amenities</Text>
        
        
      </ScrollView>
    </>

  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});