import ChecklistEntryInput from "@/components/ChecklistEntryInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType, ChecklistType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
import { ContextType, useContext, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EditChecklist() {
  const { getListById, updateList }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const { id }: { id: string } = useLocalSearchParams();
  const list: ChecklistType | undefined = getListById(id);
  const [title, setTitle] = useState<string>(
    list != undefined ? list.title : ""
  );
  const [entries, setEntries] = useState<ChecklistEntryType[]>(
    list != undefined ? list.entries : []
  );

  const onEntryInputChange = (
    entryId: string,
    entryTitle: string,
    entryRequired: boolean
  ) => {
    const index = entries.findIndex((item) => item.id === entryId);
    setEntries(
      entries.toSpliced(index, 1, {
        id: entryId,
        status: false,
        title: entryTitle,
        required: entryRequired,
        parentTo: [],
      })
    );
  };

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
        {entries && entries.map((item, index) => {
            return (
              <ChecklistEntryInput
                key={index}
                id={item.id}
                initialTitle={item.title}
                initialRequired={item.required}
                onEntryChange={onEntryInputChange}
                remove={() => setEntries(entries.toSpliced(index, 1))}
              />
            );
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
            updateList({ id, title, entries });
            router.replace({
              pathname: "/checklist/[checklist]",
              params: { checklist: id },
            });
          }}
        >
          <Text>Update</Text>
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
