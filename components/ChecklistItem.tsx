import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function ChecklistItem({
  id,
  title,
  required,
  setFinished,
}: {
  id: string;
  title: string;
  required: boolean;
  setFinished: (id: string) => void;
}) {
  const [checked, setChecked] = useState<boolean>(false);

  const animatedStrikethroughStyles = useAnimatedStyle(() => {
    return {
      width: checked ? withTiming("83%") : withTiming("0%"),
      borderWidth: checked ? withTiming(1) : withTiming(0),
      display: checked ? withTiming("flex") : withTiming("none"),
    };
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      color: checked ? withTiming("gray") : withTiming("black"),
    };
  });

  const animatedViewStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: checked
        ? withTiming("lightgray")
        : withTiming("transparent"),
    };
  });

  return (
    <Animated.View style={[styles.itemContainer, animatedViewStyles]}>
      <Pressable
        onPress={() => {
          setFinished(id);
          setChecked(!checked);
        }}
        style={[styles.checklistItem]}
      >
        <View style={styles.box}>
          {checked && <AntDesign name="check" size={30} color={"black"} />}
        </View>
        <Animated.Text style={animatedTextStyles}>{title}</Animated.Text>
        <Animated.View
          style={[styles.strikeThrough, animatedStrikethroughStyles]}
        />
        {required ? (
          <AntDesign name="exclamationcircleo" size={25} color="black" />
        ) : (
          <AntDesign name="exclamationcircleo" size={25} color="white" />
        )}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderEndEndRadius: 25,
    borderEndStartRadius: 25,
    marginBottom: 1,
  },
  checklistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  box: {
    borderWidth: 1,
    borderColor: "black",
    height: 30,
    width: 30,
  },
  strikeThrough: {
    height: 1,
    borderColor: "gray",
    alignSelf: "center",
    position: "absolute",
    start: 30,
  },
});
