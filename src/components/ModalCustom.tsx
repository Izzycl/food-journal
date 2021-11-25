import React from "react";
import {
  Modal,
  View,
  StyleSheet,
  useWindowDimensions,
  Pressable,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ModalCustomProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onTakePhoto: () => void;
}

export const ModalCustom = (props: ModalCustomProps) => {
  const { visible, children, onClose, onTakePhoto } = props;
  const { width, height } = useWindowDimensions();

  const styles = StyleSheet.create({
    modal: {
      flex: 1,
    },
    base: {
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.45)",
    },
    overView: {
      width: "100%",
      height: "100%",
      justifyContent: "space-between",
    },
    btn: {
      width: 45,
      height: 45,
      backgroundColor: "red",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    btnLabel: {
      fontSize: 30,
      lineHeight: 29,
      color: "white",
    },
    safeArea: {
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: 2,
      display: "flex",
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 20,
    },
  });

  return (
    <Modal visible={visible} style={styles.modal} transparent={true}>
      <View style={styles.base}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.overView}>
            <Pressable style={styles.btn} onPress={onClose}>
              <Text style={styles.btnLabel}>x</Text>
            </Pressable>

            <Pressable
              style={{ ...styles.btn, ...{ alignSelf: "center" } }}
              onPress={onTakePhoto}
            >
              <Text style={styles.btnLabel}>o</Text>
            </Pressable>
          </View>
        </SafeAreaView>
        <View>{children}</View>
      </View>
    </Modal>
  );
};
