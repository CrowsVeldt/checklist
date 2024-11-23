import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function CreateChecklist() {
  const [title, setTitle] = useState<string>("Title");
  /*
      Create Screen contains:
        Title input: text
        Entry input: text, required, addChild
        Submit button: Add new list to list of lists

        User should be able to drag and drop items to different parts of the list
     */
  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.titleInputWrapper}>
        <Text style={styles.titleLabel}>Title:</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
        />
      </View>
      <Pressable
        style={({ pressed }) =>
          pressed ? [styles.button, styles.buttonPressed] : styles.button
        }
        onPress={() => console.log("shit")}
      >
        <Text>Create</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
  },
  titleInputWrapper: {
    flexDirection: "row",
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "60%",
  },
  titleLabel: {
    width: "20%",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 20,
  },
  buttonPressed: {
    backgroundColor: "lightgray",
  },
});
