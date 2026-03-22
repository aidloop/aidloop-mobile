import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview"; // <-- Added WebView import

import API from "../api/api";
import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function Certificate() {
  const { regId } = useLocalSearchParams();
  const router = useRouter();

  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificateData = async () => {
      if (!regId) return;

      try {
        setLoading(true);
        const response = await API.get("/certificates/my-certificates");
        const allCertificates = response.data?.data || response.data || [];

        const foundCert = allCertificates.find(
          (cert) => cert.registrationId === regId,
        );

        if (foundCert) {
          setCertificate(foundCert);
        } else {
          Alert.alert(
            "Not Found",
            "We couldn't find a certificate for this event.",
          );
          router.back();
        }
      } catch (error) {
        console.error("Error fetching certificate:", error);
        Alert.alert("Error", "Could not load your certificate details.");
        router.back();
      } finally {
        setLoading(false);
      }
    };

    fetchCertificateData();
  }, [router, regId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ScreenInfo ScreenTitle={"Certificate"} />
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
          style={{ marginTop: 50 }}
        />
      </View>
    );
  }

  // --- THE WEBVIEW MAGIC ---
  // iOS reads PDFs directly. Android needs Google's viewer wrapper.
  const pdfUrl = certificate?.certificateUrl;
  const webViewSource =
    Platform.OS === "ios"
      ? { uri: pdfUrl }
      : {
          uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(pdfUrl)}`,
        };

  return (
    <View style={styles.container}>
      <ScreenInfo ScreenTitle={"Certificate"} />

      <View style={styles.content}>
        {/* REPLACED <Image> WITH <WebView> */}
        <View style={styles.webViewContainer}>
          <WebView
            source={webViewSource}
            style={styles.webView}
            startInLoadingState={true}
            renderLoading={() => (
              <ActivityIndicator
                size="small"
                color={COLORS.primary}
                style={styles.webviewLoader}
              />
            )}
          />
        </View>

        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={() => {
            if (certificate?.certificateUrl) {
              Linking.openURL(certificate.certificateUrl);
            }
          }}
        >
          <Text style={styles.downloadText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, padding: 20, alignItems: "center" },

  webViewContainer: {
    width: "100%",
    flex: 0.3,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    overflow: "hidden",

    marginBottom: 20,
  },
  webView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  webviewLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -10,
    marginTop: -10,
  },

  downloadBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 20,
  },
  downloadText: { color: "#fff", fontFamily: FONTS.semibold, fontSize: 24 },
});
