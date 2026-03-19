import { ScrollView, View } from "react-native";
import List from "../components/List";
import ScreenInfo from "../components/screenInfo";
import { terms } from "../data/terms";

const Terms = () => {
  const list = terms;
  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScreenInfo ScreenTitle={"Terms of Service"} />
      </View>
      <ScrollView
        style={{ padding: 20, flex: 1 }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {list.map((terms) => (
          <List
            key={terms.id}
            Term={`${terms.id}. ${terms.topic}`}
            description={terms.description}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Terms;
