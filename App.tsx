import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomIcon from "./src/components/CustomIcon";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./src/navigators/TabNavigator";
import MovieDetails from "./src/screens/MovieDetails";
import SeatBooking from "./src/screens/SeatBooking";
import Home from "./src/screens/Home";

// SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    poppins_bold: require("./assets/fonts/Poppins-Bold.ttf"),
    poppins_black: require("./assets/fonts/Poppins-Black.ttf"),
    poppins_extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    poppins_extralight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
    poppins_light: require("./assets/fonts/Poppins-Light.ttf"),
    poppins_medium: require("./assets/fonts/Poppins-Medium.ttf"),
    poppins_regular: require("./assets/fonts/Poppins-Regular.ttf"),
    poppins_semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    poppins_thin: require("./assets/fonts/Poppins-Thin.ttf"),
    IcoMoon: require("./assets/fonts/IcoMoon-Free.ttf"),
    poppins_semibold_italic: require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    poppins_thin_italic: require("./assets/fonts/Poppins-ThinItalic.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: "default" }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetails}
          options={{ animation: "slide_from_left" }}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBooking}
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

