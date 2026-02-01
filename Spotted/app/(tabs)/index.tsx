import React, { useEffect, useRef } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, Link, useRouter } from 'expo-router';
import { markers } from '@/assets/markers';

// const router = useRouter();


const INITIAL_REGION = {
  latitude: 43.7735,
  longitude: -79.502,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function App() {
  const mapRef = useRef<MapView>(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={focusMap}>
          <View style={{ padding: 10 }}>
            <Text>Focus</Text>
          </View>
        </TouchableOpacity>
      ),
    });
  }, []);

  const focusMap = () => {
    mapRef.current?.animateCamera(
      {
        center: {
          latitude: 43.7735,
          longitude: -79.502,
        },
        zoom: 18,
      },
      { duration: 1000 }
    );
  };

  const onRegionChange = (region: Region) => {
    console.log(region);
  };
  

  // const onCalloutPress = (marker: any, washroomKey: string) => {
  //   router.push({
  //     pathname: '/details',
  //     params: { name: marker.name, washroom: washroomKey },
  //   });
  // };
  

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        showsBuildings
        showsIndoors
        onRegionChangeComplete={onRegionChange}
        ref={mapRef}

        // iOS: limit camera zoom
        minZoomLevel={15}       // minimum zoom (Android)
        maxZoomLevel={20}       // maximum zoom (Android)
        zoomControlEnabled={true} // optional: show zoom buttons on Android

        // iOS only
        maxDelta={0.02}         // don't let users zoom out too far
        minDelta={0.005}        // don't let users zoom in too much
      >

        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker}>
            {/* tooltip is REQUIRED for scroll */}
            <Callout tooltip>
              <View style={styles.calloutContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {marker.name}
                </Text>

                <ScrollView
                  style={{ maxHeight: 180 }}
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={false}
                >
                  {marker.washrooms &&
                    Object.entries(marker.washrooms).map(([key, value]) => (
                      <TouchableOpacity
                        key={key}
                        style={styles.button}
                        // onPress={() => onCalloutPress(marker, key)} // <-- call your function here
                      >
                        <Text style={styles.buttonText}>
                          {key.toUpperCase()}: {value.rating}
                        </Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </Callout>

          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  calloutContainer: {
    width: 230,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },

  scrollContent: {
    gap: 10,
  },

  button: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
});
