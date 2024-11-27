import AddButton from "@/components/AddButton";
import ChecklistLink from "@/components/ChecklistLink";
import { AppContext } from "@/context/AppContext";
import { ChecklistType } from "@/types";
import { Link } from "expo-router";
import { ContextType, useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* 
  Screen contains: 
    - A list of checklists
    - A "+" button

  When a checklist is selected, navigate to checklist screen
  When the "+" button is pressed navigate to the checklist creation screen
*/

export default function Index() {
  const { getLists }: ContextType<typeof AppContext> = useContext(AppContext);
  const lists: ChecklistType[] = getLists();
  return (
    <SafeAreaView style={styles.mainView}>
      {lists &&
        lists.map((list, index) => {
          return <ChecklistLink list={list} />;
        })}
      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
  },
});
