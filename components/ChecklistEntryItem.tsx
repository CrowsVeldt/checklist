import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

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
  const width = useSharedValue(0);

  const strikeThrough: () => void = () => {
    width.value = checked ? withSpring(50) : withSpring(0);
  };

  return (
    <View>
      <Pressable
        onPress={() => {
          strikeThrough();
          setFinished(id);
          setChecked(!checked);
        }}
        style={styles.checklistItem}
      >
        <View style={styles.box}>
          {checked && <AntDesign name="check" size={30} color={"black"} />}
        </View>
        <Text
          style={
            checked
              ? [styles.itemCheckedText, styles.itemText]
              : styles.itemText
          }
        >
          {title}
        </Text>
        <Animated.View
          style={{
            height: 1,
            width,
            borderColor: "gray",
            borderWidth: 1,
            alignSelf: "center",
            position: "absolute",
            start: 140,
          }}
        />
        {required ? (
          <AntDesign name="exclamationcircleo" size={25} color="black" />
        ) : (
          <AntDesign name="exclamationcircleo" size={25} color="white" />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  checklistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  checklistCheckedItem: {
    backgroundColor: "lightgray",
  },
  itemText: {},
  itemCheckedText: {
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
