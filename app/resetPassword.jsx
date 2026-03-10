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
import Hide from "../assets/images/Hide.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

const Input = ({ InputText, placeholder, ...props }) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.input}>
      <Text style={styles.inputText}>{InputText}</Text>
      <View style={styles.passwordStyle}>
        <TextInput
          style={styles.formInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.neutral}
          secureTextEntry={hidePassword}
          {...props}
        />
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.hideBtn}
        >
          <Hide />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");

  const hasMinimumLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === cpassword && password !== "";

  const valid =
    hasMinimumLength && hasNumber && hasSpecialChar && passwordsMatch;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity
            style={{ margin: 20, width: 40, height: 40 }}
            onPress={() => router.back()}
          >
            <Back width={30} height={30} />
          </TouchableOpacity>

          <View style={styles.safeview}>
            <View style={{ marginBottom: 30 }}>
              <Text style={styles.heading}>Create New Password</Text>
              <Text style={styles.text}>
                Your new password must be different from your previous password
              </Text>
            </View>

            <Input
              InputText={"New Password"}
              placeholder={"Your password here"}
              value={password}
              onChangeText={setPassword}
            />
            <Input
              InputText={"Confirm Password"}
              placeholder={"Your password here"}
              value={cpassword}
              onChangeText={setcPassword}
            />

            <View style={styles.requirementsContainer}>
              <Text
                style={[
                  styles.rqrmtText,
                  { color: hasMinimumLength ? COLORS.neutral : "red" },
                ]}
              >
                {"\u2022"} At least 8 characters
              </Text>
              <Text
                style={[
                  styles.rqrmtText,
                  { color: hasNumber ? COLORS.neutral : "red" },
                ]}
              >
                {"\u2022"} One number
              </Text>
              <Text
                style={[
                  styles.rqrmtText,
                  { color: hasSpecialChar ? COLORS.neutral : "red" },
                ]}
              >
                {"\u2022"} One special character
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                router.replace("/resetSuccessful");
              }}
              disabled={!valid}
              style={[
                styles.createBtn,
                { backgroundColor: valid ? COLORS.primary : "grey" },
              ]}
            >
              <Text style={styles.btnText}>Reset Password</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: { paddingHorizontal: 30 },
  heading: {
    fontSize: 28,
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
  passwordStyle: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  hideBtn: {
    position: "absolute",
    right: 15,
    height: "100%",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLORS.neutral,
    fontFamily: FONTS.regular,
    marginTop: 15,
  },
  requirementsContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  rqrmtText: {
    fontFamily: FONTS.regular,
    fontSize: 14,
    marginTop: 5,
  },
  createBtn: {
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 22,
    fontFamily: FONTS.semibold,
  },
  input: { marginVertical: 10 },
  inputText: {
    marginBottom: 8,
    color: "#000000",
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
  formInput: {
    borderColor: "#9E9E9E",
    borderWidth: 1,
    borderRadius: 8,
    height: 54,
    paddingVertical: 7,
    paddingLeft: 15,
    paddingRight: 50,
    width: "100%",
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
});
