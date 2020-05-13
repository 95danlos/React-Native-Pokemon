import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PokemonList from "./pages/PokemonList"
import PokemonDetails from "./pages/PokemonDetails"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PokemonList" screenOptions={{headerShown: false }}>
        <Stack.Screen
          name="PokemonList"
          component={PokemonList}
        />
        <Stack.Screen 
          name="PokemonDetails" 
          component={PokemonDetails} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

