import React, { FC } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { IFood } from "../models/Food";
import SwipeItem from "./SwipeItem";

interface FoodItemProps extends IFood {
  onPressDelete: () => void;
  onPressEdit: () => void;
}

const FoodItem: FC<FoodItemProps> = (props) => {
  const { image, id, description, onPressDelete, onPressEdit } = props;
  const styles = StyleSheet.create({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      paddingHorizontal: 10,
    },
    image: {
      width: "40%",
      minHeight: 200,
      resizeMode: "cover",
      borderRadius: 15,
    },
    textContainer: {
      width: "60%",
      flexDirection: "column",
      flexWrap: "wrap",
      paddingVertical: 10,
      paddingHorizontal: 15,
    },
    text: {
      width: "100%",
    },
    title: {
      width: "100%",
      fontWeight: "bold",
      fontSize: 16,
      marginBottom: 5,
    },
  });

  return (
    <Swipeable
      renderLeftActions={(_progress, dragAnimatedValue) => (
        <SwipeItem
          onDeletePress={onPressDelete}
          onEditPress={onPressEdit}
          _progress={_progress}
          dragX={dragAnimatedValue}
        />
      )}
      overshootLeft={false}
    >
      <View style={styles.container}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Description:</Text>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default FoodItem;
