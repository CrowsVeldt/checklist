import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checklist() {
  const { checklist } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Text>{checklist}</Text>
    </SafeAreaView>
  );
}
