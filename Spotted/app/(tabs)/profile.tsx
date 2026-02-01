import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  const username = "John Doe";
  const profilePic = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y";

  const handlePress = (page: string) => {
    router.push('../profile'); // navigates to /settings, /notifications, /help
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={{ uri: profilePic }} style={styles.profilePic} />
        <Text style={styles.username}>{username}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handlePress("settings")}>
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("notifications")}>
          <Text style={styles.buttonText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => handlePress("help")}>
          <Text style={styles.buttonText}>Help & Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    alignItems: 'center',
    gap: 35,
    marginTop: 100,
    borderRadius: 20,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },

  profileInfo: {
    alignItems: 'center',
    gap: 12,
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  buttonsContainer: {
    width: '100%',
    gap: 25,
  },

  button: {
    backgroundColor: '#f55f76',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
