import { Link } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView style={styles.mainView}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link
        href={{
          pathname: "/checklist/[checklist]",
          params: { checklist: "test" },
        }}
      >
        Checklist
      </Link>
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
