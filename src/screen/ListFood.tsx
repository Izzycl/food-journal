import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  Animated,
  Pressable,
} from "react-native";
import ContentLayout from "../layouts/ContentLayout";
import { useListFood } from "./hooks/useListFood";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
interface ListFoodProps {}

const ListFood: FC<ListFoodProps> = (props) => {
  const { foods, loading, styles } = useListFood();

  console.log(foods);

  const data = [{ id: 1, item: "asdasdas" }];
  //@ts-ignore
  const renderLeftActions = (_progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 130],
      outputRange: [-130, -100, -50, 0],
    });
    return (
      <Animated.View
        style={{
          width: 130,
          height: 130,
          backgroundColor: "red",

          transform: [{ translateX: trans }],
        }}
      >
        <Pressable
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white" }}>Delete</Text>
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <ContentLayout header={true} scrollView={false}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {loading && foods.length > 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            style={{ width: "100%" }}
            data={foods}
            keyExtractor={(item, idx) => `{${item.id}-u-${idx}}`}
            renderItem={(data) => (
              <Swipeable
                renderLeftActions={renderLeftActions}
                overshootLeft={false}
              >
                <View
                  style={{
                    width: "100%",
                    height: 120,
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  <Image
                    source={{
                      uri: `data:image/jpeg;base64,${data.item.image}`,
                    }}
                    style={{
                      width: 150,
                      height: "100%",
                      resizeMode: "cover",
                      borderRadius: 15,
                    }}
                  />
                  <Text>{data.item.description}</Text>
                </View>
              </Swipeable>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: 100,
                  backgroundColor: "green",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text>No items yet</Text>
              </View>
            )}
          />
        )}
      </View>
    </ContentLayout>
  );
};

export default ListFood;
