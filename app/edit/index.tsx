import ChecklistEntryInput from "@/components/ChecklistEntryInput";
import { AppContext } from "@/context/AppContext";
import { ChecklistEntryType, ChecklistType } from "@/utils/types";
import { randomUUID } from "expo-crypto";
import { router, useLocalSearchParams } from "expo-router";
import { ContextType, useContext, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EditChecklist() {
  const { getListById, updateList }: ContextType<typeof AppContext> =
    useContext(AppContext);
  const { id }: { id: string } = useLocalSearchParams();
  const list: ChecklistType | undefined = getListById(id);
  const [title, setTitle] = useState<string>(
    list != undefined ? list.title : ""
  );
  const [entries, setEntries] = useState<ChecklistEntryType[]>(
    list != undefined ? list.entries : []
  );

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
      <View>
        {entries.map((item, index) => {
          if (item.parentTo.length > 0) {
            return (
              <View>
                <ChecklistEntryInput key={index} initialTitle={item.title} />
                {item.parentTo.map((item, index) => (
                  <ChecklistEntryInput
                    key={index}
                    initialTitle={item.title}
                    child={true}
                  />
                ))}
              </View>
            );
          } else {
            return (
              <ChecklistEntryInput key={index} initialTitle={item.title} />
            );
          }
        })}
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.addEntryButton, styles.buttonPressed]
              : styles.addEntryButton
          }
          onPress={() => {
            setEntries([
              ...entries,
              {
                id: randomUUID(),
                status: false,
                title: "New item",
                required: false,
                parentTo: [],
              },
            ]);
          }}
        >
          <Text>+</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={({ pressed }) =>
            pressed ? [styles.button, styles.buttonPressed] : styles.button
          }
          onPress={() => {
            updateList({ id, title, entries });
            router.replace({
              pathname: "/checklist/[checklist]",
              params: { checklist: id },
            });
          }}
        >
          <Text>Update</Text>
        </Pressable>
      </View>
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
  addEntryButton: {
    borderWidth: 1,
    borderColor: "black",
  },
});
