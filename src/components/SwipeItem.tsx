import React, { FC } from "react";
import { View, Text, StyleSheet, Animated, Pressable } from "react-native";

interface DeleteSwipeProps {
  dragX: Animated.AnimatedInterpolation;
  _progress: Animated.AnimatedInterpolation;
  onDeletePress: () => void;
  onEditPress: () => void;
}

const DeleteSwipe: FC<DeleteSwipeProps> = (props: DeleteSwipeProps) => {
  const { dragX, _progress, onDeletePress, onEditPress } = props;
  const styles = StyleSheet.create({
    base: {
      width: 130,
      height: "100%",
      padding: 5,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    btn: {
      width: "100%",
      height: "48%",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
    },
    btnLabel: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
    },
  });
  const trans = dragX.interpolate({
    inputRange: [0, 50, 100, 130],
    outputRange: [-130, -100, -50, 0],
  });

  return (
    <Animated.View
      style={{
        ...styles.base,
        transform: [{ translateX: trans }],
      }}
    >
      <Pressable
        style={{ ...styles.btn, ...{ backgroundColor: "#5BC3EB" } }}
        onPress={onEditPress}
      >
        <Text style={{ ...styles.btnLabel, ...{ color: "black" } }}>Edit</Text>
      </Pressable>
      <Pressable
        style={{ ...styles.btn, ...{ backgroundColor: "#9A031E" } }}
        onPress={onDeletePress}
      >
        <Text style={styles.btnLabel}>Delete</Text>
      </Pressable>
    </Animated.View>
  );
};

export default DeleteSwipe;
