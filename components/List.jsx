import { Text, View } from "react-native";
import { FONTS } from "../constants/fonts";

const List = ({ Term, description }) => {
  return (
    <View style={{ padding: 10 }}>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontFamily: FONTS.semibold, fontSize: 16 }}>{Term}</Text>
      </View>
      <View>
        <Text style={{ fontFamily: FONTS.regular, fontSize: 12 }}>
          {description}
        </Text>
      </View>
    </View>
  );
};

export default List;
