import { all } from "@redux-saga/core/effects";
import marvelChampionsDBSaga from "./marvelChampionsDBSaga";

export default function* rootSaga() {
  yield all([marvelChampionsDBSaga()]);
}
