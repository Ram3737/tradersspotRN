import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const BlinkingDot = (props) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start(() => animateDot());
    };

    animateDot();
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width: props.value || 6,
        height: props.value || 6,
        borderRadius: 5,
        backgroundColor:
          props.color === "green"
            ? "#00ff0a"
            : props.color === "orange"
            ? "#FF5F1F"
            : props.color === "blue"
            ? "#003ff0"
            : "none",
        opacity: opacity,
      }}
    />
  );
};

export default BlinkingDot;
