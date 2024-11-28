import ChecklistEntryInput from "@/components/ChecklistEntryInput";
import { ChecklistEntryType, ChecklistType } from "@/types";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
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

        User should be able to drag and drop items to different parts of the list
     */

export default function CreateChecklist() {
  const [title, setTitle] = useState<string>("Title");
  const [update, setUpdate] = useState<boolean>(false);
  const [entries, setEntries] = useState<ChecklistEntryType[]>([
    {
      id: randomUUID(),
      status: false,
      title: "Item 1",
      required: false,
      parentTo: [
        {
          id: randomUUID(),
          status: false,
          title: "Item 1b",
          required: false,
          parentTo: [],
        },
      ],
    },
  ]);

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
            // return an entry with it's sub-entries as children
            // <entry>{children.map((item) => sub-entries)}</entry>
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
        >
          <Text>+</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.button, styles.buttonPressed] : styles.button
          }
          onPress={() => console.log("shit")}
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
