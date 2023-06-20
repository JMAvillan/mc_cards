import { CARDS } from "../constants";
import ICardList, { IFilteredOptions } from "../interfaces/ICardList";
import { ICard } from "../interfaces/ICard";

const defaultState: ICardList = {
  cards: [],
  factions: null,
  traits: null,
  types: null,
  packs: null,
  sets: null,

  filteredCards: [],

  error: null,

  cardListFetchSuccess: false,
  cardListFetchFailure: false,
};

const cardListReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case CARDS.REQUEST_ALL_CARDS_SUCCESS: {
      const factions: ICardList["factions"] = {};
      const traits: ICardList["traits"] = {};
      const types: ICardList["types"] = {};
      const packs: ICardList["packs"] = {};
      const sets: ICardList["sets"] = {};
      const cards: ICard[] = action.payload.cards;
      for (let i = 0; i < cards.length; i++) {
        if (cards[i]?.pack_code)
          packs[cards[i].pack_code] = {
            name: cards[i].pack_name,
            selected: false,
            code: cards[i].pack_code,
          };

        if (cards[i]?.faction_code)
          factions[cards[i].faction_code] = {
            name: cards[i].faction_name,
            selected: false,
            code: cards[i].faction_code,
          };
        if (cards[i]?.traits)
          cards[i].traits
            .trim()
            .split(/\.\s/g)
            .forEach((trait) => {
              if (trait !== "") {
                traits[trait] = { code: trait, name: trait, selected: false };
              }
            });
        if (cards[i]?.type_code)
          types[cards[i].type_code] = {
            name: cards[i].type_name,
            selected: false,
            code: cards[i].type_code,
          };
        if (cards[i]?.card_set_code)
          sets[cards[i].card_set_code] = {
            name: cards[i].card_set_name,
            selected: false,
            code: cards[i].card_set_code,
          };
        // if (i !== cards.length - 1 - i) {
        //   factions.push(cards[cards.length - 1 - i].faction_code);
        //   traits.push(cards[cards.length - 1 - i].traits.split("."));
        //   types.push(cards[cards.length - 1 - i].type_code);
        //   packs.push(cards[cards.length - 1 - i].pack_code);
        // } else {
        //   console.log("Final loop ->", i);
        //   break;
        // }
      }
      // console.log("Sets->", sets);
      return {
        ...state,
        cards: cards,
        filteredCards: cards,
        factions: factions,
        traits: traits,
        types: types,
        packs: packs,
        sets: sets,
        cardListFetchSuccess: true,
      };
    }
    case CARDS.REQUEST_ALL_CARDS_FAILURE: {
      return {
        ...state,
        cardListFetchFailure: true,
        error: action.payload.error,
      };
    }
    case CARDS.REQUEST_ALL_CARDS_RESET: {
      return {
        ...state,
        cardListFetchSuccess: false,
        cardListFetchFailure: false,
        error: null,
      };
    }
    case CARDS.FILTER_CARDS: {
      const filterCode: keyof Pick<
        ICardList,
        "factions" | "traits" | "types" | "packs" | "sets"
      > = action.payload.filterCode;
      const valueCode: any = action.payload.valueCode;

      //
      state[filterCode]![valueCode].selected =
        !state[filterCode]![valueCode].selected;

      const getFilterData = (
        fieldName: keyof ICard,
        data: typeof state.factions
      ) => ({
        fieldName,
        data: Object.values(data ?? {}).filter((filterOption) => {
          return filterOption.selected;
        }),
      });

      const validateFilters = (
        card: ICard,
        activeFilter: { fieldName: keyof ICard; data: IFilteredOptions[] }
      ) => {
        if (activeFilter.data.length > 0) {
          if (
            activeFilter.data.filter((filter) => {
              return card[activeFilter.fieldName] === filter.code;
            }).length === 0
          ) {
            return false;
          }
        }
        return true;
      };

      const activeSets = getFilterData("card_set_code", state.sets);
      const activePacks = getFilterData("pack_code", state.packs);
      const activeFactions = getFilterData("faction_code", state.factions);
      const activeTypes = getFilterData("type_code", state.types);

      //TODO
      //Trait filtering/searching
      const traits: any = {};

      const filteredCards = state.cards?.filter((card: any) => {
        if (!validateFilters(card, activeSets)) return false;
        if (!validateFilters(card, activePacks)) return false;
        if (!validateFilters(card, activeFactions)) return false;
        if (!validateFilters(card, activeTypes)) return false;
        return true;
      });

      console.log("filtered cards ->", filteredCards?.length);
      return {
        ...state,
        filteredCards: filteredCards,
      };
    }
    default:
      return state;
  }
};

export { cardListReducer };
