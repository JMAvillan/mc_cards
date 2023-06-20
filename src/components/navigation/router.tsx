import { createStackNavigator } from "@react-navigation/stack";
import Filters from "../general/filters";
import Home from "../screens/home";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{}} />
      <HomeStack.Screen
        name="Filters"
        component={Filters}
        options={{
          presentation: "modal",
          // headerShown: false,
          cardOverlayEnabled: true,
        }}
      />
      {/* <HomeStack.Screen name="Notifications" component={Notifications} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Settings" component={Settings} /> */}
    </HomeStack.Navigator>
  );
};

export { HomeStackScreen };
