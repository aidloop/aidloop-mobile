import { router } from "expo-router";
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
import Back from "../assets/images/Back.svg";
import Google from "../assets/images/Google.svg";
import { FONTS } from "../constants/fonts";

const Input = ({ InputText, placeholder, ...props }) => (
  <View style={styles.input}>
    <Text style={styles.inputText}>{InputText}</Text>
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
        <Back
          width={30}
          height={30}
          onPress={() => {
            router.back();
          }}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
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
              <Google width={30} height={30} />
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
              { backgroundColor: isFormValid ? "#1F3A5F" : "grey" },
            ]}
          >
            <Text style={styles.btnText}>Create Account</Text>
          </TouchableOpacity>
          <View style={styles.bottomText}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.replace("/login");
              }}
            >
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
    // paddingVertical: 10,
    height: 60,
    borderRadius: 30,
    marginTop: 30,
    // marginBottom: 20,
    // paddingVertical: 18,
    paddingHorizontal: 30,
  },

  loginText: {
    textAlign: "center",
    fontSize: 18,
  },
  loginPress: { fontSize: 18, color: "#1F3A5F", fontWeight: 500 },
  btnText: {
    color: "white",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 24,
    fontFamily: "PoppinsSemiBold",
  },
  heading: {
    fontSize: 28,
    color: "#000000",
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "#6B7C93",
    fontWeight: 400,
    fontFamily: FONTS.regular,
    lineHeight: 26,
    marginTop: 20,
    paddingHorizontal: 60,
  },

  googletext: {
    fontSize: 16,
    fontFamily: "PoppinsMedium",
    fontWeight: 500,
  },

  googleBtn: {
    flexDirection: "row",
    borderColor: "#9E9E9EA8",
    marginVertical: 30,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    height: 54,
    borderRadius: 10,
  },

  scrollContainer: { padding: 30 },
  border: {
    borderWidth: 0.25,
    width: "45%",
    borderColor: "#9E9E9E",
  },

  // form: { marginVertical: 20 },
  input: { marginVertical: 10 },

  formInput: {
    borderColor: "#9E9E9E",
    borderWidth: 1,
    borderRadius: 8,
    height: 54,
    paddingVertical: 7,
    paddingLeft: 15,
    // paddingRight: 180,
    fontFamily: "PoppinsRegular",
    fontSize: 16,
  },

  bottomText: {
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },

  inputText: {
    marginBottom: 8,
    color: "#000000",
    fontFamily: "PoppinsRegular",
    fontSize: 16,
    fontWeight: 400,
  },
});
