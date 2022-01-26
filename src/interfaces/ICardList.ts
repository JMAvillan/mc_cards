import ICard from "./ICard";

export default interface ICardList {
  cards: [ICard] | null;
  factions: {} | null;
  traits: {} | null;
  types: {} | null;
  packs: {} | null;
  sets: {} | null;

  filteredCards: [ICard] | null;

  error: null;

  cardListFetchSuccess: boolean;
  cardListFetchFailure: boolean;
}
