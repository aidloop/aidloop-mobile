import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import API from "../api/api";
import CameraIcon from "../assets/images/cameraicon.svg";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const Input = ({ label, placeholder, ...props }) => (
  <View style={styles.input}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput
      style={styles.formInput}
      placeholder={placeholder}
      placeholderTextColor="grey"
      {...props}
    />
  </View>
);

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState(""); // string version
  const [interests, setInterests] = useState(""); // string version
  const [image, setImage] = useState(null);

  const isFormValid =
    fullName.trim() && email.trim() && skills.trim() && interests.trim();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await API.get("/user/me");
        const data = res.data.user || res.data; // adjust if API wraps in user

        setFullName(data.fullName || "");
        setEmail(data.email || "");
        setSkills(data.skills?.join(", ") || "");
        setInterests(data.interests?.join(", ") || "");
        setImage(data.profileImage || null);
      } catch (err) {
        console.error(err);
        Alert.alert("Error", "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveChanges = async () => {
    try {
      setLoading(true);

      const payload = {
        fullName,
        email,
        skills: skills.split(",").map((s) => s.trim()),
        interests: interests.split(",").map((i) => i.trim()),
        profileImage: image,
      };

      const res = await API.put("/user/me", payload);

      console.log("UPDATED:", res.data);

      Alert.alert("Success", "Profile updated!");
      router.back();
    } catch (err) {
      console.log("ERROR FULL:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScreenInfo ScreenTitle="Edit Profile" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Image */}
          <View style={styles.imageWrapper}>
            <View style={styles.imageContainer}>
              <Image
                source={
                  image
                    ? { uri: image }
                    : require("../assets/images/defaultProfile.jpg")
                }
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
                <CameraIcon width={24} height={24} />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>Change Profile Photo</Text>
          </View>

          {/* Form Inputs */}
          <View style={styles.form}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
            <Input
              label="Email Address"
              placeholder="Enter your email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label="Skills"
              placeholder="Enter your skills, comma separated"
              value={skills}
              onChangeText={setSkills}
              autoCapitalize="words"
            />
            <Input
              label="Volunteer Interest"
              placeholder="Write your interests, comma separated"
              value={interests}
              onChangeText={setInterests}
              autoCapitalize="words"
            />
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            style={[
              styles.saveBtn,
              {
                backgroundColor: isFormValid ? COLORS.primary : COLORS.neutral,
                opacity: loading ? 0.7 : 1,
              },
            ]}
            onPress={handleSaveChanges}
            disabled={!isFormValid || loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  scroll: { flex: 1, paddingHorizontal: 20 },
  scrollContent: { paddingVertical: 30 },

  imageWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imageContainer: { width: 140 },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 140,
    borderWidth: 4,
    borderColor: "#9E9E9E",
    resizeMode: "cover",
  },
  cameraBtn: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 100,
  },
  changePhotoText: {
    fontSize: 20,
    fontFamily: FONTS.medium,
    marginTop: 30,
    textAlign: "center",
  },

  input: { marginVertical: 10 },
  inputLabel: {
    marginBottom: 6,
    color: "#000",
    fontSize: 16,
    fontFamily: FONTS.medium,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#9E9E9E",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },

  saveBtn: {
    width: "100%",
    borderRadius: 100,
    paddingVertical: 12,
    marginTop: 30,
    marginBottom: 50,
  },
  saveBtnText: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    fontFamily: FONTS.bold,
  },
});
