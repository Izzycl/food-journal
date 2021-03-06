import React, { FC, useRef } from "react";
import { View, Text, TextInput, useWindowDimensions } from "react-native";
import ContentLayout from "../layouts/ContentLayout";
import { Camera } from "expo-camera";
import { useNewFood } from "./hooks/useNewFood";
import { ModalCustom } from "../components/ModalCustom";
import ImagePreview from "../components/ImagePreview";
import CustomButton from "../components/CustomButton";
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
    setDescription,
    description,
    createFood,
    setCapturedImage,
  } = useNewFood(camera);
  const { height } = useWindowDimensions();
  return (
    <ContentLayout scrollView={true}>
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
          <View style={styles.btnContainer}>
            <ImagePreview image={capturedImage.uri} />
            <CustomButton
              label="Take new photo"
              onPress={() => setStartCamera(true)}
            />
            <View style={styles.textInputContainer}>
              <Text style={styles.textInputLabel}>Description</Text>
              <TextInput
                multiline
                numberOfLines={4}
                style={styles.textInput}
                selectionColor={"black"}
                value={description}
                onChangeText={(text: string) => setDescription(text)}
              />
            </View>
            <CustomButton
              label="Create new Foods in Journalist"
              onPress={() => createFood(capturedImage.uri, description!)}
              baseStyle={{ marginTop: 10 }}
            />
          </View>
        ) : (
          <View
            style={{
              ...styles.btnContainer,
              ...{ justifyContent: "center", height: height - 140 },
            }}
          >
            <Text style={styles.titleNewFood}>
              To created a new Food press "Open Camera"
            </Text>
            <CustomButton label="Open Camera" onPress={() => openCamera()} />
          </View>
        )}
      </View>
    </ContentLayout>
  );
};

export default NewFood;
