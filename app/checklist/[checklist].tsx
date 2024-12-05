import ChecklistEntryItem from "@/components/ChecklistEntryItem";
import { AppContext } from "@/context/AppContext";
import { ChecklistType } from "@/utils/types";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ContextType, useContext, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Checklist() {
  const { getListById }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const [editPressed, setEditPressed] = useState<boolean>(false);
  const { checklist }: { checklist: string } = useLocalSearchParams();
  const list: ChecklistType | undefined = getListById(checklist);

  // track state of checkboxes so that checklist knows how many have been checked

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen
        options={{
          title: `${list?.title} - ${0}/${list?.entries.length}`,
          headerRight: () => (
            <Pressable
              onPressIn={() => {
                setEditPressed(true);
                router.push({ pathname: "/edit", params: { id: checklist } });
              }}
              onPressOut={() => {
                setEditPressed(false);
              }}
            >
              <AntDesign
                name="edit"
                size={30}
                color="black"
                style={editPressed ? styles.pressed : ""}
              />
            </Pressable>
          ),
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
  pressed: {
    backgroundColor: "gray",
  },
});
