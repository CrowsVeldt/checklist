import AddEntryButton from "@/components/AddEntryButton";
import ChecklistItemInput from "@/components/ChecklistItemInput";
import TitleInput from "@/components/TitleInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import { ContextType, useContext, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const id: string = randomUUID();

  const removeEntry: (id: string) => void = (id) => {
    const index = entries.findIndex((item) => item.id === id);
    setEntries(entries.toSpliced(index, 1));
  };

  const onEntryInputChange: (
    entryId: string,
    entryTitle: string,
    entryRequired: boolean
  ) => void = (entryId, entryTitle, entryRequired) => {
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
      <Modal visible={modalVisible} style={styles.modal} animationType="fade">
        <Text>Are you done creating this list?</Text>
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={[styles.modalButton, styles.modalConfirmButton]}
            onPress={() => {
              addList({ id, title, entries });
              router.replace({
                pathname: "/checklist/[checklist]",
                params: { checklist: id },
              });
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton]}
            onPress={() => {
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>No</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.formContainer}>
        <TitleInput title={title} setTitle={setTitle} />
        <View>
          <FlatList
            style={styles.list}
            data={entries}
            renderItem={({ item }) => (
              <ChecklistItemInput
                id={item.id}
                initialTitle={item.title}
                initialRequired={item.required}
                onEntryChange={onEntryInputChange}
                remove={() => removeEntry(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />
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
                ? [styles.createButton, styles.buttonPressed]
                : styles.createButton
            }
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.createButtonText}>Create</Text>
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
    justifyContent: "flex-start",
  },
  list: {
    height: "70%"
  },
  createButton: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 20,
    width: 140,
  },
  createButtonText: {
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  buttonPressed: {
    backgroundColor: "lightgray",
  },
  modal: {
    height: 200,
    width: 200,
  },
  modalButton: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 40,
  },
  modalButtonText: {
    textAlign: "center",
    textAlignVertical: "center",
  },
  modalConfirmButton: {
    backgroundColor: "green",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
