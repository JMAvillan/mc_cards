import { CARDS } from "../constants";

const fetchAllCards = () => ({
  type: CARDS.REQUEST_ALL_CARDS,
  payload: {},
});
const fetchAllCardsSuccess = (cards: {}) => ({
  type: CARDS.REQUEST_ALL_CARDS_SUCCESS,
  payload: {
    cards,
  },
});
const fetchAllCardsFailure = (error: any) => ({
  type: CARDS.REQUEST_ALL_CARDS_FAILURE,
  payload: {
    error,
  },
});
const fetchAllCardsReset = () => ({
  type: CARDS.REQUEST_ALL_CARDS_RESET,
  payload: {},
});
const filterCards = (filterCode: string, valueCode: string) => ({
  type: CARDS.FILTER_CARDS,
  payload: { filterCode, valueCode },
});

export {
  fetchAllCards,
  fetchAllCardsSuccess,
  fetchAllCardsFailure,
  fetchAllCardsReset,
  filterCards,
};
