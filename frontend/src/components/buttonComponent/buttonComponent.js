import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Colors from "../colors/colors";

function ButtonComponent({ style, indicator, text, handler, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.buttonCont, style]}
      onPress={handler}
      disabled={disabled}
    >
      {indicator && (
        <ActivityIndicator size="small" color={Colors.transparentBg} />
      )}
      {!indicator && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
}

export default ButtonComponent;

const styles = StyleSheet.create({
  buttonCont: {
    width: "fitContent",
    flexDirection: "row",
    backgroundColor: Colors.btnClr,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.btnClr,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },

  buttonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
});
