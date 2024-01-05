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
        backgroundColor: "#00ff0a",
        opacity: opacity,
      }}
    />
  );
};

export default BlinkingDot;
