import { ChecklistType } from "@/types";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ChecklistLink({ list }: { list: ChecklistType }) {
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
      <Text>{list.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
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
});
