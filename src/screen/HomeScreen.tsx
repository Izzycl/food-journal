import React, { FC, PropsWithChildren } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import ContentLayout from "../layouts/ContentLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./MainScreen";

interface HomeScreenProps {}

type route = "list" | "new";
type homeScreenProp = NavigationProp<RootStackParamList, "Home">;

const HomeScreen = (props: PropsWithChildren<HomeScreenProps>) => {
  const nav = useNavigation<homeScreenProp>();
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  function onPressButton(route: route) {
    if (route === "list") {
      nav.navigate("ListFood");
    }
    if (route === "new") {
      nav.navigate("NewFood");
    }
  }

  return (
    <ContentLayout header={false}>
      <View style={styles.container}>
        <Button title="Show Food List" onPress={() => onPressButton("list")} />
        <Button title="Create new food" onPress={() => onPressButton("new")} />
      </View>
    </ContentLayout>
  );
};

export default HomeScreen;
