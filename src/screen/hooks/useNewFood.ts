import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export const useNewFood = (camera: any) => {
  const [startCamera, setStartCamera] = useState<boolean>(false);
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<any>();
  const openCamera = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setStartCamera(status === "granted");
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    const photo: any = await camera.current.takePictureAsync();
    if (photo) {
      console.log(photo);
      setPreviewVisible(true);
      setCapturedImage(photo);
      setStartCamera(false);
    }
  };

  const styles = StyleSheet.create({
    base: {
      justifyContent: "center",
    },
    content: {
      width: "100%",
      height: "100%",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  });

  return {
    startCamera,
    setStartCamera,
    takePicture,
    capturedImage,
    styles,
    openCamera,
  };
};
