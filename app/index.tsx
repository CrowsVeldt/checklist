import NewListButton from "@/components/NewListButton";
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
        <View style={styles.modalButtonContainer}>
          <Pressable
            style={[styles.modalButton, styles.modalConfirmDeletion]}
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
      <View style={styles.listContainer}>
        <FlatList
          data={lists}
          renderItem={({ item, index }) => (
            <ChecklistLink
              list={item}
              triggerModal={(list: ChecklistType) => {
                setModalTarget(list);
                setModalVisible(true);
              }}
              first={index === 0}
              last={index === lists.length - 1}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <NewListButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
  listContainer: {
    width: "90%",
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
  modalConfirmDeletion: {
    backgroundColor: "red",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "60%",
  },
});
