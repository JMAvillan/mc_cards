import { PACKS } from "../constants";
import IPackList from "../interfaces/IPackList";
import IPack from "../interfaces/IPack";

const tempDeck: IPack = {
  name: "",
  code: "",
  position: NaN,
  available: "",
  known: NaN,
  total: NaN,
  url: "",
  id: NaN,
};

const defaultState: IPackList = {
  packs: [tempDeck],
  error: null,

  packListFetchSuccess: false,
  packListFetchFailure: false,
};

const packListReducer = (
  state = defaultState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case PACKS.REQUEST_ALL_PACKS_SUCCESS: {
      return {
        ...state,
        packs: action.payload.packs,
        packListFetchSuccess: true,
      };
    }
    case PACKS.REQUEST_ALL_PACKS_FAILURE: {
      return {
        ...state,
        packListFetchFailure: true,
        error: action.payload.error,
      };
    }
    case PACKS.REQUEST_ALL_PACKS_RESET: {
      return {
        ...state,
        packListFetchSuccess: false,
        packListFetchFailure: false,
        error: null,
      };
    }
    default:
      return state;
  }
};

export { packListReducer };
