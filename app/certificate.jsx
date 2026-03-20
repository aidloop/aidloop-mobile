import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ScreenInfo from "../components/screenInfo";
import { COLORS } from "../constants/colors";
import { FONTS } from "../constants/fonts";

export default function Certificate() {
  const { regId } = useLocalSearchParams();

  useEffect(() => {}, [regId]);

  return (
    <View style={styles.container}>
      <ScreenInfo ScreenTitle={"Certificate"} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {
          <Image
            source={require("../assets/images/Screenshot_20260319-104823 1.png")}
          />
        }

        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadText}>Download PDF</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: { padding: 20, alignItems: "center" },

  downloadBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
    justifyContent: "center",
    // gap: 10,
  },
  downloadText: { color: "#fff", fontFamily: FONTS.semibold, fontSize: 24 },
});
