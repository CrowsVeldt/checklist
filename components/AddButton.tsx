import { router } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function AddButton() {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed ? [styles.button, styles.buttonPressed] : styles.button
      }
      onPress={() => router.push("/create")}
    >
      <Text style={styles.buttonText}>+</Text>
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
  buttonText: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
