import React, { FC, PropsWithChildren, useEffect } from "react";
import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import ContentLayout from "../layouts/ContentLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./MainScreen";
import CustomButton from "../components/CustomButton";

import * as SQLite from "expo-sqlite";
import { SQLTransactionCallback } from "expo-sqlite";
interface HomeScreenProps {}

type route = "list" | "new";
type homeScreenProp = NavigationProp<RootStackParamList, "Home">;

const HomeScreen = (props: PropsWithChildren<HomeScreenProps>) => {
  const db = SQLite.openDatabase("db.db");

  const nav = useNavigation<homeScreenProp>();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
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

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, description TEXT)"
      );
    });
  }, []);

  function getFoods() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM foods;",
        [],
        (_, { rows }) => {
          console.log("fn2");
          console.log(rows);
        },
        //@ts-ignore
        (x, er) => console.log(er)
      );
    });
  }

  function deleteTable() {
    db.transaction((tx) => {
      tx.executeSql("DROP TABLE IF EXISTS foods;", [], (_, { rows }) => {
        console.log(rows);
      });
    });
  }

  return (
    <ContentLayout header={false}>
      <View style={styles.container}>
        <CustomButton
          label="Show list of foods"
          onPress={() => onPressButton("list")}
        />
        <CustomButton
          label="Create new food"
          onPress={() => onPressButton("new")}
        />
        {/* <Text style={{ width: "100%", textAlign: "center" }}>Dev buttons</Text>
        <CustomButton label="GET FOODS" onPress={() => getFoods()} />
        <CustomButton label="DELETE TABLE" onPress={() => deleteTable()} /> */}
      </View>
    </ContentLayout>
  );
};

export default HomeScreen;
