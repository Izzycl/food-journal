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
  useWindowDimensions,
} from "react-native";
import ContentLayout from "../layouts/ContentLayout";
import { useListFood } from "./hooks/useListFood";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";
import FoodItem from "../components/FoodItem";
interface ListFoodProps {}

const ListFood: FC<ListFoodProps> = (props) => {
  const { foods, loading, styles, deleteFood } = useListFood();

  return (
    <ContentLayout header={true} scrollView={false}>
      <View>
        {loading && foods.length > 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            style={styles.flatList}
            data={foods}
            ItemSeparatorComponent={() => <View style={styles.separatorItem} />}
            keyExtractor={(item, idx) => `{${item.id}-u-${idx}}`}
            renderItem={(data) => (
              <FoodItem
                onPressDelete={() => deleteFood(data.item.id)}
                onPressEdit={() => {}}
                {...data.item}
              />
            )}
            ListEmptyComponent={() => (
              <View style={styles.emptyItem}>
                <Text style={styles.emptyItemText}>No items yet</Text>
              </View>
            )}
          />
        )}
      </View>
    </ContentLayout>
  );
};

export default ListFood;
