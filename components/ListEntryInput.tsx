import { StyleSheet, TextInput, View } from "react-native";

export default function ListEntryInput() {
  return (
    <View style={styles.inputWrapper}>
      <TextInput defaultValue="Entry Title" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
