import ChecklistEntryItem from "@/components/ChecklistEntryItem";
import { AppContext } from "@/context/AppContext";
import { ChecklistType } from "@/utils/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { ContextType, useContext } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checklist() {
  const { getListById }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const { checklist }: { checklist: string } = useLocalSearchParams();
  const list: ChecklistType | undefined = getListById(checklist);

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen options={{ title: list!.title }} />
      {list &&
        list.entries.map((entry) => (
          <ChecklistEntryItem
            title={entry.title}
            required={entry.required}
            key={entry.id}
          />
        ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
});
