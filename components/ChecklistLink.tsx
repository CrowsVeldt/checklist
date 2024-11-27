import { ChecklistType } from "@/types";
import { Link } from "expo-router";
import { Text } from "react-native";

export default function ChecklistLink({ list }: { list: ChecklistType }) {
  return (
    <Link
      href={{
        pathname: "/checklist/[checklist]",
        params: { checklist: list.id },
      }}
    >
      <Text>{list.title}</Text>
    </Link>
  );
}
