import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { ICard } from "../../../interfaces/ICard";
import { useTheme } from "@react-navigation/native";

const FilterHeader = (props: any) => {
  const { colors } = useTheme();
  const filteredCards: ICard[] = props.cards.filteredCards;
  // const card = cards[0];

  // props.navigation.setOptions({
  //   headerTitle: () => {
  //     return (
  //       <View>
  //         <Text style={{ fontFamily: "Nunito-Bold", color: colors.text }}>
  //           <Text>Filters</Text>
  //           <Text>{`\nCards: ${filteredCards.length}`}</Text>
  //         </Text>
  //       </View>
  //     );
  //   },
  //   headerRight: () => {
  //     return (
  //       <View>
  //         <Text>Clear</Text>
  //       </View>
  //     );
  //   },
  // });

  return (
    <View>
      <Text style={{ fontFamily: "Nunito-Bold", color: colors.text }}>
        <Text>Filters</Text>
        <Text>{`\nCards: ${filteredCards.length}`}</Text>
      </Text>
    </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  const { cards } = state;
  return { cards };
};
const mapDispatchToProps = (dispatch: any, props: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FilterHeader);
