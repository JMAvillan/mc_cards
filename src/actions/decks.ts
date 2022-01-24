import { DECKS } from "../constants";

const fetchDeckList = (startingDate: number) => ({
  type: DECKS.REQUEST_DECK_LIST,
  payload: {
    startingDate,
  },
});
const fetchDeckListSuccess = (deckList: []) => ({
  type: DECKS.REQUEST_DECK_LIST_SUCCESS,
  payload: {
    deckList,
  },
});
const fetchDeckListFailure = (error: any) => ({
  type: DECKS.REQUEST_DECK_LIST_FAILURE,
  payload: {
    error,
  },
});
const fetchDeckListReset = () => ({
  type: DECKS.REQUEST_DECK_LIST_RESET,
  payload: {},
});

export {
  fetchDeckList,
  fetchDeckListSuccess,
  fetchDeckListFailure,
  fetchDeckListReset,
};
