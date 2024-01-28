import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CommonStyles from "../../components/css/commonStyles";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";

//FOR FONNT RESPONSIVE HEIGHT
const { height } = Dimensions.get("window");

const calculateFontSize = (percentage) => {
  return (height * percentage) / 100;
};

function StarterScreen() {
  const navigation = useNavigation();

  function getStartedHandler() {
    navigation.navigate("beforeLoggedIn");
  }

  return (
    <View style={CommonStyles.mainContainer}>
      <ImageBackground
        source={require("../../images/logo/tradersSpotLogo.png")}
        style={styles.picCont}
        imageStyle={styles.pic}
      ></ImageBackground>

      <View style={styles.textCont}>
        <Text style={styles.text}>Analyze Draw Trade</Text>
      </View>

      <View style={styles.buttonContainer}>
        <ButtonComponent
          style={{ justifyContent: "start" }}
          text={"Get Started"}
          handler={getStartedHandler}
        />
      </View>
    </View>
  );
}

export default StarterScreen;

const styles = StyleSheet.create({
  picCont: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  pic: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  textCont: {
    width: "60%",
    marginTop: "5%",
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontSize: calculateFontSize(7),
    textAlign: "left",
  },
  buttonContainer: {
    marginTop: "5%",
    width: "40%",
    alignSelf: "flex-start",
  },
});
