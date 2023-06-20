import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { ICard, ILinkedCard } from "../../../../interfaces/ICard";
import HTMLView from "react-native-htmlview";
import { useTheme } from "@react-navigation/native";
import { SCREEN } from "../../../../constants";
const CardPreview = ({ card }: { card: ICard | ILinkedCard }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[styles.cardPreviewContainer, { backgroundColor: colors.card }]}
    >
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ fontFamily: "Nunito", fontSize: 16, color: colors.text }}
          >
            {card.is_unique ? "⟡ " : ""}
            {card.name}
          </Text>
          {card.type_code === "alter_ego" && (
            <Text style={{ fontFamily: "Nunito-Regular", color: colors.text }}>
              {" "}
              - {card.type_name}
            </Text>
          )}
        </View>

        <Text
          style={{
            fontFamily: "Nunito-BlackItalic",
            textAlign: "center",
            color: colors.text,
          }}
        >
          {card.traits}
        </Text>

        {card.flavor ? (
          <Text
            style={{ fontFamily: "Nunito-Italic", color: colors.text }}
            numberOfLines={2}
          >
            {card.flavor}
          </Text>
        ) : card.text ? (
          <HTMLView
            value={`<div>${card.text}</div>`}
            addLineBreaks={false}
            nodeComponentProps={{ numberOfLines: 2 }}
            stylesheet={{
              div: {
                color: colors.text,
                fontFamily: "Nunito-Regular",
              },
              b: {
                color: colors.text,
                fontFamily: "Nunito-Bold",
              },
              i: {
                color: colors.text,
                fontFamily: "Nunito-Italic",
              },
            }}
          />
        ) : (
          <Text
            style={{ fontFamily: "Nunito-Regular", color: colors.text }}
            numberOfLines={2}
          >
            {"Not Available Yet"}
          </Text>
        )}
      </View>
      {/* <Text style={{ textTransform: "capitalize" }}>{card?.meta.aspect}</Text>
        <Text>Published on: {card?.date_creation}</Text>
        <Text>Updated on: {card?.date_update}</Text> */}
      <FastImage
        style={{ width: "15%", marginLeft: 8 }}
        source={{
          uri:
            `https://marvelcdb.com${card.imagesrc}` ||
            `https://marvelcdb.com/bundles/cards/${card.code}.png`,
          headers: { Authorization: "someAuthToken" },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardPreviewContainer: {
    //Fit
    width: SCREEN.WIDTH * 0.96,
    height: 95,
    marginVertical: 4,
    marginHorizontal: SCREEN.WIDTH * 0.02,
    padding: 8,

    //Positioning
    flexDirection: "row",

    //Look
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export default CardPreview;
