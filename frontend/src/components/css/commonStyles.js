import { StyleSheet } from "react-native";
import Colors from "../colors/colors";

const CommonStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    backgroundColor: Colors.mainBgClr,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CommonStyles;
