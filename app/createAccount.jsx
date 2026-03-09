import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

const Input = ({ InputText, placeholder, ...props }) => (
  <View style={styles.input}>
    <Text style={{ marginBottom: 8 }}>{InputText}</Text>
    <TextInput
      style={styles.formInput}
      placeholder={placeholder}
      placeholderTextColor={"grey"}
      {...props}
    />
  </View>
);
export default function CreateAccount() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid =
    fullName.length > 0 && email.length > 0 && password.length > 0;

  const handleRegister = () => {
    console.log("User Data:", "name:", fullName, "email", email);
  };

  return (
    <SafeAreaView style={styles.safeview}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled" // Automatically dismisses keyboard on tap!
          showsVerticalScrollIndicator={false}
        >
          <View>
            <View>
              <Text style={styles.heading}>Create an Account</Text>
              <Text style={styles.text}>
                Continue supporting your community
              </Text>
            </View>
            <TouchableOpacity style={styles.googleBtn}>
              <AntDesign name="google" size={24} color="green" />
              <Text style={styles.googletext}>Google</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.border} />
            <Text>or</Text>
            <View style={styles.border} />
          </View>
          <View style={styles.form}>
            <Input
              InputText={"Full Name"}
              placeholder={"e.g. John Doe Scott"}
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
            <Input
              InputText={"Email Address"}
              placeholder={"Your Email Address here..."}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              InputText={"Password"}
              placeholder={"Your password here"}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            onPress={handleRegister}
            disabled={!isFormValid}
            style={[
              styles.createBtn,
              { backgroundColor: isFormValid ? "navy" : "grey" },
            ]}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
          <View style={styles.bottomText}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.loginPress}> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: { flex: 1 },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  createBtn: {
    // backgroundColor: "navy",
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: 60,
    borderRadius: 30,
    marginTop: 30,
    marginBottom: 20,
  },

  loginText: {
    textAlign: "center",
    fontSize: 18,
  },
  loginPress: { fontSize: 18, color: "navy", fontWeight: 500 },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: 900,
    fontSize: 25,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    lineHeight: 26,
    marginTop: 20,
    paddingHorizontal: 60,
  },

  googletext: {
    fontSize: 20,
  },

  googleBtn: {
    flexDirection: "row",
    borderColor: "gray",
    marginVertical: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 50,
    borderRadius: 10,
  },

  scrollContainer: { padding: 30 },
  border: {
    borderWidth: 0.25,
    width: "45%",
    borderColor: "grey",
  },

  form: { marginVertical: 20 },
  input: { marginVertical: 15 },

  formInput: {
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 20,
  },

  bottomText: {
    position: "relative",
    bottom: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
});
