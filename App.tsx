import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, useColorScheme } from "react-native";
import configureStore from "./src/store";
import { Provider } from "react-redux";
import { HomeStackScreen } from "./src/components/navigation/router";
import {
  DefaultTheme,
  DarkTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

const lightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#E89221",
    // background: "#EBE9EC",
    notification: "rgb(255, 69, 58)",
  },
};
const darkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#E89221",
    notification: "rgb(255, 69, 58)",
  },
};

export default function App() {
  const scheme = useColorScheme();
  const store = configureStore();

  const [fontLoaded] = useFonts({
    //Raleway - Primary Font
    Raleway: require("./assets/fonts/Raleway_(H1)/Raleway-Black.ttf"),
    "Raleway-BlackItalic": require("./assets/fonts/Raleway_(H1)/Raleway-BlackItalic.ttf"),
    "Raleway-Bold": require("./assets/fonts/Raleway_(H1)/Raleway-Bold.ttf"),
    "Raleway-BoldItalic": require("./assets/fonts/Raleway_(H1)/Raleway-BoldItalic.ttf"),
    "Raleway-ExtraBold": require("./assets/fonts/Raleway_(H1)/Raleway-ExtraBold.ttf"),
    "Raleway-ExtraBoldItalic": require("./assets/fonts/Raleway_(H1)/Raleway-ExtraBoldItalic.ttf"),
    "Raleway-ExtraLight": require("./assets/fonts/Raleway_(H1)/Raleway-ExtraLight.ttf"),
    "Raleway-ExtraLightItalic": require("./assets/fonts/Raleway_(H1)/Raleway-ExtraLightItalic.ttf"),
    "Raleway-Italic": require("./assets/fonts/Raleway_(H1)/Raleway-Italic.ttf"),
    "Raleway-Medium": require("./assets/fonts/Raleway_(H1)/Raleway-Medium.ttf"),
    "Raleway-MediumItalic": require("./assets/fonts/Raleway_(H1)/Raleway-MediumItalic.ttf"),
    "Raleway-Regular": require("./assets/fonts/Raleway_(H1)/Raleway-Regular.ttf"),
    "Raleway-SemiBold": require("./assets/fonts/Raleway_(H1)/Raleway-SemiBold.ttf"),
    "Raleway-SemiBoldItalic": require("./assets/fonts/Raleway_(H1)/Raleway-SemiBoldItalic.ttf"),
    "Raleway-Thin": require("./assets/fonts/Raleway_(H1)/Raleway-Thin.ttf"),
    "Raleway-ThinItalic": require("./assets/fonts/Raleway_(H1)/Raleway-ThinItalic.ttf"),

    //Nunito - Secondary Font
    Nunito: require("./assets/fonts/Nunito_(H2)/Nunito-Black.ttf"),
    "Nunito-BlackItalic": require("./assets/fonts/Nunito_(H2)/Nunito-BlackItalic.ttf"),
    "Nunito-Bold": require("./assets/fonts/Nunito_(H2)/Nunito-Bold.ttf"),
    "Nunito-BoldItalic": require("./assets/fonts/Nunito_(H2)/Nunito-BoldItalic.ttf"),
    "Nunito-ExtraBold": require("./assets/fonts/Nunito_(H2)/Nunito-ExtraBold.ttf"),
    "Nunito-ExtraBoldItalic": require("./assets/fonts/Nunito_(H2)/Nunito-ExtraBoldItalic.ttf"),
    "Nunito-ExtraLight": require("./assets/fonts/Nunito_(H2)/Nunito-ExtraLight.ttf"),
    "Nunito-ExtraLightItalic": require("./assets/fonts/Nunito_(H2)/Nunito-ExtraLightItalic.ttf"),
    "Nunito-Italic": require("./assets/fonts/Nunito_(H2)/Nunito-Italic.ttf"),
    "Nunito-Light": require("./assets/fonts/Nunito_(H2)/Nunito-Light.ttf"),
    "Nunito-LightItalic": require("./assets/fonts/Nunito_(H2)/Nunito-LightItalic.ttf"),
    "Nunito-Medium": require("./assets/fonts/Nunito_(H2)/Nunito-Medium.ttf"),
    "Nunito-MediumItalic": require("./assets/fonts/Nunito_(H2)/Nunito-MediumItalic.ttf"),
    "Nunito-Regular": require("./assets/fonts/Nunito_(H2)/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/Nunito_(H2)/Nunito-SemiBold.ttf"),
    "Nunito-SemiBoldItalic": require("./assets/fonts/Nunito_(H2)/Nunito-SemiBoldItalic.ttf"),

    //Biryani - Secondary Font
    Biryani: require("./assets/fonts/Biryani_(H3)/Biryani-Black.ttf"),
    "Biryani-Bold": require("./assets/fonts/Biryani_(H3)/Biryani-Bold.ttf"),
    "Biryani-ExtraBold": require("./assets/fonts/Biryani_(H3)/Biryani-ExtraBold.ttf"),
    "Biryani-ExtraLight": require("./assets/fonts/Biryani_(H3)/Biryani-ExtraLight.ttf"),
    "Biryani-Light": require("./assets/fonts/Biryani_(H3)/Biryani-Light.ttf"),
    "Biryani-Regular": require("./assets/fonts/Biryani_(H3)/Biryani-Regular.ttf"),
    "Biryani-SemiBold": require("./assets/fonts/Biryani_(H3)/Biryani-SemiBold.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer theme={scheme === "dark" ? DarkTheme : lightTheme}>
          <HomeStackScreen />
          {/* <View style={styles.container}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
        </View> */}
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
