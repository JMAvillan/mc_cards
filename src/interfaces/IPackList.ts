import IPack from "./IPack";

export default interface IPackList {
  packs: [IPack];
  error: null;

  packListFetchSuccess: boolean;
  packListFetchFailure: boolean;
}
