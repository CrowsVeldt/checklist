import ChecklistEntryItem from "@/components/ChecklistEntryItem";
import { AppContext } from "@/context/AppContext";
import { ChecklistType } from "@/utils/types";
import { Stack, useLocalSearchParams } from "expo-router";
import { ContextType, useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checklist() {
  const { getListById }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const [numberComplete, setNumberComplete] = useState<number>(0);
  const { checklist }: { checklist: string } = useLocalSearchParams();
  const list: ChecklistType | undefined = getListById(checklist);

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen
        options={{
          title: `${list?.title} - ${numberComplete}/${list?.entries.length}`,
        }}
      />
      {list &&
        list.entries.map((entry, index) => (
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
