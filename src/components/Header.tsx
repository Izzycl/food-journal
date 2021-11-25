import { useNavigation } from "@react-navigation/core";
import React, { FC } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

interface HeaderProps {}

const Header: FC<HeaderProps> = (props) => {
  const nav = useNavigation();
  const styles = StyleSheet.create({
    container: {
      height: 60,
      backgroundColor: "#262730",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      justifyContent: "space-between",
    },
    button: {
      height: 30,
      width: "auto",
      borderRadius: 10,
      overflow: "hidden",
      alignItems: "center",
      backgroundColor: "#77BA99",
      justifyContent: "center",
    },
    btnLabel: {
      color: "white",
      // padding: 10,
      paddingHorizontal: 10,
      textAlign: "center",
      textAlignVertical: "center",
    },
    logo: {
      height: "auto",
      justifyContent: "center",
      alignItems: "center",
    },
    logoText: {
      color: "white",
    },
  });

  return (
    <View style={styles.container}>
      <Pressable onPress={() => nav.goBack()} style={styles.button}>
        <Text style={styles.btnLabel}>Back</Text>
      </Pressable>
      <View style={styles.logo}>
        <Text style={styles.logoText}>Journalist Food</Text>
      </View>
    </View>
  );
};

export default Header;
