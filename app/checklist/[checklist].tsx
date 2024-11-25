import ChecklistItem from "@/components/ChecklistEntry";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checklist() {
  const { checklist } = useLocalSearchParams();
  return (
    <SafeAreaView style={styles.page}>
      <ChecklistItem title={checklist} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
});
