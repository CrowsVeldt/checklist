import AddButton from "@/components/AddButton";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.mainView}>
      <Link
        href={{
          pathname: "/checklist/[checklist]",
          params: { checklist: "test" },
        }}
      >
        Checklist
      </Link>
      <AddButton />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
