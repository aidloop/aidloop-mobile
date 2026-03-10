import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword() {
  return (
    <SafeAreaView style={styles.safeview}>
      <Text>This is a modal!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ safeview: { flex: 1, padding: 30 } });
