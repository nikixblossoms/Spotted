import React, { useEffect, useRef } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from 'expo-router';
import { markers } from "@/assets/markers";



const INITIAL_REGION = {
  latitude: 43.77350,
  longitude: -79.50200,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
}

export default function App() {
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            {/* Replace with an icon as needed */}
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      )
    })
  }, []);

  const focusMap = () => {
    const YorkUniversity = {
      latitude: 43.77350,
      longitude: -79.50200,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }

    mapRef.current?.animateCamera({ center: YorkUniversity, zoom: 18 }, { duration: 1000 });
  }

  const onRegionChange = (region: Region) => {
    console.log(region);
  };

  const onMarkerSelected = (marker: any) => {
    Alert.alert(marker.name);
  }

  const calloutPressed = () => {
    console.log("Callout pressed");
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}
      >
      {markers.map((marker, index) => (
        <Marker key={index} coordinate={marker}>
          <Callout onPress={calloutPressed}>
            <View style={{padding: 10}}>
              <Text style={{fontSize: 25}}>{marker.name}</Text>
            </View>
          </Callout>
        </Marker>
      ))}
      </MapView>
    </View>
  );
}
