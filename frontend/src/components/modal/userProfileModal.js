import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../components/colors/colors";
import CalculateFontSize from "../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../buttonComponent/buttonComponent";
import { AuthContext } from "../stores/context/authContextProvider";
import { CallPostApiServices } from "../../webServices/apiCalls";
import CustomAlertMsgBox from "../customAlertBox/customAlertMsgBox";

function UserProfileModal({ closeModal, isModalVisible }) {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [resetVisible, setResetVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState(null);
  const [isOldPasswordCorrect, setIsOldPasswordCorrect] = useState(false);
  const [oldPasswordMsg, setOldPasswordMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsgVisible, setAlertMsgVisible] = useState(false);
  const [alertMsgErrVisible, setAlertMsgErrVisible] = useState(false);
  const [logoutLoader, setLogoutLoader] = useState(false);
  const [oldPasswordCheckLoader, setOldPasswordCheckLoader] = useState(false);
  const [paid, setPaid] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const [mobileNo, setMobileNo] = useState(null);

  function resetViewHandler() {
    setResetVisible(true);
  }

  function resetCancelHandler() {
    setResetVisible(false);
    setOldPassword(null);
    setIsOldPasswordCorrect(false);
    setOldPasswordMsg(null);
    setNewPassword(null);
    setNewPasswordErrMsg(null);
  }

  useEffect(() => {
    if (!oldPassword) {
      oldPasswordMsg ? setOldPasswordMsg(null) : "";
      return;
    }
    const timeoutId = setTimeout(() => {
      setOldPasswordCheckLoader(true);
      CallPostApiServices(
        `/user/check-user-password`,
        {
          email: authCtx.userEmail,
          enteredPassword: oldPassword,
        },
        (response) => {
          if (response.status === 200) {
            setOldPasswordCheckLoader(false);
            setIsOldPasswordCorrect(true);
            setOldPasswordMsg(response.data?.message);
          }
        },
        (err) => {
          setIsOldPasswordCorrect(false);
          setOldPasswordCheckLoader(false);
          setOldPasswordMsg(err.response?.data?.message);
          console.log(err.response?.data?.message);
        }
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [oldPassword]);

  function oldPasswordHandler(text) {
    setOldPassword(text);
  }

  function newPasswordHandler(text) {
    setNewPassword(text);
  }

  function resetHandler() {
    if (
      isOldPasswordCorrect &&
      !newPasswordErrMsg &&
      newPassword !== null &&
      oldPassword !== null
    ) {
      setIsLoading(true);
      CallPostApiServices(
        `/user/reset-password`,
        {
          email: authCtx.userEmail,
          newPassword: newPassword,
        },
        (response) => {
          if (response.status === 200) {
            setIsLoading(false);
            setAlertMsgVisible(true);
            resetCancelHandler();
            setTimeout(() => {
              logout();
              setAlertMsgVisible(false);
            }, 1000);
          }
        },
        (err) => {
          console.log("err updating new password");
          setIsLoading(false);
          setAlertMsgErrVisible(true);
          setTimeout(() => {
            setAlertMsgErrVisible(false);
            modalCloseHandler();
            setIsLoading(false);
          }, 2000);
        }
      );
    }
  }

  function resetBtnHandler() {
    if (newPassword.length === 0) {
      setNewPasswordErrMsg(null);
    } else if (
      newPassword.length < 6 ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]+$/.test(newPassword)
    ) {
      setNewPasswordErrMsg(
        "Password - at least 6 characters - at least one digit - one special character."
      );
    } else {
      setNewPasswordErrMsg(null);
      resetHandler();
    }
  }

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const uType = await AsyncStorage.getItem("userType");
      const nm = await AsyncStorage.getItem("name");
      const emil = await AsyncStorage.getItem("email");
      const mblNo = await AsyncStorage.getItem("mobileNo");
      const convertedPaid = JSON.parse(pid);

      setPaid(convertedPaid);
      setCourseType(cType);
      setName(nm);
      setEmail(emil);
      setMobileNo(mblNo);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  function modalCloseHandler() {
    setResetVisible(false);
    setOldPassword(null);
    setIsOldPasswordCorrect(false);
    setOldPasswordMsg(null);
    setNewPassword(null);
    setNewPasswordErrMsg(null);
    closeModal();
  }

  function logout() {
    setLogoutLoader(true);

    setTimeout(() => {
      authCtx.logout();
    }, 500);
    setTimeout(() => {
      setLogoutLoader(false);
      closeModal();
    }, 2000);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        modalCloseHandler();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.topBtnCont}>
          <ButtonComponent
            text={"Back"}
            style={{
              alignSelf: "flex-end",
              paddingVertical: 3,
              paddingHorizontal: 15,
            }}
            handler={modalCloseHandler}
          >
            <Text style={styles.topBtnText}>Back</Text>
          </ButtonComponent>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={{ width: "100%" }}
        >
          <View style={styles.profileCont}>
            <View style={styles.userAvatar}>
              <Image
                source={require("../../images/icons/userAvatar.png")}
                style={{ width: 95, height: 95 }}
              />
            </View>
            <View style={styles.labelInput}>
              <Text style={styles.labelText}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#fff"
                // keyboardType="numeric"
                editable={false}
                value={name || "none"}
              />
            </View>
            <View style={styles.labelInput}>
              <Text style={styles.labelText}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#fff"
                // keyboardType="numeric"
                editable={false}
                value={email || "none"}
              />
            </View>
            <View style={styles.labelInput}>
              <Text style={styles.labelText}>Mobile no</Text>
              <TextInput
                style={styles.input}
                placeholder="Mobile no"
                placeholderTextColor="#fff"
                keyboardType="numeric"
                editable={false}
                value={mobileNo || "none"}
              />
            </View>

            <View style={styles.labelInput}>
              <Text style={styles.labelText}>Course type</Text>
              <TextInput
                style={styles.input}
                placeholder="Course Type"
                placeholderTextColor="#fff"
                keyboardType="numeric"
                editable={false}
                value={courseType !== "none" && paid ? courseType : "none"}
              />
            </View>

            <View style={[styles.labelInput, { marginTop: 25 }]}>
              {!resetVisible && (
                <TouchableOpacity onPress={resetViewHandler}>
                  <Text style={styles.resetText}>Reset Password</Text>
                </TouchableOpacity>
              )}
              {resetVisible && (
                <>
                  <View style={[styles.labelInput]}>
                    {oldPasswordMsg && (
                      <View style={styles.loaderAndOldPwLoader}>
                        {oldPasswordCheckLoader && (
                          <ActivityIndicator size="small" color={Colors.clr4} />
                        )}
                        <Text
                          style={[
                            styles.labelText,
                            {
                              color: isOldPasswordCorrect ? "#00ff0a" : "red",
                            },
                          ]}
                        >
                          {oldPasswordMsg}
                        </Text>
                      </View>
                    )}
                    <TextInput
                      style={[styles.input, { color: "#fff" }]}
                      placeholder="Current password"
                      placeholderTextColor="#fff"
                      onChangeText={(text) => oldPasswordHandler(text)}
                      value={oldPassword}
                    />
                  </View>
                  <View style={[styles.labelInput, { marginTop: 5 }]}>
                    {newPasswordErrMsg && (
                      <Text
                        style={[
                          styles.labelText,
                          {
                            color: newPasswordErrMsg ? "red" : "",
                            marginTop: 5,
                          },
                        ]}
                      >
                        {newPasswordErrMsg}
                      </Text>
                    )}
                    <TextInput
                      style={[styles.input, { color: "#fff" }]}
                      placeholder="New password"
                      placeholderTextColor={
                        isOldPasswordCorrect ? "#fff" : Colors.midWhite
                      }
                      editable={isOldPasswordCorrect}
                      onChangeText={(text) => newPasswordHandler(text)}
                      value={newPassword}
                    />
                  </View>
                  <View style={styles.resetBtnCont}>
                    <ButtonComponent
                      text={"Cancel"}
                      style={{
                        alignSelf: "flex-end",
                        paddingVertical: 3,
                        paddingHorizontal: 15,
                      }}
                      fontStyle={{ fontSize: CalculateFontSize(1.6) }}
                      handler={resetCancelHandler}
                    />
                    <ButtonComponent
                      text={"Reset"}
                      style={{
                        alignSelf: "flex-end",
                        paddingVertical: 3,
                        paddingHorizontal: 15,
                        marginLeft: 15,
                      }}
                      fontStyle={{ fontSize: CalculateFontSize(1.6) }}
                      disabled={
                        !isOldPasswordCorrect ||
                        newPassword === null ||
                        oldPassword === null ||
                        isLoading
                      }
                      indicator={isLoading}
                      handler={resetBtnHandler}
                    />
                  </View>
                </>
              )}
              <ButtonComponent
                text={"Logout"}
                style={{
                  alignSelf: "flex-start",
                  paddingVertical: 5,
                  paddingHorizontal: 15,
                  marginTop: 20,
                  backgroundColor: "red",
                }}
                fontStyle={{ fontSize: CalculateFontSize(1.6) }}
                handler={logout}
                indicator={logoutLoader}
                disabled={logoutLoader}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      <CustomAlertMsgBox
        visible={alertMsgVisible}
        message={"Password updated successfully, Logging off..."}
      />
      <CustomAlertMsgBox
        visible={alertMsgErrVisible}
        message={"Server down, Try after sometime..."}
      />
    </Modal>
  );
}

export default UserProfileModal;

const styles = StyleSheet.create({
  topBtnCont: {
    height: "auto",
    width: "100%",
    // backgroundColor: Colors.clr2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },

  topBtn: {
    height: 10,
    width: 16,
    backgroundColor: Colors.btnClr,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  topBtnText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
  },
  profileCont: {
    height: "auto",
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.clr3,
    backgroundColor: Colors.transparentBg,
  },
  userAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderColor: Colors.clr3,
    borderWidth: 1,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparentBg,
  },
  labelInput: {
    width: "100%",
    flexDirection: "column",
    marginTop: 20,
  },
  labelText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "400",
    lineHeight: 19,
    color: "#fff",
  },
  resetText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "400",
    lineHeight: 19,
    color: Colors.btnClr,
    textDecorationLine: "underline",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: Colors.midWhite,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  resetBtnCont: {
    width: "100%",
    flexDirection: "row",
    marginTop: 15,
  },
  loaderAndOldPwLoader: {
    width: "100%",
    flexDirection: "row",
  },
});
