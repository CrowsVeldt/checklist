import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import RequiredButton from "./RequiredButton";
import DeleteEntryButton from "./DeleteEntryButton";

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
  const [selection, setSelection] = useState<
    { start: number; end: number } | undefined
  >(undefined);

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
          // Set cursor position to the end of the text when inputWrapper is pressed
          setSelection({ start: title.length, end: title.length });
        }
      }}
    >
      <TextInput
        value={title}
        onChangeText={setTitle}
        ref={inputRef}
        selection={selection}
        onFocus={() => {
          // set cursor position to undefined so that the user can change it
          setSelection(undefined);
        }}
      />
      <View style={styles.buttonWrapper}>
        <RequiredButton initialState={required} changeState={setRequired} />
        <DeleteEntryButton remove={remove} />
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
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
});
