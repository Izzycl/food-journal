import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import ListFood from "./ListFood";
import NewFood from "./NewFood";
interface MainScreenProps {}

export type RootStackParamList = {
  ListFood: undefined;
  Home: undefined;
  NewFood: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const MainScreen: FC<MainScreenProps> = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListFood" component={ListFood} />
        <Stack.Screen name="NewFood" component={NewFood} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;
