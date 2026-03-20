import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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

        //Made a trick to find specific certificate that matches the registration ID passed from the previous screen
        const foundCert = allCertificates.find(
          (cert) => cert.registrationId === regId,
        );

        if (foundCert) {
          setCertificate(foundCert);
          console.log(certificate);
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

  return (
    <View style={styles.container}>
      <ScreenInfo ScreenTitle={"Certificate"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: certificate?.certificateUrl }}
          style={styles.previewImage}
        />
        <Text>{certificate?.certificateUrl}</Text>
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={() => {
            Linking.openURL(certificate.certificateUrl);
          }}
          //   disabled={isDownloading}
        >
          <Text style={styles.downloadText}>Download PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, backgroundColor: COLORS.white },
  scrollContent: { padding: 20, alignItems: "center" },
  previewImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
  },
  downloadBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "center",
  },
  downloadText: { color: "#fff", fontFamily: FONTS.semibold, fontSize: 24 },
});
