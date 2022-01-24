import ICard from "./ICard";

export default interface ICardList {
  cards: [ICard];
  error: null;

  cardListFetchSuccess: boolean;
  cardListFetchFailure: boolean;
}
