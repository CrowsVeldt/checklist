import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TitleInput({
  title,
  setTitle,
}: {
  title: string;
  setTitle: any;
}) {
  return (
    <View style={styles.titleInputWrapper}>
      <Text style={styles.titleLabel}>Title:</Text>
      <TextInput
        style={styles.titleInput}
        value={title}
        maxLength={16}
        onChangeText={setTitle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
