import { ICard } from "./ICard";
export interface IFilteredOptions {
  name: string;
  code: string;
  selected: boolean;
}
export default interface ICardList {
  cards: ICard[];
  factions: { [key: string]: IFilteredOptions } | null;
  traits: { [key: string]: IFilteredOptions } | null;
  types: { [key: string]: IFilteredOptions } | null;
  packs: { [key: string]: IFilteredOptions } | null;
  sets: { [key: string]: IFilteredOptions } | null;

  filteredCards: ICard[];

  error: null;

  cardListFetchSuccess: boolean;
  cardListFetchFailure: boolean;
}
