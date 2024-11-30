import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ListEntryInput({
  id,
  initialTitle,
  initialRequired,
  child,
  onEntryChange,
}: {
  id: string
  initialTitle: string;
  child?: boolean;
  initialRequired?: boolean;
  onEntryChange: any;
}) {
  const [title, setTitle] = useState<string>(
    initialTitle != null ? initialTitle : "Entry Title"
  );
  const [required, setRequired] = useState<boolean>(
    initialRequired != null ? initialRequired : false
  );

  useEffect(() => {
    onEntryChange(id, title, required, child);
  }, [title, required]);

  return (
    <View
      style={child ? [styles.inputWrapper, styles.child] : styles.inputWrapper}
    >
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
    width: "70%",
  },
  requiredWrapper: {
    alignItems: "center",
  },
  required: {
    borderRadius: 5,
  },
  child: {
    backgroundColor: "dirtywhite",
    marginStart: 50,
    borderStartColor: "black",
    borderStartWidth: 1,
  },
});
