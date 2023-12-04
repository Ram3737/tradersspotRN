import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export default function CalculateFontSize(percentage) {
  return (height * percentage) / 100;
}
