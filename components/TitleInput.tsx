import { StyleSheet, TextInput, View } from "react-native";

export default function TitleInput({
  title,
  setTitle,
}: {
  title: string;
  setTitle: any;
}) {
  return (
    <View style={styles.titleInputWrapper}>
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
    marginVertical: 10,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "100%",
    fontSize: 24,
  },
});
