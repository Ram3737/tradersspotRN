import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import PieChart from "react-native-pie-chart";

import Colors from "../colors/colors";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";

const Legend = ({ color, label }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 5,
    }}
  >
    <View
      style={{
        width: 10,
        height: 10,
        backgroundColor: color,
        marginRight: 5,
        borderRadius: 50,
      }}
    />
    <Text
      style={{
        fontSize: CalculateFontSize(1.3),
        color: "#fff",
        fontWeight: "300",
      }}
    >
      {label}
    </Text>
  </View>
);

const DonutChart = (props) => {
  const widthAndHeight = 110;
  const series = props.series;
  const sliceColor = [Colors.clr4, Colors.clr3];

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={[styles.container, { marginTop: props.marginTop }]}>
        <PieChart
          widthAndHeight={widthAndHeight}
          series={series}
          sliceColor={sliceColor}
          coverRadius={0.85}
          coverFill={"transparent"}
        />

        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: props.top,
            left: props.left,
          }}
        >
          {sliceColor.map((color, index) => (
            <Legend
              key={index}
              color={color}
              label={index === 0 ? "Risk      " : "Reward"}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  title: {
    fontSize: 24,
    margin: 10,
  },
});

export default DonutChart;
