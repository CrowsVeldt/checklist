import AddEntryButton from "@/components/AddEntryButton";
import ChecklistEntryInput from "@/components/ChecklistEntryInput";
import TitleInput from "@/components/TitleInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType, ChecklistType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
import { ContextType, useContext, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.formContainer}>
        <TitleInput title={title} setTitle={setTitle} />
        <View>
          {entries &&
            entries.map((item, index) => {
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
          <AddEntryButton
            add={() => {
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
          />
        </View>
        <View>
          <Pressable
            style={({ pressed }) =>
              pressed
                ? [styles.updateButton, styles.buttonPressed]
                : styles.updateButton
            }
            onPress={() => {
              updateList({ id, title, entries });
              router.replace({
                pathname: "/checklist/[checklist]",
                params: { checklist: id },
              });
            }}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
  },
  updateButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 20,
    width: 140,
  },
  updateButtonText: {
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
});
