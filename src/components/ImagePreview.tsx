import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
} from "react-native";

interface ImagePreviewProps {
  image: string;
}

const ImagePreview: FC<ImagePreviewProps> = (props) => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {},
    image: {
      width: 300,
      height: 400,
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Image source={{ uri: props.image }} style={styles.image} />
    </View>
  );
};

export default ImagePreview;
