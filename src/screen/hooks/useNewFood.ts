import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, useWindowDimensions } from "react-native";

import * as SQLite from "expo-sqlite";
export const useNewFood = (camera: any) => {
  const db = SQLite.openDatabase("db.db");

  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>();
  const [description, setDescription] = useState<string>();
  const openCamera = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setStartCamera(status === "granted");
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    const photo: any = await camera.current.takePictureAsync({ base64: true });
    if (photo) {
      console.log(photo.base64);
      setPreviewVisible(true);
      setCapturedImage(photo);
      setStartCamera(false);
    }
  };

  function createFood(image: string, description: string) {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO foods (image, description) values (?, ?)",
        [image, description.toString()],
        (txObj, resultSet) => {
          Alert.alert("!!", "Food Save!", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        },
        //@ts-ignore
        (txObj, error) => {
          console.log(error);
          Alert.alert("!!", "Error trying to save the food", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        }
      );
    });
  }

  const { height } = useWindowDimensions();

  const styles = StyleSheet.create({
    base: {
      justifyContent: "center",
      height: "100%",
      flexWrap: "wrap",
    },
    content: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    btnContainer: {
      alignItems: "center",
      width: "100%",
      paddingBottom: 30,
    },
    textInput: {
      width: "100%",
      borderColor: "#577590",
      borderWidth: 1,
      borderRadius: 5,
      alignSelf: "center",
      paddingHorizontal: 10,
      paddingVertical: 10,
      color: "black",
    },
    customBtn: {
      width: "40%",
      backgroundColor: "#577590",
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderRadius: 10,
      alignItems: "center",
    },
    labelBtn: {
      color: "white",
      fontWeight: "600",
    },
    textInputContainer: {
      width: "80%",
    },
    textInputLabel: {
      marginBottom: 5,
    },
  });

  return {
    startCamera,
    setStartCamera,
    takePicture,
    capturedImage,
    styles,
    openCamera,
    createFood,
    description,
    setDescription,
  };
};
