import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

//Stack/Tab Param Lists
export type GameTrackerStackParamList = {
  GameTracker: undefined;
  TrackedGameDetails: undefined;
};
export type CardLibraryStackParamList = {
  CardLibrary: undefined;
};

export type AppTabParamList = {
  GameTrackerStackScreen: NavigatorScreenParams<GameTrackerStackParamList>;
  CardLibraryStackScreen: NavigatorScreenParams<CardLibraryStackParamList>;
};

export type AppRootParamList = {
  Tab: NavigatorScreenParams<AppTabParamList>;
  TrackNewGame: undefined;
};

// Navigation Props

export type RootNavigationProps<T extends keyof AppRootParamList> =
  StackScreenProps<AppRootParamList, T>;

export type GameTrackerNavigationProps<
  T extends keyof GameTrackerStackParamList
> = CompositeScreenProps<
  StackScreenProps<GameTrackerStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, "GameTrackerStackScreen">,
    StackScreenProps<AppRootParamList, "Tab">
  >
>;

export type CardLibraryNavigationProps<
  T extends keyof CardLibraryStackParamList
> = CompositeScreenProps<
  StackScreenProps<CardLibraryStackParamList, T>,
  CompositeScreenProps<
    BottomTabScreenProps<AppTabParamList, "CardLibraryStackScreen">,
    StackScreenProps<AppRootParamList, "Tab">
  >
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRootParamList {}
  }
}
