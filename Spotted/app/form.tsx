import { useState } from "react";
import { Stack, useRouter } from "expo-router";
import {
  ActionSheetIOS,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  View,
  TouchableOpacity,
} from "react-native";
import { markers } from "@/assets/markers"; 


export default function Form() {
    const router = useRouter();
    const [building, setBuilding] = useState<string | null>(null);

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
        { key: "accessible", label: "Accessible" },
        { key: "genderNeutral", label: "Gender Neutral" },
        { key: "familyFriendly", label: "Family Friendly Rooms" },
    ] as const;

    const handlePress = (page: string) => {
        router.push('/'); 
      };

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
                    options: ["Cancel", ...markers.map((m) => m.name)],
                    cancelButtonIndex: 0,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) return;
                    setBuilding(markers[buttonIndex - 1].name);
                }
                )
            }
            >
            <Text style={[styles.dropdownText, !building && { color: "#999" }]}>
                {building ?? "Select building"}
            </Text>
            </Pressable>

            <TextInput placeholder="Floor" placeholderTextColor="#D3D3D3" style={styles.input} />

            <Text style={styles.subtitle}>Key Amenities (Select all that apply)</Text>

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

            {/* Submit Button */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handlePress("index")}>
                <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            

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
    borderColor: "#f55f76",
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
    borderColor: "#f55f76",
    backgroundColor: "#f55f76",
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
    color: "#f55f76",
  },

  buttonsContainer: {
    width: '100%',
    marginTop: 24,
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

