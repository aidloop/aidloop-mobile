import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { SafeAreaView } from "react-native-safe-area-context";
import { resendOTP, verifyOTP } from "../api/auth";
import Back from "../assets/images/Back.svg";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function Otp() {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerifyCode = async () => {
    if (otpCode.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit code");
      return;
    }
    try {
      setLoading(true);
      await verifyOTP(String(email), otpCode);
      Alert.alert("Success", "Account verified successfully");
      router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Verification failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (timer > 0) return;

    try {
      setResending(true);
      await resendOTP(String(email));
      Alert.alert("OTP Sent", "A new OTP has been sent to your email");
      setTimer(30);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to resend OTP",
      );
    } finally {
      setResending(false);
    }
  };

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
            Enter the 6-digit code sent to {email}.
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <OtpInput
            numberOfDigits={6}
            focusColor={COLORS.primary}
            onTextChange={(text) => setOtpCode(text)}
            // onFilled={() => {
            //   router.replace("/resetPassword");
            // }}
            theme={{
              pinCodeContainerStyle: styles.pinCodeContainer,
              pinCodeTextStyle: styles.pinCodeText,
            }}
          />
        </View>

        <View>
          <Text style={styles.text1}>Didn&apos;t receive the code</Text>
          <TouchableOpacity
            disabled={timer > 0 || resending}
            onPress={handleResendCode}
          >
            <Text style={styles.text2}>
              {timer > 0 ? `Resend in (${timer}s)` : "Resend Code"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={otpCode.length < 6 || loading}
          // onPress={() => {
          //   router.push("/resetPassword");
          // }}
          onPress={handleVerifyCode}
          style={[
            styles.createBtn,
            {
              backgroundColor:
                otpCode.length === 6 ? COLORS.primary : COLORS.neutral,
            },
          ]}
        >
          <Text style={styles.btnText}>
            {loading ? "Verifying..." : "Verify Code"}
          </Text>
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
