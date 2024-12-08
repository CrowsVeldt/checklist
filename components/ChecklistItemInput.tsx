import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import RequiredButton from "./RequiredButton";

export default function ChecklistItemInput({
  id,
  initialTitle,
  initialRequired,
  child,
  onEntryChange,
  remove,
  first,
  last,
}: {
  id: string;
  initialTitle: string;
  child?: boolean;
  initialRequired?: boolean;
  onEntryChange: any;
  remove: () => void;
  first?: boolean;
  last?: boolean;
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
      style={[
        styles.inputWrapper,
        first ? styles.firstItem : {},
        last ? styles.lastItem : {},
      ]}
      onPress={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <TextInput value={title} onChangeText={setTitle} ref={inputRef} />
      <View style={styles.controlWrapper}>
        <RequiredButton initialState={required} changeState={setRequired} />

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
    height: 70,
    marginBottom: 3,
  },
  firstItem: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  lastItem: {
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  controlWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 120,
    height: "100%",
  },
  buttonPressed: {
    backgroundColor: "lightgray",
  },
  deleteEntryButton: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: 50,
  },
});
