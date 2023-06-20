import React from "react";
import {
  Pressable as PressableRaw,
  PressableProps,
  ViewStyle,
} from "react-native";

const Pressable = (props: PressableProps & { style?: ViewStyle }) => {
  return (
    <PressableRaw
      onPress={props.onPress}
      hitSlop={props.hitSlop}
      style={({ pressed }) => [props.style, { opacity: pressed ? 0.5 : 1 }]}
    >
      {props.children}
    </PressableRaw>
  );
};

export default Pressable;
