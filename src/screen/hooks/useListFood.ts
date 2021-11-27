import { useIsFocused } from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Food } from "../../models/Food";
export const useListFood = () => {
  const db = SQLite.openDatabase("db.db");
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { height } = useWindowDimensions();
  function getFoods() {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM foods;", [], (_, { rows }) => {
        setFoods(rows._array);
      });
    });
  }

  function deleteFood(id: number) {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM foods WHERE id=?;", [id], () => {
        getFoods();
      });
    });
  }

  async function initialFetch() {
    setLoading(true);
    try {
      getFoods();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      initialFetch();
    }
  }, [isFocused]);

  useEffect(() => {
    if (foods) console.log(foods);
  }, [foods]);

  const styles = StyleSheet.create({
    loadingContainer: {
      width: "100%",
      height: 200,
      backgroundColor: "yellow",
    },
    emptyItem: {
      width: "100%",
      height: height - 140,
      alignItems: "center",
      justifyContent: "center",
    },
    separatorItem: {
      width: "100%",
      height: 10,
    },
    flatList: {
      width: "100%",
      marginTop: 10,
      height: height - 140,
    },
    emptyItemText: {
      fontSize: 20,
      fontWeight: "bold",
    },
  });

  return {
    foods,
    loading,
    setLoading,
    styles,
    deleteFood,
  };
};
