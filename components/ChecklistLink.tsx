import { ChecklistType } from "@/utils/types";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.button, styles.linkPressed] : styles.button
          }
          onPress={() =>
            router.push({
              pathname: "/edit",
              params: { id: list.id },
            })
          }
        >
          <AntDesign name="edit" size={24} color="black" />
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.button, styles.linkPressed] : styles.button
          }
          onPress={() => triggerModal(list)}
        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkPressed: {
    backgroundColor: "lightgray",
  },
  listTitle: {
    marginStart: 30,
  },
  button: {
    height: "100%",
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
