import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ({ title }: { title: string }) {
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
      <Text
        style={
          checked ? [styles.itemCheckedText, styles.itemText] : styles.itemText
        }
      >
        {title}
      </Text>
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
});
