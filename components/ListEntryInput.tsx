import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ListEntryInput() {
  const [title, setTitle] = useState<string>("Entry Title");
  const [required, setRequired] = useState<boolean>(false);
  return (
    <View style={styles.inputWrapper}>
      <TextInput value={title} onChangeText={setTitle} />
      <View style={styles.requiredWrapper}>
        <Text>Required?</Text>
        <Checkbox
          style={styles.required}
          value={required}
          onValueChange={setRequired}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "70%"
  },
  requiredWrapper: {
    alignItems: "center",
  },
  required: {
    borderRadius: 5,
  },
});
