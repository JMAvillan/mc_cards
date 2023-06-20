import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameTrackerNavigationProps } from "../../../interfaces/INavigationProps";

const GameTracker = (props: GameTrackerNavigationProps<"GameTracker">) => {
  return (
    <View>
      <Text>GameTracker</Text>
    </View>
  );
};

export default GameTracker;

const styles = StyleSheet.create({});
