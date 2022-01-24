import { combineReducers } from "redux";
import { cardListReducer } from "./cardListReducer";
import { deckListReducer } from "./decklistReducer";
import { packListReducer } from "./packListReducer";

const appReducer = combineReducers({
  decks: deckListReducer,
  cards: cardListReducer,
  packs: packListReducer,
});

const rootReducer = (state: any, action: { type: string; payload: any }) => {
  return appReducer(state, action);
};

export default rootReducer;
