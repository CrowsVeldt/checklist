import AddButton from "@/components/AddButton";
import ChecklistLink from "@/components/ChecklistLink";
import { AppContext } from "@/context/AppContext";
import { ChecklistType } from "@/utils/types";
import { ContextType, useContext, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { getLists, deleteList }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTarget, setModalTarget] = useState<ChecklistType | undefined>();
  const lists: ChecklistType[] = getLists();

  const removeList: (list: ChecklistType) => void = (list) => {
    deleteList(modalTarget!);
  };

  return (
    <SafeAreaView style={styles.mainView}>
      <Modal visible={modalVisible} style={styles.modal} animationType="fade">
        <Text>Are you sure you want to delete the list?</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.modalButton, styles.confirmDeletion]}
            onPress={() => {
              removeList(modalTarget!);
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>Yes</Text>
          </Pressable>
          <Pressable
            style={[styles.modalButton]}
            onPress={() => {
              setModalTarget(undefined);
              setModalVisible(false);
            }}
          >
            <Text style={styles.modalButtonText}>No</Text>
          </Pressable>
        </View>
      </Modal>
      <View>
        <FlatList
          data={lists}
          renderItem={({ item }) => (
            <ChecklistLink
              list={item}
              triggerModal={(list: ChecklistType) => {
                setModalTarget(list);
                setModalVisible(true);
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
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
  confirmDeletion: {
    backgroundColor: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
