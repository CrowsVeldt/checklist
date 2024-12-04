import { AntDesign } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function ListEntryInput({
  id,
  initialTitle,
  initialRequired,
  child,
  onEntryChange,
  remove,
}: {
  id: string;
  initialTitle: string;
  child?: boolean;
  initialRequired?: boolean;
  onEntryChange: any;
  remove: any;
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
      style={styles.inputWrapper}
      onPress={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <TextInput value={title} onChangeText={setTitle} ref={inputRef} />
      <View style={styles.controlWrapper}>
        <View style={styles.requiredWrapper}>
          <Text>Required?</Text>
          <Checkbox
            style={styles.required}
            value={required}
            onValueChange={setRequired}
          />
        </View>

        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.deleteEntry, styles.buttonPressed]
              : styles.deleteEntry
          }
          onPress={() => remove()}
        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    height: 70,
  },
  controlWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120,
    height: "100%",
  },
  requiredWrapper: {
    alignItems: "center",
    height: "100%",
  },
  required: {
    borderRadius: 5,
  },
  buttonPressed: {
    backgroundColor: "lightgray",
  },
  deleteEntry: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 50,
  },
});
