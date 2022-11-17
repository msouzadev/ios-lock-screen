import { View, Image, useWindowDimensions } from "react-native";
import bg from "../../../assets/images/bg.jpeg";
import Animated, {
  useAnimatedSensor,
  SensorType,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";

const IMAGE_OFFSET = 100;
const PI = Math.PI;
const HALF_PI = PI / 2;
export default function SensorAnimatedImage({ image, order = 1 }) {
  const { width, height } = useWindowDimensions();
  const sensor = useAnimatedSensor(SensorType.ROTATION);

  const imageStyle = useAnimatedStyle(() => {
    const {
      sensor: { value },
    } = sensor;
    const { yaw, pitch, roll } = value;

    return {
      top: withTiming(
        interpolate(
          pitch,
          [-HALF_PI, HALF_PI],
          [(-IMAGE_OFFSET * 2) / order, 0]
        ),
        { duration: 100 }
      ),
      left: withTiming(
        interpolate(roll, [-PI, PI], [(-IMAGE_OFFSET * 2) / order, 0]),
        {
          duration: 100,
        }
      ),
    };
  });
  return (
    <Animated.Image
      source={image}
      style={[
        {
          width: width + (2 * IMAGE_OFFSET) / order,
          height: height + (2 * IMAGE_OFFSET) / order,
          position: "absolute",
        },
        imageStyle,
      ]}
    />
  );
}
