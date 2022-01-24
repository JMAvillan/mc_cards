import { takeLatest, call, put } from "redux-saga/effects";
import { CARDS, DECKS, PACKS } from "../constants";
import { fetchDeckListSuccess, fetchDeckListFailure } from "../actions/decks";
import {
  fetchAllCards,
  fetchAllPacks,
  fetchDeckListApi,
} from "../api/marvelChampionsDB";
import { fetchAllCardsFailure, fetchAllCardsSuccess } from "../actions/cards";
import { fetchAllPacksFailure, fetchAllPacksSuccess } from "../actions/packs";

export function* handleDeckListFetch(action: { payload: any }) {
  try {
    console.log("handleDeckListFetch");
    const deckList: [] = yield call(
      fetchDeckListApi,
      action.payload.startingDate
    );
    console.log("handleDeckListFetch ->", deckList.length);

    yield put(fetchDeckListSuccess(deckList));
  } catch (error) {
    yield put(fetchDeckListFailure(error));
  }
}
export function* handleAllCardsFetch(action: { payload: any }) {
  try {
    console.log("handleAllCardsFetch");
    const cards: [] = yield call(fetchAllCards, action.payload.startingDate);
    console.log("handleAllCardsFetch ->", cards.length);
    yield put(fetchAllCardsSuccess(cards));
  } catch (error) {
    yield put(fetchAllCardsFailure(error));
  }
}
export function* handleAllPacksFetch(action: { payload: any }) {
  try {
    console.log("handleAllPacksFetch");
    const packs: [] = yield call(fetchAllPacks, action.payload.startingDate);
    console.log("handleAllPacksFetch ->", packs.length);
    yield put(fetchAllPacksSuccess(packs));
  } catch (error) {
    yield put(fetchAllPacksFailure(error));
  }
}

export default function* decklistWatcherSaga() {
  yield takeLatest(DECKS.REQUEST_DECK_LIST, handleDeckListFetch);
  yield takeLatest(CARDS.REQUEST_ALL_CARDS, handleAllCardsFetch);
  yield takeLatest(PACKS.REQUEST_ALL_PACKS, handleAllPacksFetch);
}
