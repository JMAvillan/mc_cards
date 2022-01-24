import { DECKS } from "../constants";
import IDeckList from "../interfaces/IDeckList";
import IDeck from "../interfaces/IDeck";

const tempDeck: IDeck = {
  id: NaN,
  name: "",
  date_creation: "",
  date_update: "",
  description_md: "",
  user_id: NaN,
  investigator_code: "",
  investigator_name: "",
  slots: {},
  ignoreDeckLimitSlots: null,
  version: NaN,
  meta: { aspect: "" },
  tags: "",
};

const defaultState: IDeckList = {
  decks: [tempDeck],
  error: null,

  deckListFetchSuccess: false,
  deckListFetchFailure: false,
};

const deckListReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case DECKS.REQUEST_DECK_LIST_SUCCESS: {
      return {
        ...state,
        decks: [...state.decks, ...action.payload.deckList],
        deckListFetchSuccess: true,
      };
    }
    case DECKS.REQUEST_DECK_LIST_FAILURE: {
      return {
        ...state,
        deckListFetchFailure: true,
        error: action.payload.error,
      };
    }
    case DECKS.REQUEST_DECK_LIST_RESET: {
      return {
        ...state,
        deckListFetchSuccess: false,
        deckListFetchFailure: false,
        error: null,
      };
    }
    default:
      return state;
  }
};

export { deckListReducer };
