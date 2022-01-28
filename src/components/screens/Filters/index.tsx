import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { filterCards } from "../../../actions/cards";
import { SCREEN } from "../../../constants";
import ICard from "../../../interfaces/ICard";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import Accordion from "react-native-collapsible/Accordion";

const FilterOption = ({ data, onFilterValueChange }: any) => {
  const { colors } = useTheme();
  return (
    <FlatList
      data={data}
      contentContainerStyle={{ backgroundColor: colors.card, height: "100%" }}
      keyExtractor={({ code }) => code}
      numColumns={2}
      renderItem={({ item }: any) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 2,
              paddingHorizontal: 8,
              width: "48.9%",
              height: 40,
              borderWidth: 1,
              borderRadius: 8,
              borderColor: colors.border,
              // borderColor: "red",
            }}
          >
            <BouncyCheckbox
              size={15}
              isChecked={item.selected}
              fillColor={colors.primary}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: colors.primary }}
              style={{
                // borderWidth: 1,
                width: "100%",
                height: "100%",
                zIndex: 2,
              }}
              onPress={() => {
                onFilterValueChange(item.code);
              }}
              bounceFriction={10}
              disableText={true}
              disableBuiltInState={true}
            />
            <Text
              style={{
                marginLeft: "-85%",
                width: "100%",
                fontFamily: "Nunito-Regular",
                color: colors.text,
                flex: 1,
              }}
              numberOfLines={2}
            >
              {item.name}
            </Text>
          </View>
        );
      }}
    />
  );
};

const Filters = (props: any) => {
  const cards: ICard[] = props.cards.cards;
  const filteredCards: ICard[] = props.cards.filteredCards;
  // const card = cards[0];

  props.navigation.setOptions({
    headerTitle: () => {
      return (
        <View>
          <Text>Filters</Text>
          <Text>{`Cards: ${filteredCards.length}`}</Text>
        </View>
      );
    },
    headerRight: () => {
      return (
        <View>
          <Text>Clear</Text>
        </View>
      );
    },
  });
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const sections = [
    { title: "Packs", data: Object.values(props.cards.packs), key: "packs" },
    {
      title: "Card Types",
      data: Object.values(props.cards.types),
      key: "types",
    },
    {
      title: "Class",
      data: Object.values(props.cards.factions),
      key: "factions",
    },
    { title: "Traits", data: Object.values(props.cards.traits), key: "traits" },
    // { title: "Sets", data: Object.values(props.cards.sets), key: "sets" },
  ];

  return (
    <View>
      <Accordion
        sections={sections}
        activeSections={activeSections}
        touchableComponent={TouchableOpacity}
        containerStyle={{ height: "100%" }}
        renderContent={({ data, key }: any) => {
          return (
            <FilterOption
              data={data}
              key={key}
              onFilterValueChange={(valueCode: string) => {
                props.filterCards(key, valueCode);
              }}
            />
          );
        }}
        renderAsFlatList={true}
        expandMultiple={true}
        renderHeader={(section) => {
          return (
            <View
              style={[
                {
                  borderWidth: 1,
                  width: "23%",
                  padding: 8,
                  borderRadius: 8,
                },
              ]}
            >
              <Text>{section.title}</Text>
            </View>
          );
        }}
        renderSectionTitle={(section) => {
          return <View />;
        }}
        onChange={(indexes) => {
          setActiveSections(indexes);
        }}
      />

      {/* <Text>{`Filter by card_set_code: ${card?.card_set_code}`}</Text>
      <Text>{`Filter by faction_code: ${card?.faction_code}`}</Text>
      <Text>{`Filter by health: ${card?.health}`}</Text>
      <Text>{`Filter by_permanent: ${card?.permanent}`}</Text>
      <Text>{`Filter by quantity: ${card?.quantity}`}</Text>
      <Text>{`Filter by recover: ${card?.recover}`}</Text>
      <Text>{`Filter by position: ${card?.position}`}</Text> */}
    </View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  const { decks, cards, packs } = state;
  return { decks, cards, packs };
};
const mapDispatchToProps = (dispatch: any, props: any) => ({
  filterCards: (filterCode: string, valueCode: string) => {
    dispatch(filterCards(filterCode, valueCode));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
