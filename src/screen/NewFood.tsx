import React, { FC, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import ContentLayout from "../layouts/ContentLayout";
import { Camera } from "expo-camera";
import { useNewFood } from "./hooks/useNewFood";
import { ModalCustom } from "../components/ModalCustom";
import ImagePreview from "../components/ImagePreview";
interface NewFoodProps {}

const NewFood: FC<NewFoodProps> = (props) => {
  const camera = useRef(null);
  const {
    startCamera,
    setStartCamera,
    takePicture,
    capturedImage,
    styles,
    openCamera,
  } = useNewFood(camera);

  return (
    <ContentLayout>
      <View style={styles.base}>
        <ModalCustom
          visible={startCamera}
          onClose={() => setStartCamera(false)}
          onTakePhoto={takePicture}
        >
          <Camera
            style={{ height: "100%", width: "100%" }}
            ratio={"1:1"}
            ref={camera}
          ></Camera>
        </ModalCustom>
        <View style={styles.content}>
          {capturedImage ? (
            <ImagePreview image={capturedImage.uri} />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button title="Open Camera" onPress={() => openCamera()} />
            </View>
          )}
          {capturedImage ? (
            <View>
              <Button
                title="Take new photo"
                onPress={() => setStartCamera(true)}
              />
              <TextInput />
            </View>
          ) : null}
        </View>
      </View>
    </ContentLayout>
  );
};

export default NewFood;
