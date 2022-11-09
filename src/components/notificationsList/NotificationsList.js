import React from "react";
import { FlatList, useWindowDimensions } from "react-native";

import notifications from "../../../assets/data/notifications";
import NotificationItem from "../notificationItem/NotificationItem";
import Animated, { useSharedValue } from "react-native-reanimated";
import {
  useAnimatedScrollHandler,
  withTiming,
  withSpring,
} from "react-native-reanimated";
const NotificationsList = ({ footerVisibility, ...flatListProps }) => {
  const { height } = useWindowDimensions();
  const listVisibility = useSharedValue(1);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      console.log({ contentOffsetY: event.contentOffset.y });
      const contentOffsetY = event.contentOffset.y;
      if (contentOffsetY < 10) {
        footerVisibility.value = withTiming(1, { duration: 300 });
      } else {
        footerVisibility.value = withTiming(0, { duration: 300 });
      }
    },
    onBeginDrag: (event) => {
      if (event.contentOffset.y < 1) {
        listVisibility.value = withSpring(1);
      }
    },
    onEndDrag: (event) => {
      if (event.contentOffset.y < 0) {
        listVisibility.value = withTiming(0);
      }
    },
  });
  return (
    <Animated.FlatList
      data={notifications}
      renderItem={({ item, index }) => (
        <NotificationItem
          data={item}
          index={index}
          listVisibility={listVisibility}
        />
      )}
      {...flatListProps}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    />
  );
};

export default NotificationsList;
