import { Link } from 'expo-router';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { markers } from '@/assets/markers';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Search() {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        marginTop: 50,
      }}
    >

      {/* Floating button */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>York U Washrooms</Text>

        <Link href="../form" asChild>
          <TouchableOpacity style={styles.floatingButton}>
            <Ionicons name="filter" size={24} color="white" />
          </TouchableOpacity>
        </Link>
      </View>


      {markers.map((marker) => (
        <Link
          key={marker.name}
          href={{ pathname: '../details', params: { name: marker.name } }}
          style={styles.card}
        >
          <View>
            <Text style={styles.name}>{marker.name}</Text>

            {/* INFO ROW */}
            <View style={styles.infoRow}>
              <Text style={styles.infoText}>⭐ {marker.ratingsCount ?? 0}</Text>
              <Text style={styles.infoText}>⏰ {marker.openingTime ?? 'N/A'}</Text>
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

          </View>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e0e0e0',
    padding: 23,
    borderRadius: 20,
    marginBottom: 8,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'left',
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },

  washroomContainer: {
    gap: 9,
  },

  washroom: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },

  floatingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f55f76",
    alignItems: "center",
    justifyContent: "center",
  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },

  infoText: {
    fontSize: 16,
    color: '#333',
  },

  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 14,
    color: '#333',
  },
  
  
});