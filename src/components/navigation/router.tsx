import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/home";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      {/* <HomeStack.Screen name="Notifications" component={Notifications} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Settings" component={Settings} /> */}
    </HomeStack.Navigator>
  );
};

export { HomeStackScreen };
