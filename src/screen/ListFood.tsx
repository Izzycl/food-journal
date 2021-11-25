import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import ContentLayout from "../layouts/ContentLayout";

interface ListFoodProps {}

const ListFood: FC<ListFoodProps> = (props) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return <ContentLayout></ContentLayout>;
};

export default ListFood;
