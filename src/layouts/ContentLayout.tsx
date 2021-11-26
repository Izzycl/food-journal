import React, { FC, PropsWithChildren, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ScrollView,
  useWindowDimensions,
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import Constants from "expo-constants";

interface ContentLayoutProps {
  header?: boolean;
  scrollView?: boolean;
}

const ContentLayout: FC<PropsWithChildren<ContentLayoutProps>> = (props) => {
  const { children, header = true, scrollView } = props;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  const { height } = useWindowDimensions();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ height: "100%", width: "100%" }}
    >
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        {header ? <Header /> : null}
        {scrollView ? (
          <ScrollView bounces={false}>{children}</ScrollView>
        ) : (
          children
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ContentLayout;
