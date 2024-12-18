import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function RequiredButton({
  initialState,
  changeState,
}: {
  initialState: boolean;
  changeState: any;
}) {
  const [active, setActive] = useState<boolean>(initialState);
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.required, styles.pressed] : styles.required
      }
      onPress={() => {
        setActive(!active);
        changeState(!active);
      }}
    >
      <AntDesign
        name="exclamationcircleo"
        size={24}
        color={active ? "black" : "gray"}
      />
      {!active && <View style={styles.lineThrough} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  required: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 50,
    borderStartColor: "black",
    borderStartWidth: 1,
  },
  pressed: {
    backgroundColor: "lightgray",
  },
  lineThrough: {
    position: "absolute",
    width: "48%",
    borderColor: "gray",
    borderWidth: 1,
    transform: [{rotate: "45deg"}]
  },
});
