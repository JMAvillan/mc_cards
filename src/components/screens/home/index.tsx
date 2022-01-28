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
} from "react-native";
import FastImage from "react-native-fast-image";
import RenderHTML from "react-native-render-html";
import { connect } from "react-redux";
import { fetchAllCards, fetchAllCardsReset } from "../../../actions/cards";
import { fetchDeckList } from "../../../actions/decks";
import { fetchAllPacks } from "../../../actions/packs";
import { SCREEN } from "../../../constants";
import ICard from "../../../interfaces/ICard";
import IDeck from "../../../interfaces/IDeck";
import HTMLView from "react-native-htmlview";
import Accordion from "react-native-collapsible/Accordion";
import { useTheme } from "@react-navigation/native";

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
  const linkedCard = card.linked_card;
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

//For Accordion + Flatlist
const renderCardSectionList = ({ data: cardList }: any) => {
  return (
    <FlatList
      data={cardList}
      keyExtractor={({ code }) => code}
      renderItem={renderCardPreview}
    />
  );
};

const CardPreview = (props: any) => {
  const card: ICard = props.card;
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
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Filters");
          }}
        >
          <Text>Filter</Text>
        </TouchableOpacity>
      );
    },
  });

  const { decks, cards, packs } = props;
  const [sections, setSections] = useState(null);
  const [data, setData] = useState([]);

  //Used with accordion
  const [activeSections, setActiveSections] = useState<number[]>([]);

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
        //Sectioned List With Collapsable sections
        // <Accordion
        //   sections={data}
        //   activeSections={activeSections}
        //   renderContent={renderCardSectionList}
        //   renderAsFlatList={true}
        //   expandMultiple={true}
        //   renderHeader={(section) => {
        //     return (
        //       <View
        //         style={{
        //           paddingBottom: 0,
        //           // paddingTop: 8,
        //           backgroundColor: "gray",
        //         }}
        //       >
        //         <Text style={{ fontFamily: "Raleway", fontSize: 22 }}>
        //           {section.title}
        //         </Text>
        //       </View>
        //     );
        //   }}
        //   renderSectionTitle={(section) => {
        //     return <View />;
        //   }}
        //   onChange={(indexes) => {
        //     setActiveSections(indexes);
        //   }}
        // />

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
        />
      )}
    </>
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
