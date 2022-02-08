import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SectionList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import { connect } from "react-redux";
import { fetchAllCards, fetchAllCardsReset } from "../../../actions/cards";
import { fetchDeckList } from "../../../actions/decks";
import { fetchAllPacks } from "../../../actions/packs";
import { SCREEN } from "../../../constants";
import { ICard, ILinkedCard } from "../../../interfaces/ICard";
import IDeck from "../../../interfaces/IDeck";
import Accordion from "react-native-collapsible/Accordion";
import { SheetManager } from "react-native-actions-sheet";
import { useTheme } from "@react-navigation/native";
import CardPreview from "./components/CardPreview";

const renderDeckPreview = ({ item }: ListRenderItemInfo<any>) => {
  return <DeckPreview deck={item} />;
};

const DeckPreview = (props: any) => {
  const deck: IDeck = props.deck;
  console.log(deck.slots);
  return (
    <View>
      {/* <Text>{deck?.name}</Text> */}
      <Text>
        <Text>[{deck?.name}] - </Text>
        <Text>{deck?.description_md}</Text>
      </Text>
      <Text style={{ textTransform: "capitalize" }}>{deck?.meta.aspect}</Text>
      <Text>Published on: {deck?.date_creation}</Text>
      <Text>Updated on: {deck?.date_update}</Text>
    </View>
  );
};

//For SectionList
const renderCardPreview = ({ item }: any) => {
  const card: ICard = item;
  const linkedCard: ILinkedCard = card.linked_card;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
      snapToInterval={SCREEN.WIDTH}
      snapToAlignment={"center"}
    >
      <CardPreview card={card} />
      {linkedCard && <CardPreview card={linkedCard} />}
    </ScrollView>
  );
};

const Home = (props: any) => {
  const { colors } = useTheme();
  useEffect(() => {
    // props.fetchDeckList(new Date().getTime());
    console.log("Running Home useEffect");
    props.fetchAllCards();
    // props.fetchAllPacks();
  }, []);

  props.navigation.setOptions({
    headerRight: () => {
      return (
        <>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Filters");
              // SheetManager.show("Filters");
            }}
          >
            <Text>Filter Icon</Text>
          </TouchableOpacity>
        </>
      );
    },
  });

  const { decks, cards, packs } = props;
  const [sections, setSections] = useState(null);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState<string>();

  useEffect(() => {
    if (cards.filteredCards) {
      const sections: any = {};
      cards.filteredCards.forEach((card: ICard) => {
        if (sections[card.type_code]) {
          sections[card.type_code].data.push(card);
        } else {
          if (card.type_code !== "alter_ego")
            sections[card.type_code] = {
              title: card.type_name,
              data: [card],
            };
        }
      });
      const data: any = Object.values(sections);
      setSections(sections);
      setData(data);
      // setActiveSections(data.map((list: any, index: number) => index));
    }
  }, [cards.filteredCards]);

  if (props.cards.cardListFetchSuccess && !sections) {
    console.log("Card Success ->", props.cards.cardListFetchSuccess);
    props.fetchAllCardsReset();
  }

  if (props.cards.cardListFetchFailure) {
    console.log("Card Failure");
    props.fetchAllCardsReset();
  }
  if (props.packs.packListFetchSuccess) {
    console.log("Pack Success");
  }
  if (props.packs.packListFetchFailure) {
    console.log("Pack Failure");
  }

  return (
    <>
      {data.length > 0 && (
        //Sectioned List with Sticky Header
        <SectionList
          sections={data}
          showsVerticalScrollIndicator={false}
          // data={cards.cards}
          // initialNumToRender={10}
          // maxToRenderPerBatch={20}
          // updateCellsBatchingPeriod={500}
          // removeClippedSubviews={true}
          stickySectionHeadersEnabled={true}
          keyExtractor={({ code }) => code}
          renderItem={renderCardPreview}
          renderSectionHeader={({ section: { title, data } }: any) => {
            return (
              <View
                style={{
                  paddingBottom: 0,
                  paddingTop: 0,
                  paddingHorizontal: 6,
                  backgroundColor: colors.primary,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontFamily: "Raleway",
                    fontSize: 22,
                  }}
                >
                  {`${title}`}
                </Text>
                <Text
                  style={{ fontFamily: "Raleway", fontSize: 22, paddingTop: 0 }}
                >
                  {`${data && data.length} Cards`}
                </Text>
              </View>
            );
          }}
          // ListHeaderComponent={() => {
          //   return <TextInput value={searchValue} />;
          // }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state: any, props: any) => {
  const { decks, cards, packs } = state;
  return { decks, cards, packs };
};
const mapDispatchToProps = (dispatch: any, props: any) => ({
  fetchDeckList: (startingDate: number) => {
    dispatch(fetchDeckList(startingDate));
  },
  fetchAllCards: () => {
    dispatch(fetchAllCards());
  },
  fetchAllCardsReset: () => {
    dispatch(fetchAllCardsReset());
  },
  fetchAllPacks: () => {
    dispatch(fetchAllPacks());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
