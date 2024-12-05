import ChecklistEntryItem from "@/components/ChecklistEntryItem";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType, ChecklistType } from "@/utils/types";
import { AntDesign } from "@expo/vector-icons";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { ContextType, useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

export default function Checklist() {
  const { getListById }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const { checklist }: { checklist: string } = useLocalSearchParams();
  const list: ChecklistType | undefined = getListById(checklist);
  const [entries, setEntries] = useState<ChecklistEntryType[] | undefined>(
    list?.entries
  );
  const [numberCompleted, setNumberCompleted] = useState<number>(0);
  const [editPressed, setEditPressed] = useState<boolean>(false);

  const setFinished: (id: string) => void = (id) => {
    try {
      if (entries != null) {
        const entry = entries.find((item) => item.id === id);
        if (entry != null) {
          const newEntries = entries.toSpliced(
            entries.findIndex((item) => item.id === id),
            1,
            {
              id: entry.id,
              title: entry.title,
              parentTo: entry.parentTo,
              required: entry.required,
              status: !entry.status,
            }
          );
          setEntries(newEntries);
        } else {
          throw new Error("Entry not found in checklist");
        }
      } else {
        throw new TypeError("Checklist entries property is null");
      }
    } catch (error) {
      console.warn("An error was thrown when updating checklist entry status");
      console.error(error);
    }
  };

  useEffect(() => {
    setNumberCompleted(() => {
      let v: number = 0;
      entries?.forEach((item) => {
        if (item.status === true) v++;
      });
      return v;
    });
  }, [entries]);

  useEffect(() => {
    (() => {
      if (numberCompleted === entries?.length) {
        Toast.show({
          text1: "Checklist Complete!",
        });
      }
    })();
  }, [numberCompleted]);

  return (
    <SafeAreaView style={styles.page}>
      <Stack.Screen
        options={{
          title: `${list?.title} - ${numberCompleted}/${entries?.length}`,
          headerRight: () => (
            <Pressable
              onPressIn={() => {
                setEditPressed(true);
                router.replace({
                  pathname: "/edit",
                  params: { id: checklist },
                });
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
            id={entry.id}
            title={entry.title}
            required={entry.required}
            setFinished={setFinished}
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
