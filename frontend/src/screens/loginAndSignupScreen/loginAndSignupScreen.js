import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Vibration,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState, useEffect, useContext } from "react";
import axios from "axios";

import CommonStyles from "../../components/css/commonStyles";
import ButtonComponent from "../../components/buttonComponent/buttonComponent";
import Colors from "../../components/colors/colors";
import { CallPostApiServices } from "../../webServices/apiCalls";
import CustomAlertBox from "../../components/customAlertBox/customAlertBox";
import { AuthContext } from "../../components/stores/context/authContextProvider";

import { Switch } from "react-native-switch";
import HapticFeedback from "react-native-haptic-feedback";

function LoginAndSignupScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [contToDisplay, setContToDisplay] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [mblNo, setMblNo] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailErr, setEmailErr] = useState(null);
  const [mblNoErr, setMblNoErr] = useState(null);
  const [passwordErr, setPasswordErr] = useState(null);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(null);
  const [errFromBackend, setErrFromBackend] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [btnLoader, setBtnLoader] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (authCtx.userSelectedCourse) {
          authCtx.setUserSelectedCourse(null);
        }
        navigation.goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, [navigation]);

  const toggleSwitch = () => {
    if (Platform.OS === "ios") {
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };
      HapticFeedback.trigger("impactLight", options);
    } else if (Platform.OS === "android") {
      Vibration.vibrate(50);
    }

    authCtx.setRegisterSignupToggle(!authCtx.registerSignupToggle);
    setEmail("");
    setMblNo("");
    setPassword("");
    setConfirmPassword("");
    setLoginEmail("");
    setLoginPassword("");
    setErrFromBackend("");
    setBtnLoader(false);
  };

  const hideAlert = () => {
    setAlertVisible(false);
    toggleSwitch();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View style={styles.toggleContainer}>
            <Switch
              value={authCtx.registerSignupToggle}
              onValueChange={toggleSwitch}
              disabled={false}
              activeText={" login "}
              inActiveText={"signup"}
              circleSize={23}
              barHeight={32}
              // circleBorderWidth={3}
              backgroundActive={Colors.clr2}
              backgroundInactive={Colors.clr2}
              circleActiveColor={Colors.btnClr}
              circleInActiveColor={Colors.btnClr}
              // renderInsideCircle={} // custom component to render inside the Switch circle (Text, Image, etc.)
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{
                alignItems: "center",
                justifyContent: "center",
              }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={true}
              renderInActiveText={true}
              switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={10} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={contToDisplay ? 1 : 3.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
          </View>
        );
      },
    });
  }, [navigation, contToDisplay, toggleSwitch]);

  function loginClickHandler() {
    if (!loginEmail || !loginPassword) {
      return;
    }
    setBtnLoader(true);
    CallPostApiServices(
      `/user/signin`,
      {
        email: loginEmail,
        password: loginPassword,
      },
      (response) => {
        if (response.status === 200) {
          console.log(response.data);
          setErrFromBackend(null);
          setLoginEmail("");
          setLoginPassword("");
          authCtx.setCourseType(response.data.courseType);
          authCtx.setUserType(response.data.userType);
          authCtx.setUserEmail(response.data.email);
          authCtx.setPaid(response.data.paid);
          authCtx.authenticationHandler();
          setBtnLoader(false);
          if (
            authCtx.isAuthenticated &&
            response.data.courseType &&
            response.data.paid
          ) {
            navigation.navigate("afterLoggedIn");
          } else if (authCtx.isAuthenticated && response.data.courseType) {
            navigation.navigate("courses");
          } else {
            navigation.navigate("dashboard");
          }
        }
      },
      (err) => {
        setBtnLoader(false);
        console.log(3);
        console.log(
          "errr",
          err.message || err.response?.data.message || "hiiiii"
        );
        if (err.response?.data.message) {
          console.log(1);
          setErrFromBackend(err.response.data.message);
        } else {
          console.log(2);
          setErrFromBackend(err.message);
        }
      }
    );
  }

  function signUpClickHandler() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setEmailErr("Please enter a valid email address.");
      return;
    } else {
      setEmailErr("");
    }

    if (!mblNo || mblNo.length !== 10) {
      setMblNoErr(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number."
      );
      return;
    } else {
      setMblNoErr("");
    }

    if (
      !Password ||
      Password.length < 6 ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(Password)
    ) {
      setPasswordErr(
        "Password - least 6 characters - at least one digit - one special character."
      );
      return;
    } else {
      setPasswordErr("");
    }

    if (Password !== confirmPassword) {
      setConfirmPasswordErr("Password and Confirm Password do not match.");
      return;
    } else {
      setConfirmPasswordErr("");
    }

    setBtnLoader(true);
    CallPostApiServices(
      `/user/signup`,
      {
        email: email,
        mobileNumber: mblNo,
        password: Password,
        courseType: authCtx.userSelectedCourse,
      },
      (response) => {
        if (response.status === 201) {
          setBtnLoader(false);
          setErrFromBackend(null);
          setAlertVisible(true);
        }
      },
      (err) => {
        console.log("err", err, "hiiiiiii");
        setBtnLoader(false);
        if (err.response?.data.message) {
          setErrFromBackend(err.response.data.message);
        } else {
          setErrFromBackend(err.message);
        }
      }
    );

    // axios
    //   .post("http://192.168.1.8:3000/api/user/signup", {
    //     email: email,
    //     mobileNumber: mblNo,
    //     password: Password,
    //     courseType: null,
    //   })
    //   .then((response) => {
    //     console.log("res", response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[CommonStyles.mainContainer, { padding: 0 }]}
    >
      <CustomAlertBox
        visible={alertVisible}
        onClose={hideAlert}
        message="Registered successfully"
        needCancelBtn={false}
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ width: "100%" }}
      >
        {!authCtx.registerSignupToggle && (
          <View style={styles.loginCont}>
            <View style={styles.loginSubCont1}>
              <Image
                source={require("../../images/pictures/planetLogin.png")}
                style={styles.imageLgnTop}
              />
              <View style={styles.loginSubCont2}>
                {errFromBackend && (
                  <Text style={styles.errMsgText}>{errFromBackend}</Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  value={loginEmail}
                  onChangeText={(text) => setLoginEmail(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  value={loginPassword}
                  onChangeText={(text) => setLoginPassword(text)}
                />
                <ButtonComponent
                  style={{ marginTop: 20 }}
                  indicator={btnLoader}
                  text={"Login"}
                  handler={loginClickHandler}
                />
              </View>
            </View>
          </View>
        )}
        {authCtx.registerSignupToggle && (
          <View style={styles.signUpCont}>
            <View style={styles.signUpSubCont1}>
              <Image
                source={require("../../images/pictures/planetSignup.png")}
                style={styles.imageSignUpTop}
              />
              <View style={styles.signUpSubCont2}>
                {(emailErr ||
                  mblNoErr ||
                  passwordErr ||
                  confirmPasswordErr ||
                  errFromBackend) && (
                  <Text style={styles.errMsgText}>
                    {emailErr ||
                      mblNoErr ||
                      passwordErr ||
                      confirmPasswordErr ||
                      errFromBackend}
                  </Text>
                )}
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  value={email}
                  onChangeText={(text) => setEmail(text.toLowerCase())}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mobile Number"
                  placeholderTextColor="#fff"
                  value={mblNo}
                  onChangeText={(text) => setMblNo(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  value={Password}
                  onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  confirmPassword={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
                <ButtonComponent
                  style={{ marginTop: 20 }}
                  indicator={btnLoader}
                  text={"SignUp"}
                  handler={signUpClickHandler}
                />
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default LoginAndSignupScreen;

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

  imageLgnTop: {
    width: 500,
    height: 700,
    position: "absolute",
    top: -210,
    left: -255,
    alignSelf: "flex-start",
    // opacity: 1,
    zIndex: 1,
  },

  imageLgnBottom: {
    width: 200,
    height: 200,
    position: "absolute",
    bottom: -80,
    right: -80,
    alignSelf: "flex-end",
    zIndex: 1,
  },

  loginSubCont2: {
    width: "90%",
    height: 280,
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
    height: 40,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  signUpCont: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  signUpSubCont1: {
    height: 380,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "relative",
    // backgroundColor: "yellow",
  },

  imageSignUpTop: {
    width: 450,
    height: 450,
    position: "absolute",
    top: -120,
    left: -180,
    alignSelf: "flex-start",
    opacity: 0.7,
    zIndex: 1,
  },

  signUpSubCont2: {
    width: "90%",
    height: 370,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 30, 30, 0.7)",
    position: "relative",
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.clr3,
    zIndex: 10,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "7%",
  },

  errMsgText: {
    color: "red",
    marginBottom: "8%",
    textAlign: "center",
    paddingHorizontal: "8%",
  },
});
