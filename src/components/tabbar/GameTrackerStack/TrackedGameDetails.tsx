import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { GameTrackerNavigationProps } from "../../../interfaces/INavigationProps";

const TrackedGameDetails = (
  props: GameTrackerNavigationProps<"TrackedGameDetails">
) => {
  return (
    <View>
      <Text>TrackedGameDetails</Text>
    </View>
  );
};

export default TrackedGameDetails;

const styles = StyleSheet.create({});
