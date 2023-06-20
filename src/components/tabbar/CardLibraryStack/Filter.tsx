import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { filterCards } from "../../../actions/cards";
import { SCREEN } from "../../../constants";
import { ICard } from "../../../interfaces/ICard";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useTheme } from "@react-navigation/native";
import Accordion from "react-native-collapsible/Accordion";
import FilterHeader from "./components/FilterHeader";
import FilterOption from "./components/FilterOption";
import { useAppDispatch, useAppSelector } from "../../../store";
import { CardLibraryNavigationProps } from "../../../interfaces/INavigationProps";

const Filters = (props: CardLibraryNavigationProps<"Filters">) => {
  const { colors } = useTheme();
  const { cards } = useAppSelector(({ cards }) => ({
    cards,
  }));
  const dispatch = useAppDispatch();

  props.navigation.setOptions({
    headerTitle: () => <FilterHeader />,
    headerRight: () => {
      return (
        <View>
          <Text>Clear</Text>
        </View>
      );
    },
  });

  const sections = [
    { title: "Packs", data: Object.values(cards.packs ?? {}), key: "packs" },
    {
      title: "Card Types",
      data: Object.values(cards.types ?? {}),
      key: "types",
    },
    {
      title: "Class",
      data: Object.values(cards.factions ?? {}),
      key: "factions",
    },
    { title: "Traits", data: Object.values(cards.traits ?? {}), key: "traits" },
    // { title: "Sets", data: Object.values(props.cards.sets), key: "sets" },
  ];

  const [activeSections, setActiveSections] = useState<number[]>([]);

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      touchableComponent={TouchableOpacity}
      containerStyle={{ backgroundColor: colors.card, height: "100%" }}
      sectionContainerStyle={{
        borderBottomWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
      }}
      renderContent={({ data, key }: any) => {
        return (
          <FilterOption
            data={data}
            key={key}
            onFilterValueChange={(valueCode: string) => {
              dispatch(filterCards(key, valueCode));
            }}
          />
        );
      }}
      renderAsFlatList={true}
      expandMultiple={true}
      renderHeader={(section, index) => {
        return (
          <View
            style={[
              {
                borderTopWidth: index === 0 ? 0.5 : 0,
                padding: 8,
              },
            ]}
          >
            <Text style={{ fontFamily: "Nunito-Bold", color: colors.text }}>
              {section.title}
            </Text>
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

    // {/* <Text>{`Filter by card_set_code: ${card?.card_set_code}`}</Text>
    // <Text>{`Filter by faction_code: ${card?.faction_code}`}</Text>
    // <Text>{`Filter by health: ${card?.health}`}</Text>
    // <Text>{`Filter by_permanent: ${card?.permanent}`}</Text>
    // <Text>{`Filter by quantity: ${card?.quantity}`}</Text>
    // <Text>{`Filter by recover: ${card?.recover}`}</Text>
    // <Text>{`Filter by position: ${card?.position}`}</Text> */}
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
