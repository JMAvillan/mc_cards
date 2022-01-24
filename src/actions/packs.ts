import { PACKS } from "../constants";

const fetchAllPacks = () => ({
  type: PACKS.REQUEST_ALL_PACKS,
  payload: {},
});
const fetchAllPacksSuccess = (packs: {}) => ({
  type: PACKS.REQUEST_ALL_PACKS_SUCCESS,
  payload: {
    packs,
  },
});
const fetchAllPacksFailure = (error: any) => ({
  type: PACKS.REQUEST_ALL_PACKS_FAILURE,
  payload: {
    error,
  },
});
const fetchAllPacksReset = () => ({
  type: PACKS.REQUEST_ALL_PACKS_RESET,
  payload: {},
});

export {
  fetchAllPacks,
  fetchAllPacksSuccess,
  fetchAllPacksFailure,
  fetchAllPacksReset,
};
