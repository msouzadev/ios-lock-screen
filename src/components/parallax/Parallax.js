import React from "react";
import { View } from "react-native";
import SensorAnimatedImage from "../sensorAnimatedImage/SensorAnimatedImage";

// import { Container } from './styles';

const Parallax = ({ layers }) => {
  return (
    <>
      {layers.reverse().map((layer, index) => (
        <SensorAnimatedImage
          key={`layer-${index}`}
          image={layer}
          order={index + 1}
        />
      ))}
    </>
  );
};

export default Parallax;
