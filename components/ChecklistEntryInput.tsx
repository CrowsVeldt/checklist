import Checkbox from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ListEntryInput({
  id,
  initialTitle,
  initialRequired,
  child,
  onEntryChange,
}: {
  id: string;
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

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    onEntryChange(id, title, required, child);
  }, [title, required]);

  return (
    <Pressable
      style={child ? [styles.inputWrapper, styles.child] : styles.inputWrapper}
      onPress={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <TextInput value={title} onChangeText={setTitle} ref={inputRef} />
      <View style={styles.requiredWrapper}>
        <Text>Required?</Text>
        <Checkbox
          style={styles.required}
          value={required}
          onValueChange={setRequired}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
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
