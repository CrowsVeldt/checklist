import { ChecklistType } from "@/utils/types";
import { router } from "expo-router";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function ChecklistLink({
  list,
  triggerModal,
  first,
  last,
}: {
  list: ChecklistType;
  triggerModal: any;
  first?: boolean;
  last?: boolean;
}) {
  const { height } = useWindowDimensions();
  const linkHeight: number = height / 14;
  const linkButtonStyle = { height: linkHeight, width: linkHeight };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/checklist/[checklist]",
          params: { checklist: list.id },
        })
      }
      style={({ pressed }) =>
        pressed
          ? [
              styles.link,
              styles.linkPressed,
              { height: linkHeight },
              first ? styles.firstItem : {},
              last ? styles.lastItem : {},
            ]
          : [
              styles.link,
              { height: linkHeight },
              first ? styles.firstItem : {},
              last ? styles.lastItem : {},
            ]
      }
    >
      <Text style={styles.listTitle}>{list.title}</Text>
      <View style={[styles.buttonContainer, { height: linkHeight }]}>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.button, styles.linkPressed, linkButtonStyle]
              : [styles.button, linkButtonStyle]
          }
          onPress={() =>
            router.push({
              pathname: "/edit",
              params: { id: list.id },
            })
          }
        >
          <AntDesign name="edit" size={24} color="black" />
        </Pressable>
        <Pressable
          style={({ pressed }) =>
            pressed
              ? [styles.button, styles.linkPressed, linkButtonStyle]
              : [styles.button, linkButtonStyle]
          }
          onPress={() => triggerModal(list)}
        >
          <AntDesign name="delete" size={24} color="black" />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  link: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  firstItem: {
    borderTopStartRadius: 10,
  },
  lastItem: {
    borderBottomStartRadius: 10,
  },
  linkPressed: {
    backgroundColor: "lightgray",
  },
  listTitle: {
    marginStart: 10,
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderStartColor: "black",
    borderStartWidth: 1,
  },
});
