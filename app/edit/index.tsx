import AddEntryButton from "@/components/AddEntryButton";
import ChecklistItemInput from "@/components/ChecklistItemInput";
import TitleInput from "@/components/TitleInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType, ChecklistType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { ContextType, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
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

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [abandon, setAbandon] = useState<boolean>(false);

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

  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      if (e.data.action.type === "POP") {
        e.preventDefault();
        setModalVisible(true);
        if (abandon) {
          navigation.dispatch(e.data.action);
        }
        return () => {
          navigation.removeListener("beforeRemove", (e) => {});
        };
      }
    });
  }, [abandon]);

  return (
    <SafeAreaView style={styles.page}>
      <Modal visible={modalVisible} animationType="fade">
        <View style={styles.modalContentContainer}>
          <Text style={styles.modalTitle}>{`Warning!`}</Text>
          <Text style={styles.modalSubTitle}>{`All changes will be lost`}</Text>
          <View style={styles.modalButtonContainer}>
            <Pressable
              style={[styles.modalButton, styles.modalConfirmButton]}
              onPress={() => {
                setAbandon(true);
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
            <Pressable
              style={[styles.modalButton]}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.modalButtonText}>Oops, never mind</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.formContainer}>
        <TitleInput title={title} setTitle={setTitle} />
        <View>
          <FlatList
            style={styles.list}
            data={entries}
            renderItem={({ item, index }) => (
              <ChecklistItemInput
                id={item.id}
                initialTitle={item.title}
                initialRequired={item.required}
                onEntryChange={onEntryInputChange}
                remove={() => removeEntry(item.id)}
                first={index === 0}
                last={index === entries.length - 1}
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
                  title: `New item ${entries.length + 1}`,
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
                ? [
                    entries.length > 0
                      ? [styles.updateButtonActive, styles.buttonPressed]
                      : styles.updateButtonInactive,
                    styles.updateButton,
                  ]
                : [
                    entries.length > 0
                      ? styles.updateButtonActive
                      : styles.updateButtonInactive,
                    styles.updateButton,
                  ]
            }
            onPress={() => {
              if (entries.length > 0) {
                updateList({ id, title, entries });
                router.replace({
                  pathname: "/checklist/[checklist]",
                  params: { checklist: id },
                });
              }
            }}
          >
            <Text
              style={
                entries.length > 0
                  ? styles.updateButtonText
                  : [styles.updateButtonText, styles.updateButtonTextInactive]
              }
            >
              Update
            </Text>
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
  list: {
    height: "70%",
  },
  updateButton: {
    padding: 20,
    width: 140,
  },
  updateButtonActive: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "black",
  },
  updateButtonInactive: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "gray",
  },
  updateButtonText: {
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  updateButtonTextInactive: {
    color: "gray",
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
  modalContentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontSize: 25,
    marginBottom: 30,
  },
  modalSubTitle: {
    fontSize: 15,
    marginBottom: 30,
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
    width: "60%",
  },
});
