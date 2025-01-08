import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import HomeScreen from "./src/screens/HomeScreen";
import CoinDetailScreen from './src/screens/CoinDetailScreen'
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";

const Stack=createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
        headerStyle: { backgroundColor: 'yellow' }, // Header arka plan rengi
        headerTintColor: 'dark', // Header yazı rengi
        headerTitleStyle: { fontWeight: 'bold' }, // Header yazı stili
    }}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Detail" component={CoinDetailScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
