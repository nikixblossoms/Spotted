import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import { markers } from "@/assets/markers";

export default function Details() {
  const params = useLocalSearchParams();
  const markerName = params.name as string | undefined;

  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    if (markerName) {
      const found = markers.find((m) => m.name === markerName);
      setMarker(found);
    }
  }, [markerName]);

  if (!marker) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: marker.name,
          sheetAllowedDetents: [0.8],
        }}
      />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{marker.name}</Text>

        {/* Address */}
        <Text style={styles.address}>{marker.address}</Text>

        {/* INFO ROW */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>⭐ {marker.ratingsCount ?? 0}</Text>
          <Text style={styles.infoText}>⏰ {marker.openingTime ?? "N/A"}</Text>
        </View>

        {/* FILTER CHIPS */}
        <View style={styles.chipsRow}>
          {marker.filters?.periodProducts && (
            <Text style={styles.chip}>Period Products</Text>
          )}
          {marker.filters?.babyChanging && (
            <Text style={styles.chip}>Baby Changing</Text>
          )}
          {marker.filters?.genderNeutral && (
            <Text style={styles.chip}>Gender Neutral</Text>
          )}
          {marker.filters?.familyRoom && (
            <Text style={styles.chip}>Family Room</Text>
          )}
        </View>

        {/* Washrooms */}
        <Text style={styles.subtitle}>Washrooms</Text>

        {marker.washrooms &&
          Object.entries(marker.washrooms).map(([key, value]: any) => (
            <View key={key} style={styles.washroomCard}>
              <Text style={styles.washroomTitle}>{key.toUpperCase()}</Text>
              <Text style={styles.washroomText}>Type: {value.type}</Text>
              <Text style={styles.washroomText}>
                Accessibility: {value.accessibility}
              </Text>
              <Text style={styles.washroomText}>{value.description}</Text>
              <Text style={styles.washroomRating}>{value.rating}</Text>
            </View>
          ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "left",
  },

  address: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    textAlign: "left",
    marginTop: 8,
  },

  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  infoText: {
    fontSize: 16,
    color: "#333",
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    fontSize: 14,
    color: "#333",
  },

  washroomCard: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },

  washroomTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },

  washroomText: {
    fontSize: 14,
    color: "#333",
  },

  washroomRating: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
