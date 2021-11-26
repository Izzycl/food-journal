import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";

interface CustomButtonProps {
  onPress: () => void;
  label: string;
  baseStyle?: ViewStyle;
  labelStyle?: TextStyle;
}

const CustomButton: FC<CustomButtonProps> = (props) => {
  const { onPress, label, baseStyle, labelStyle } = props;
  const styles = StyleSheet.create({
    base: {
      width: "50%",
      backgroundColor: "#171D1C",
      marginBottom: 20,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
    },
    label: {
      textAlign: "center",
      color: "white",
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.base, ...baseStyle }}
    >
      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
