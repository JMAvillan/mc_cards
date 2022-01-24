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
      {/* <Image src={require(deck.)}/> */}
    </View>
  );
};

//({ item }) => renderCardPreview(item)
const renderCardPreview = ({ item }: any) => {
  const card: ICard = item;
  // console.log("This is the card name ->", card.name);
  const linkedCard = card.linked_card;
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
      snapToInterval={SCREEN.WIDTH} //your element width
      snapToAlignment={"center"}
    >
      <CardPreview card={card} />
      {linkedCard && <CardPreview card={linkedCard} />}
    </ScrollView>
  );
};

const CardPreview = (props: any) => {
  const card: ICard = props.card;
  const linkedCard = card.linked_card;

  if (!card.imagesrc) {
    console.log(card);
  }
  return (
    <View style={styles.cardPreviewContainer}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: "Nunito", fontSize: 16 }}>
          <Text>
            {card.is_unique ? "⟡ " : ""}
            {card.name}
          </Text>
          {linkedCard && <Text> - {card.linked_card.name}</Text>}
        </Text>

        <Text style={{ fontFamily: "Nunito-BlackItalic", textAlign: "center" }}>
          {card.traits}
        </Text>

        {card.flavor ? (
          <Text style={{ fontFamily: "Nunito-Italic" }} numberOfLines={2}>
            {card.flavor}
          </Text>
        ) : (
          <HTMLView
            value={`<div>${card.text}</div>`}
            addLineBreaks={false}
            nodeComponentProps={{ numberOfLines: 2 }}
            stylesheet={{
              div: {
                fontFamily: "Nunito-Regular",
              },
              b: {
                fontFamily: "Nunito-Bold",
              },
              i: {
                fontFamily: "Nunito-Italic",
              },
            }}
          />
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
  useEffect(() => {
    // props.fetchDeckList(new Date().getTime());
    console.log("Running Home useEffect");
    props.fetchAllCards();
    // props.fetchAllPacks();
  }, []);

  const { decks, cards, packs } = props;
  const [sections, setSections] = useState(null);
  const [data, setData] = useState([]);

  if (props.cards.cardListFetchSuccess && !sections) {
    console.log("Card Success ->", props.cards.cardListFetchSuccess);
    const sections: any = {};
    cards.cards.forEach((card: ICard) => {
      if (sections[card.type_code]) {
        sections[card.type_code].data.push(card);
      } else {
        sections[card.type_code] = {
          title: card.type_name,
          data: [card],
        };
      }
    });
    setSections(sections);
    setData(Object.values(sections));
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
        <SectionList
          sections={data}
          // data={cards.cards}
          // initialNumToRender={10}
          // maxToRenderPerBatch={20}
          // updateCellsBatchingPeriod={500}
          // removeClippedSubviews={true}
          stickySectionHeadersEnabled={true}
          keyExtractor={({ code }) => code}
          renderItem={renderCardPreview}
          renderSectionHeader={({ section: { title } }) => {
            return (
              <View
                style={{
                  paddingBottom: 0,
                  // paddingTop: 8,
                  backgroundColor: "gray",
                }}
              >
                <Text style={{ fontFamily: "Raleway", fontSize: 22 }}>
                  {title}
                </Text>
              </View>
            );
          }}
        />
      )}
    </>
    // <TouchableOpacity
    //   onPress={() => {
    //     console.log("Button pressed", new Date().getTime());
    //     props.fetchDeckList(new Date().getTime());
    //   }}
    // >
    //   <Text> This is my home! </Text>
    //   {/* <Text> {props.deckList.deckList.toString()} </Text> */}
    // </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardPreviewContainer: {
    //Fit
    width: SCREEN.WIDTH,
    height: 95,
    marginVertical: 1,
    padding: 8,

    //Positioning
    flexDirection: "row",

    //Look
    // borderRadius: 8,
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
