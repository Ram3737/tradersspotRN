import React, { useState } from "react";
import {
  View,
  TextInput,
  Linking,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

import CommonStyles from "../../../components/css/commonStyles";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import Colors from "../../../components/colors/colors";
import OurCoursesScreen from "../../beforeLoggedInScreens/ourCoursesScreens/ourCoursesScreen";

function DiscussScreen() {
  const [msg, setMsg] = useState("");
  const [mobileNo, setMobileNo] = useState("8248189924");

  const sendOnWhatsApp = () => {
    if (msg) {
      let url = "whatsapp://send?phone=91" + mobileNo + "&text=" + msg;
      Linking.openURL(url)
        .then(() => {
          setTimeout(() => {
            setMsg("");
          }, 3000);
        })
        .catch(() => {
          Alert.alert(
            "Error",
            "Make sure WhatsApp is installed on your device"
          );
        });
    } else {
      Alert.alert("Error", "Please type a message to send");
    }
  };

  return (
    <View style={[CommonStyles.mainContainer, { position: "relative" }]}>
      <Image
        source={require("../../../images/pictures/planetMain.png")}
        style={styles.imageLgnTop0}
      />
      <View style={styles.loginCont}>
        <View style={styles.loginSubCont1}>
          <View style={styles.loginSubCont2}>
            <Image
              source={require("../../../images/pictures/alienDiscuss.png")}
              style={styles.imageLgnTop}
            />
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Enter your doubts"
              placeholderTextColor="#999"
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4} // You can adjust the number of lines displayed
              value={msg}
              onChangeText={(text) => setMsg(text)}
            />
            <ButtonComponent
              style={{ marginTop: 20 }}
              text={"Send"}
              handler={sendOnWhatsApp}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default DiscussScreen;

const styles = StyleSheet.create({
  loginCont: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  loginSubCont1: {
    height: 290,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "relative",
    // backgroundColor: "yellow",
  },

  imageLgnTop0: {
    width: 180,
    height: 180,
    position: "absolute",
    top: -60,
    right: -85,
    alignSelf: "flex-start",
    opacity: 0.7,
    zIndex: 1,
    transform: [{ rotate: "-20deg" }],
  },

  imageLgnTop: {
    width: 100,
    height: 100,
    position: "absolute",
    top: -70,
    left: 100,
    alignSelf: "flex-start",
    // opacity: 1,
    zIndex: 1,
  },

  loginSubCont2: {
    width: "90%",
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    position: "relative",
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.clr3,
    zIndex: 10,
  },

  input: {
    width: "85%",
    height: 100,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#fff",
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});
