import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

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
      style={styles.required}
      onPress={() => {
        setActive(!active);
        changeState(!active);
      }}
    >
      <AntDesign
        name="exclamationcircleo"
        size={45}
        color={active ? "black" : "white"}
        style={styles.checkmark}
      />
      <Text>Required?</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  required: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  checkmark: {
    position: "absolute",
    left: 10,
  },
});