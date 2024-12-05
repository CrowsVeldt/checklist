import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ChecklistEntryItem({
  id,
  title,
  required,
  setFinished,
}: {
  id: string;
  title: string;
  required: boolean;
  setFinished: (id: string) => void;
}) {
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <View
      style={
        checked
          ? [styles.checklistCheckedItem, styles.checklistItem]
          : styles.checklistItem
      }
    >
      <Pressable
        onPress={() => {
          setFinished(id);
          setChecked(!checked);
        }}
      >
        <View style={styles.box}>
          {checked && <AntDesign name="check" size={30} color={"black"} />}
        </View>
      </Pressable>
      <Text
        style={
          checked ? [styles.itemCheckedText, styles.itemText] : styles.itemText
        }
      >
        {title}
      </Text>
      {required ? (
        <AntDesign name="exclamationcircleo" size={25} color="black" />
      ) : (
        <AntDesign name="exclamationcircleo" size={25} color="white" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  checklistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  checklistCheckedItem: {
    backgroundColor: "lightgray",
  },
  itemText: {},
  itemCheckedText: {
    textDecorationLine: "line-through",
    textDecorationColor: "black",
    textDecorationStyle: "solid",
    color: "gray",
  },
  box: {
    borderWidth: 1,
    borderColor: "black",
    height: 30,
    width: 30,
  },
});
