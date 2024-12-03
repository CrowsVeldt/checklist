import ChecklistEntryInput from "@/components/ChecklistEntryInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router } from "expo-router";
import { ContextType, useContext, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
      <Modal visible={modalVisible} style={styles.modal} animationType="fade">
        <Text>Are you done creating this list?</Text>
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={[styles.modalButton, styles.confirmAddition]}
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
      <View style={styles.titleInputWrapper}>
        <Text style={styles.titleLabel}>Title:</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <View>
        {entries &&
          entries.map((item, itemIndex) => {
            return (
              <View style={styles.entryInput} key={itemIndex}>
                <ChecklistEntryInput
                  id={item.id}
                  initialTitle={item.title}
                  initialRequired={item.required}
                  onEntryChange={onEntryInputChange}
                  remove={(itemIndex: number) =>
                    setEntries(entries.toSpliced(itemIndex, 1))
                  }
                />
              </View>
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
          onPress={() => setModalVisible(true)}
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
  confirmAddition: {
    backgroundColor: "green",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  entryInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
});
