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
  // const [newList, setNewList] = useState<ChecklistType>({
  // id: randomUUID(),
  // title,
  // entries: [],
  // });
  const [entries, setEntries] = useState<ChecklistEntryType[]>([
    {
      id: randomUUID(),
      status: false,
      title: "Entry Title",
      required: false,
      childOf: undefined,
      parentTo: undefined,
    },
  ]);

  // useEffect(() => {
  // const defaultList: ChecklistType = {
  // title,
  // id: randomUUID(),
  // entries: [
  // {
  // id: randomUUID(),
  // status: false,
  // title: "Entry Title",
  // required: false,
  // childOf: undefined,
  // parentTo: undefined,
  // },
  // ],
  // };
  // }, []);

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
        {entries.map((item, index) => (
          <ChecklistEntryInput key={index} />
        ))}
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
});
