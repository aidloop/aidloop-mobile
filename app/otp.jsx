import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import Back from "../assets/images/Back.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function Otp() {
  const [otpCode, setOtpCode] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <TouchableOpacity
        style={{ margin: 20, width: 30, height: 30 }}
        onPress={() => router.back()}
      >
        <Back width={30} height={30} />
      </TouchableOpacity>

      <View style={styles.safeview}>
        <View>
          <Text style={styles.heading}>Verify Code</Text>
          <Text style={styles.text}>
            Enter the 6-digit code sent to your email.
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <OtpInput
            numberOfDigits={6}
            focusColor={COLORS.primary}
            onTextChange={(text) => setOtpCode(text)}
            onFilled={() => {
              router.push("/resetPassword");
            }}
            theme={{
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
            }}
          />
        </View>

        <View>
          <Text style={styles.text1}>Didn&apos;t receive the code</Text>
          <TouchableOpacity>
            <Text style={styles.text2}>Resend Code</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={otpCode.length < 6}
          onPress={() => {
            router.push("/resetPassword");
          }}
          style={[
            styles.createBtn,
            {
              backgroundColor:
                otpCode.length === 6 ? COLORS.primary : COLORS.neutral,
            },
          ]}
        >
          <Text style={styles.btnText}>Verify Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeview: { paddingHorizontal: 30, flex: 1 },
  heading: {
    fontSize: 28,
    color: COLORS.primary,
    textAlign: "center",
    fontFamily: FONTS.semibold,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: COLORS.neutral,
    fontFamily: FONTS.regular,
    marginTop: 15,
  },
  otpContainer: {
    marginVertical: 40,
  },
  pinCodeContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.neutral,
  },
  pinCodeText: {
    fontSize: 22,
    fontFamily: FONTS.semibold,
    color: COLORS.primary,
  },
  createBtn: {
    width: "95%",
    alignSelf: "center",
    justifyContent: "center",
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 30,
    position: "relative",
    bottom: -30,
  },
  btnText: {
    color: COLORS.white,
    textAlign: "center",
    fontSize: 24,
    fontFamily: FONTS.semibold,
  },

  text1: {
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.neutral,
    textAlign: "center",
  },
  text2: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    textAlign: "center",
  },
});
