import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ChecklistEntryItem({
  title,
  required,
}: {
  title: string;
  required: boolean;
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
      <Checkbox value={checked} onValueChange={setChecked} />
      <Pressable
        style={checked ? [styles.checked, styles.checkbox] : styles.checkbox}
        onPress={() => setChecked(!checked)}
      >
        <View style={styles.box} />
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
  checkbox: {},
  checked: {}, 
  box: {
    borderWidth: 1,
    borderColor: "black",
    height: 20,
    width: 20,
  },
});
