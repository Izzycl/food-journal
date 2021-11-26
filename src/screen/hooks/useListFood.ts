import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Food } from "../../models/Food";
export const useListFood = () => {
  const db = SQLite.openDatabase("db.db");
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  function getFoods() {
    db.transaction((tx) => {
      tx.executeSql("select * from foods", [], (_, { rows }) => {
        console.log(rows);
        setFoods(rows._array);
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

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    if (foods) console.log(foods);
  }, [foods]);

  const styles = StyleSheet.create({
    loadingContainer: {
      width: "100%",
      height: 200,
      backgroundColor: "yellow",
    },
  });

  return {
    foods,
    loading,
    setLoading,
    styles,
  };
};
