import { ChecklistType } from "@/utils/types";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ChecklistLink({
  list,
  triggerModal,
}: {
  list: ChecklistType;
  triggerModal: any;
}) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/checklist/[checklist]",
          params: { checklist: list.id },
        })
      }
      style={({ pressed }) =>
        pressed ? [styles.link, styles.linkPressed] : styles.link
      }
    >
      <Text style={styles.listTitle}>{list.title}</Text>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.deleteButton, styles.linkPressed]
            : styles.deleteButton
        }
        onPress={() => triggerModal(list)}
      >
        <AntDesign name="delete" size={24} color="black" />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  linkPressed: {
    backgroundColor: "lightgray",
  },
  listTitle: {
    marginStart: 30,
  },
  deleteButton: {
    marginStart: "auto",
    height: "100%",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
