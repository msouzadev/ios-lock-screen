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
const NotificationsList = ({
  footerHeight,
  footerVisibility,
  ...flatListProps
}) => {
  const { height } = useWindowDimensions();
  const listVisibility = useSharedValue(1);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const contentOffsetY = event.contentOffset.y;
      scrollY.value = contentOffsetY;
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
          footerHeight={footerHeight}
          scrollY={scrollY}
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
