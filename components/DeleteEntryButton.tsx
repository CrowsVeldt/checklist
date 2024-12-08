import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function DeleteEntryButton({ remove }: { remove: () => void }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.deleteEntryButton, styles.buttonPressed]
          : styles.deleteEntryButton
      }
      onPress={remove}
    >
      <AntDesign name="delete" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  deleteEntryButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 50,
  },
  buttonPressed: {
    backgroundColor: "lightgray",
  },
});
