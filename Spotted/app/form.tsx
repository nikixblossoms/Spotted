import React, { useState } from "react";
import { Stack, useRouter, Link } from "expo-router";
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
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import {
    CameraView,
    CameraType,
    useCameraPermissions,
  } from "expo-camera";


export default function Form() {
    const router = useRouter();
    const [building, setBuilding] = useState<string | null>(null);

    const [toggles, setToggles] = useState({
        periodProducts: false,
        babyChanging: false,
        genderNeutral: false,
        familyFriendly: false,
    });

    const [levels, setLevels] = useState({
        accessibility: 1,
        familyFriendlyRooms: 1,
        cleanliness: 1,
      });

    const updateLevel = (
        key: keyof typeof levels,
        value: number
        ) => {
        setLevels((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const toggleItem = (key: keyof typeof toggles) => {
        setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const items = [
        { key: "periodProducts", label: "Period Products" },
        { key: "babyChanging", label: "Baby Changing" },
        { key: "genderNeutral", label: "Gender Neutral" },
    ] as const;

    const sliderItems = [
        { key: "accessibility", label: "Accessibility" },
        { key: "familyFriendlyRooms", label: "Family Friendly Rooms" },
        { key: "cleanliness", label: "Cleanliness" },
      ] as const;

    const levelText = {
        1: "Needs improvement",
        2: "Acceptable",
        3: "Excellent",
    };

    <Link href="/camera" asChild>
        <TouchableOpacity style={[styles.photoButton, {marginTop: 20}]}>
            <Text style={styles.photoButtonText}>Take Photo</Text>
        </TouchableOpacity>
    </Link>


    const handlePress = (page: string) => {
        router.push('/'); 
      };

      

    function BoxedSlider({
        title,
        value,
        onChange,
        }: {
        title: string;
        value: number;
        onChange: (v: number) => void;
        }) {
        return (
            <View style={styles.sliderBox}>
            {/* Title */}
            <Text style={styles.sliderTitle}>{title}</Text>
        
            {/* Slider */}
            <Slider
                minimumValue={1}
                maximumValue={3}
                step={1}
                value={value}
                onValueChange={onChange}
                minimumTrackTintColor="#f55f76"
                maximumTrackTintColor="#ddd"
                thumbTintColor="#f55f76"
            />
        
            {/* Subtitle */}
            <Text style={styles.sliderSubtitle}>
                {levelText[value as 1 | 2 | 3]}
            </Text>
            </View>
        );
    }
      

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

            <Text style={[styles.subtitle, { marginTop: 10 }]}>
                (Adjust the level to match what you noticed)
            </Text>


            <BoxedSlider
                title="Accessibility"
                value={levels.accessibility}
                onChange={(v) => updateLevel("accessibility", v)}
            />

            <BoxedSlider
                title="Family Friendly Rooms"
                value={levels.familyFriendlyRooms}
                onChange={(v) => updateLevel("familyFriendlyRooms", v)}
            />

            <BoxedSlider
                title="Cleanliness"
                value={levels.cleanliness}
                onChange={(v) => updateLevel("cleanliness", v)}
            />

            <Link href="/camera" asChild>
                <TouchableOpacity style={styles.photoButton}>
                    <Text style={styles.photoButtonText}>Take Photo</Text>
                </TouchableOpacity>
            </Link>


            {/* Submit Button */}
            <View style={[styles.buttonsContainer, {marginBottom: 80}]}>
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
  sliderBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    gap: 8,
  },
  
  sliderTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  
  sliderSubtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginTop: 4,
  },
  photoSection: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#fff",
  },

  photoTitle: { fontWeight: "700", marginBottom: 10 },

  photoButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#f55f76",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
    marginTop: 10,
    
  },
  photoButtonText: { color: "#f55f76", fontWeight: "700" },

  cameraWrapper: {
    width: "100%",
    height: 300,
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 12,
  },

  camera: {
    flex: 1,
  },


  cameraButtons: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  cameraBtn: {
    backgroundColor: "#00000080",
    padding: 10,
    borderRadius: 10,
  },

  cameraBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  photoPreview: {
    width: "100%",
    height: 200,
    borderRadius: 12,
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  permissionText: {
    textAlign: "center",
    marginBottom: 20,
  },
  permissionButton: {
    backgroundColor: "#f55f76",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  permissionButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});

