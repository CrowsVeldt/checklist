import ChecklistEntryInput from "@/components/ChecklistEntryInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import { ContextType, useContext, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

/*
      Create Screen contains:
        Title input: text
        Entry input: text, required, addChild
        Submit button: Add new list to list of lists

        Submit button should ask for confirmation before submitting
        User should be able to drag and drop items to different parts of the list
     */

export default function CreateChecklist() {
  const { addList }: ContextType<typeof AppContext> = useContext(AppContext);
  const [title, setTitle] = useState<string>("Title");
  const [entries, setEntries] = useState<ChecklistEntryType[]>([
    {
      id: randomUUID(),
      status: false,
      title: "Item 1",
      required: false,
      parentTo: [],
    },
  ]);
  const id: string = randomUUID();

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.titleInputWrapper}>
        <Text style={styles.titleLabel}>Title:</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View>
        {entries.map((item, index) => {
          if (item.parentTo.length > 0) {
            return (
              <View>
                <ChecklistEntryInput key={index} initialTitle={item.title} />
                {item.parentTo.map((item, index) => (
                  <ChecklistEntryInput
                    key={index}
                    initialTitle={item.title}
                    child={true}
                  />
                ))}
              </View>
            );
          } else {
            return (
              <ChecklistEntryInput key={index} initialTitle={item.title} />
            );
          }
        })}
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.addEntryButton, styles.buttonPressed]
              : styles.addEntryButton
          }
          onPress={() => {
            setEntries([
              ...entries,
              {
                id: randomUUID(),
                status: false,
                title: "New item",
                required: false,
                parentTo: [],
              },
            ]);
          }}
        >
          <Text>+</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.button, styles.buttonPressed] : styles.button
          }
          onPress={() => {
            addList({ id, title, entries });
            router.push({
              pathname: "/checklist/[checklist]",
              params: { checklist: id },
            });
          }}
        >
          <Text>Create</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
  titleInputWrapper: {
    flexDirection: "row",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "60%",
  },
  titleLabel: {
    width: "20%",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 20,
  },
  buttonPressed: {
    backgroundColor: "lightgray",
  },
  addEntryButton: {
    borderWidth: 1,
    borderColor: "black",
  },
});
