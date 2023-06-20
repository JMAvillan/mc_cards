import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Filters from "../general/filters";
import GameTracker from "../tabbar/GameTrackerStack/GameTracker";
import TrackNewGame from "../tabbar/GameTrackerStack/TrackNewGame";
import TrackedGameDetails from "../tabbar/GameTrackerStack/TrackedGameDetails";
import CardLibrary from "../tabbar/CardLibraryStack/CardLibrary";

const GameTrackerStack = createStackNavigator();
const CardLibraryStack = createStackNavigator();

const CardLibraryStackScreen = () => {
  return (
    <CardLibraryStack.Navigator>
      <CardLibraryStack.Screen
        name="Home"
        component={CardLibrary}
        options={{}}
      />
      <CardLibraryStack.Screen
        name="Filters"
        component={Filters}
        options={{
          presentation: "modal",
          // headerShown: false,
          cardOverlayEnabled: true,
        }}
      />
    </CardLibraryStack.Navigator>
  );
};
const GameTrackerStackScreen = () => {
  return (
    <GameTrackerStack.Navigator>
      <GameTrackerStack.Screen
        name="GameTracker"
        component={GameTracker}
        options={{}}
      />
      <GameTrackerStack.Screen
        name="TrackedGameDetails"
        component={TrackedGameDetails}
        options={{}}
      />
    </GameTrackerStack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="GameTracker" component={GameTrackerStackScreen} />
      <Tab.Screen name="CardLibrary" component={CardLibraryStackScreen} />
    </Tab.Navigator>
  );
};

const RootStack = createStackNavigator();
const RootStackScreen = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Tab" component={Tabs} options={{}} />
      <RootStack.Screen
        name="TrackNewGame"
        component={TrackNewGame}
        options={{}}
      />
    </RootStack.Navigator>
  );
};

export { RootStackScreen };
