import { useState } from "react";
import { Stack } from "expo-router";
import {
  ActionSheetIOS,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  View,
} from "react-native";

export default function Form() {
  const [building, setBuilding] = useState<string | null>(null);
  const [genderNeutral, setGenderNeutral] = useState(false);

    const [toggles, setToggles] = useState({
        periodProducts: false,
        babyChanging: false,
        accessible: false,
        genderNeutral: false,
        familyFriendly: false,
    });

    const toggleItem = (key: keyof typeof toggles) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const items = [
        { key: "periodProducts", label: "Period Products" },
        { key: "babyChanging", label: "Baby Changing" },
        { key: "genderNeutral", label: "Gender Neutral" },
        { key: "familyFriendly", label: "Family Friendly Changing Rooms" },
    ] as const;

  return (
    <>
      <Stack.Screen options={{ title: "Spotted Something? 🤔" }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>Location details</Text>

        {/* Building Dropdown */}
        <Pressable
          style={styles.dropdown}
          onPress={() =>
            ActionSheetIOS.showActionSheetWithOptions(
              {
                options: ["Cancel", "Library", "Science Building", "Student Centre"],
                cancelButtonIndex: 0,
              },
              (buttonIndex) => {
                if (buttonIndex === 0) return;
                setBuilding(
                  ["Library", "Science Building", "Student Centre"][buttonIndex - 1]
                );
              }
            )
          }
        >
          <Text style={[styles.dropdownText, !building && { color: "#999" }]}>
            {building ?? "Select building"}
          </Text>
        </Pressable>

        <TextInput placeholder="Floor" placeholderTextColor="#D3D3D3" style={styles.input} />

        <Text style={styles.subtitle}>Key Amenities</Text>

        {/* Toggles */}

        {items.map((item) => {
          const isActive = toggles[item.key];

          return (
            <View key={item.key} style={styles.toggleRow}>

              <Pressable
                style={[
                  styles.toggleButton,
                  isActive && styles.toggleButtonActive,
                ]}
                onPress={() => toggleItem(item.key)}
              >
                <View style={styles.toggleInner}>
                  <View
                    style={[
                      styles.dot,
                      isActive && styles.dotActive,
                    ]}
                  >
                    {isActive && <Text style={styles.check}>✓</Text>}
                  </View>

                  <Text
                    style={[
                      styles.toggleText,
                      isActive && styles.toggleTextActive,
                    ]}
                  >
                    {isActive ? item.label : item.label}
                  </Text>
                </View>
              </Pressable>
            </View>
          );
        })}
        


      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    textAlign: "left",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },

  dropdownText: {
    fontSize: 16,
    color: "#333",
  },

  toggleRow: {
    marginTop: 8,
  },

  toggleTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  toggleButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },

  toggleButtonActive: {
    borderColor: "#4CAF50",
    backgroundColor: "#fff",
  },

  toggleInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },

  dotActive: {
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF50",
  },

  check: {
    color: "#fff",
    fontWeight: "bold",
  },

  toggleText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },

  toggleTextActive: {
    color: "#4CAF50",
  },
});

