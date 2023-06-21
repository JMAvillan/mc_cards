import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameTrackerNavigationProps } from "../../../interfaces/INavigationProps";
import Pressable from "../../general/Pressable";

const GameTracker = (props: GameTrackerNavigationProps<"GameTracker">) => {
  return (
    <View>
      <Text>GameTracker</Text>
      <Pressable onPress={() => props.navigation.navigate("TrackNewGame")}>
        <Text>Track New Game</Text>
      </Pressable>
    </View>
  );
};

export default GameTracker;

const styles = StyleSheet.create({});
