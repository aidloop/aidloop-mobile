import { StyleSheet, View } from "react-native";
import { COLORS } from "../constants/colors";

const EventCards = () => {
  return (
    <View style={styles.card}>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.primary, height: 300 },
});
export default EventCards;
