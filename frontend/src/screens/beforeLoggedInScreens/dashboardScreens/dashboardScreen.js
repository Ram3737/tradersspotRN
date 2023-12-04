import { View, Text } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import CommonStyles from "../../../components/css/commonStyles";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import { AuthContext } from "../../../components/stores/context/authContextProvider";

function DashboardScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  function loginrSignupHandler() {
    console.log("hiiii");
    // authCtx.authenticationHandler();
    // authCtx.setCourseType("basic");
    // authCtx.setPaid(true);
    navigation.navigate("loginSignup");
  }

  return (
    <View style={CommonStyles.mainContainer}>
      <Text style={{ color: "#fff" }}>dashboard Screen screen</Text>
      <ButtonComponent text={"login/signup"} handler={loginrSignupHandler} />
      <ButtonComponent text={"logout"} handler={authCtx.logout} />
    </View>
  );
}

export default DashboardScreen;
