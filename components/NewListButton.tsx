import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function AddButton() {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.button, styles.buttonPressed] : styles.button
      }
      onPress={() => router.push("/create")}
    >
      <AntDesign name="plus" size={36} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
});
