import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { RootNavigationProps } from "../../../interfaces/INavigationProps";

const TrackNewGame = (props: RootNavigationProps<"TrackNewGame">) => {
  return (
    <View>
      <Text>NewGame</Text>
    </View>
  );
};

export default TrackNewGame;

const styles = StyleSheet.create({});
