import { Link } from 'expo-router';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { markers } from '@/assets/markers';

export default function Profile() {
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        marginTop: 50,
      }}
    >
      {markers.map((marker) => (
        <Link
          key={marker.name}
          href={{ pathname: '/details', params: { name: marker.name } }}
          style={styles.card}
        >
          <View>
            <Text style={styles.name}>{marker.name}</Text>

            {/* <Text style={styles.subtitle}>
              {marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}
            </Text> */}

            <View style={styles.washroomContainer}>
              {marker.washrooms?.w1 && (
                <Text style={styles.washroom}>
                  W1: {marker.washrooms.w1.rating}
                </Text>
              )}
              {marker.washrooms?.w2 && (
                <Text style={styles.washroom}>
                  W2: {marker.washrooms.w2.rating}
                </Text>
              )}
              {marker.washrooms?.w3 && (
                <Text style={styles.washroom}>
                  W3: {marker.washrooms.w3.rating}
                </Text>
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

  washroomContainer: {
    gap: 9,
  },

  washroom: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },
});
