import IDeck from "./IDeck";

export default interface IDeckList {
  decks: [IDeck];
  error: null;

  deckListFetchSuccess: boolean;
  deckListFetchFailure: boolean;
}
