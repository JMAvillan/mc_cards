import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { filterCards } from "../../../actions/cards";
import { SCREEN } from "../../../constants";
import ICard from "../../../interfaces/ICard";

const FilterOption = ({
  title,
  data,
  onPress,
  collapsed,
  onFilterValueChange,
}: any) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{title}</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed}>
        {/**Any child interaction causes the collsible container to collapse*/}
        {/*Fix: Need to wrap child components inside scrollview -> https://github.com/oblador/react-native-collapsible/issues/72#issuecomment-292515685 */}
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 8,
              // justifyContent: "center",
            }}
          >
            {data.map((item: any) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    width: "32%",
                    height: 40,
                    borderWidth: 1,
                    borderColor: "red",
                    margin: 2,
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      onFilterValueChange(item.code);
                    }}
                    style={{
                      borderWidth: 1,
                      width: "100%",
                      height: "100%",
                      justifyContent: "center",
                      zIndex: 2,
                    }}
                  >
                    {item.selected ? <Text>O</Text> : <Text>X</Text>}
                  </TouchableOpacity>
                  <Text
                    style={{ marginLeft: "-90%", width: "100%" }}
                    numberOfLines={2}
                  >
                    {item.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </Collapsible>
    </View>
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
  const [collapsedContainers, setCollapsedContainers] = useState<any>({
    // sets: false,
    packs: true,
    types: true,
    factions: true,
    traits: true,
  });

  const onFilterOptionPressed = (sectionCode: string) => {
    setCollapsedContainers({
      ...collapsedContainers,
      [sectionCode]: !collapsedContainers[sectionCode],
    });
  };

  return (
    <ScrollView nestedScrollEnabled={false}>
      {/* <FilterOption
        title={"Sets"}
        data={Object.values(props.cards.sets)}
        key={"sets"}
        onPress={() => {
          onFilterOptionPressed("sets");
        }}
        collapsed={!collapsedContainers.sets}
      /> */}
      <FilterOption
        title={"Packs"}
        data={Object.values(props.cards.packs)}
        key={"packs"}
        collapsed={collapsedContainers.packs}
        onPress={() => {
          onFilterOptionPressed("packs");
        }}
        onFilterValueChange={(valueCode: string) => {
          props.filterCards("packs", valueCode);
        }}
      />
      <FilterOption
        title={"Card Types"}
        data={Object.values(props.cards.types)}
        key={"types"}
        onPress={() => {
          onFilterOptionPressed("types");
        }}
        collapsed={collapsedContainers.types}
        onFilterValueChange={(valueCode: string) => {
          props.filterCards("types", valueCode);
        }}
      />
      <FilterOption
        title={"Class"}
        data={Object.values(props.cards.factions)}
        key={"factions"}
        onPress={() => {
          onFilterOptionPressed("factions");
        }}
        collapsed={collapsedContainers.factions}
        onFilterValueChange={(valueCode: string) => {
          props.filterCards("factions", valueCode);
        }}
      />
      <FilterOption
        title={"Traits"}
        data={Object.values(props.cards.traits)}
        key={"traits"}
        onPress={() => {
          onFilterOptionPressed("traits");
        }}
        collapsed={collapsedContainers.traits}
        onFilterValueChange={(valueCode: string) => {
          props.filterCards("traits", valueCode);
        }}
      />
      {/* <Text>{`Filter by card_set_code: ${card?.card_set_code}`}</Text>
      <Text>{`Filter by faction_code: ${card?.faction_code}`}</Text>
      <Text>{`Filter by health: ${card?.health}`}</Text>
      <Text>{`Filter by_permanent: ${card?.permanent}`}</Text>
      <Text>{`Filter by quantity: ${card?.quantity}`}</Text>
      <Text>{`Filter by recover: ${card?.recover}`}</Text>
      <Text>{`Filter by position: ${card?.position}`}</Text> */}
    </ScrollView>
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
