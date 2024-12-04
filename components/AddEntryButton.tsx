import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function AddEntryButton({ add }: { add: any }) {
  return (
    <Pressable
      style={({ pressed }) =>
        pressed
          ? [styles.addEntryButton, styles.buttonPressed]
          : styles.addEntryButton
      }
      onPress={add}
    >
      <AntDesign name="plus" size={30} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  addEntryButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    width: 40,
    height: 40,
    marginVertical: 10,
  },
  buttonPressed: {
    backgroundColor: "gray",
  },
});

// setEntries([
// ...entries,
// {
// id: randomUUID(),
// status: false,
// title: "New item",
// required: false,
// parentTo: [],
// },
// ]);
