import React, { FC, PropsWithChildren, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

interface ContentLayoutProps {
  header?: boolean;
}

const ContentLayout: FC<PropsWithChildren<ContentLayoutProps>> = (props) => {
  const { children, header = true } = props;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <SafeAreaView>
      {header ? <Header /> : null}
      {children}
    </SafeAreaView>
  );
};

export default ContentLayout;
