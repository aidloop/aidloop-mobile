import { router } from "expo-router";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../assets/images/Back.svg";
import { COLORS } from "../constants/colors";
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
export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={{}}>
      <Back
        style={{ margin: 20 }}
        width={30}
        height={30}
        color={COLORS.primary}
        onPress={() => {
          router.back();
        }}
      />
      <View style={styles.safeview}>
        <View>
          <Text style={styles.heading}>Forgot Password</Text>
          <Text style={styles.text}>
            Enter your email to receive a verification code
          </Text>
        </View>
        <Input
          InputText={"Email Address"}
          placeholder={"example@email.com"}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          onPress={() => {
            router.push("/otp");
          }}
          disabled={email.length < 1}
          style={[
            styles.createBtn,
            { backgroundColor: email.length > 0 ? COLORS.primary : "grey" },
          ]}
        >
          <Text style={styles.btnText}>Send Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: { paddingHorizontal: 30 },
  heading: {
    fontSize: 28,
    color: "#000000",
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },

  text: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.neutral,
    fontWeight: 400,
    fontFamily: FONTS.regular,

    marginTop: 15,
  },

  createBtn: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
    // marginTop: 160,
    paddingHorizontal: 30,
  },

  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: 600,
    fontSize: 24,
    fontFamily: FONTS.semibold,
  },

  input: { marginVertical: 30 },

  inputText: {
    marginBottom: 8,
    color: "#000000",
    fontFamily: FONTS.regular,
    fontSize: 16,
    fontWeight: 400,
  },
  formInput: {
    borderColor: "#9E9E9E",
    borderWidth: 1,
    borderRadius: 8,
    height: 54,
    paddingVertical: 7,
    paddingLeft: 15,
    // paddingRight: 180,
    fontFamily: FONTS.regular,
    fontSize: 16,
  },
});
