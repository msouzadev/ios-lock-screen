import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  useWindowDimensions,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  useDerivedValue,
} from "react-native-reanimated";
export const NOTIFICATION_HEIGHT = 80;
const NotificationItem = ({
  data,
  index,
  listVisibility,
  scrollY,
  footerHeight,
}) => {
  const { height } = useWindowDimensions();
  const containerHeight = useDerivedValue(
    () => height - 250 - footerHeight.value
  );
  const startPosition = NOTIFICATION_HEIGHT * index;

  const animatedItemStyle = useAnimatedStyle(() => {
    const position1 = startPosition - containerHeight.value;
    const position2 =
      startPosition + NOTIFICATION_HEIGHT - containerHeight.value;
    if (listVisibility.value >= 1) {
      return {
        opacity: interpolate(scrollY.value, [position1, position2], [0, 1]),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              [position1, position2],
              [-NOTIFICATION_HEIGHT / 2, 0],
              Extrapolate.CLAMP
            ),
          },
          {
            scale: interpolate(
              scrollY.value,
              [position1, position2],
              [0.3, 1],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }
    return {
      transform: [
        {
          translateY: interpolate(
            listVisibility.value,
            [0, 1],
            [containerHeight.value - startPosition, 0]
          ),
        },
        { scale: interpolate(listVisibility.value, [0, 1], [0.5, 1]) },
      ],
      opacity: listVisibility.value,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedItemStyle]}>
      <Image source={data.icon} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {data.subtitle}
        </Text>
      </View>
      <Text style={styles.time}>{data.createdAt} ago</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: NOTIFICATION_HEIGHT - 10,
    backgroundColor: "#00000075",
    margin: 5,
    marginHorizontal: 10,
    padding: 13,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  time: {
    color: "lightgray",
    fontSize: 12,
    position: "absolute",
    right: 10,
    top: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  title: {
    color: "white",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  subtitle: {
    color: "white",
    lineHeight: 18,
    letterSpacing: 0.2,
  },
});
export default NotificationItem;
