import { ScrollView, View } from "react-native";
import List from "../components/List";
import ScreenInfo from "../components/screenInfo";
import { policies } from "../data/privacyPolicies";

const Policy = () => {
  const list = policies;
  return (
    <View style={{ flex: 1 }}>
      <View>
        <ScreenInfo ScreenTitle={"Privacy Policy"} />
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

export default Policy;
