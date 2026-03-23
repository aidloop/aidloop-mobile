import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
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
import Back from "../../assets/images/Back.svg";
import Hide from "../../assets/images/Hide.svg";
import { COLORS } from "../../constants/colors";
import { FONTS } from "../../constants/fonts";

import { resetPassword } from "../../api/auth";

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

  const { email, otp } = useLocalSearchParams();

  const emailParam = Array.isArray(email) ? email[0] : email;
  const otpParam = Array.isArray(otp) ? otp[0] : otp;

  const [loading, setLoading] = useState(false);

  const hasMinimumLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const passwordsMatch = password === cpassword && password !== "";

  const valid =
    hasMinimumLength && hasNumber && hasSpecialChar && passwordsMatch;

  const handleResetPassword = async () => {
    if (!valid) return;

    try {
      setLoading(true);
      console.log("Resetting password with:", emailParam, otpParam, password);

      await resetPassword(emailParam, otpParam, password.trim());

      router.replace("/auth/resetSuccessful");
    } catch (error) {
      Alert.alert(
        "Reset Password Error",
        error.response?.data?.message || "Reset failed",
      );
    } finally {
      setLoading(false);
    }
  };

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
            {cpassword.length > 0 && !passwordsMatch && (
              <Text style={{ color: "red", marginTop: 5 }}>
                Passwords do not match
              </Text>
            )}

            <View style={styles.requirementsContainer}>
              <Text
                style={[
                  styles.rqrmtText,
                  { color: hasMinimumLength ? COLORS.success : "red" },
                ]}
              >
                {"\u2022"} At least 8 characters
              </Text>
              <Text
                style={[
                  styles.rqrmtText,
                  { color: hasNumber ? COLORS.success : "red" },
                ]}
              >
                {"\u2022"} One number
              </Text>
              <Text
                style={[
                  styles.rqrmtText,
                  { color: hasSpecialChar ? COLORS.success : "red" },
                ]}
              >
                {"\u2022"} One special character
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleResetPassword}
              disabled={!valid}
              style={[
                styles.createBtn,
                { backgroundColor: valid ? COLORS.primary : "grey" },
              ]}
            >
              <Text style={styles.btnText}>
                {loading ? "Resetting..." : "Reset Password"}
              </Text>
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
