import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../components/colors/colors";
import CalculateFontSize from "../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../buttonComponent/buttonComponent";
import { AuthContext } from "../stores/context/authContextProvider";
import { CallPostApiServices } from "../../webServices/apiCalls";
import CustomAlertMsgBox from "../customAlertBox/customAlertMsgBox";

function ForgotPasswordModal({ closeModal, isModalVisible }) {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState(null);
  const [enteredNewPassword, setEnteredNewPassword] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [otpErr, setOtpErr] = useState(null);
  const [newPasswordErr, setNewPasswordErr] = useState(null);
  const [otpSendLoader, setOtpSendLoader] = useState(false);
  const [otpValidateLoader, setOtpValidateLoader] = useState(false);
  const [newPasswordLoader, setNewPasswordLoader] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpSentMsg, setOtpSentMsg] = useState(false);
  const [otpVerifiedMsg, setOtpVerifiedMsg] = useState(false);
  const [PasswordResettedMsg, setPasswordResettedMsg] = useState(false);

  function otpHandler() {
    setOtpSendLoader(true);
    CallPostApiServices(
      `/user/forgot-password`,
      {
        email: enteredEmail,
      },
      (response) => {
        if (response.status === 200) {
          setOtpSendLoader(false);
          setOtpSentMsg(true);
          if (emailErr) {
            setEmailErr(null);
          }
          setTimeout(() => {
            setOtpSentMsg(false);
            setIsOtpSent(true);
          }, 2000);
          console.log("res", response.data?.message);
        }
      },
      (err) => {
        setOtpSendLoader(false);
        setEmailErr(err.response?.data?.message);
        console.log("otp err", err.response?.data?.message);
      }
    );
  }

  function emailValidatdHandler() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!enteredEmail || !emailRegex.test(enteredEmail)) {
      setEmailErr("Please enter a valid email address.");
      return;
    } else {
      setEmailErr(null);
      otpHandler();
    }
  }

  function otpValidatdHandler() {
    setOtpValidateLoader(true);
    CallPostApiServices(
      `/user/verify-otp`,
      {
        email: enteredEmail,
        enteredOTP: enteredOtp,
      },
      (response) => {
        if (response.status === 200) {
          setOtpValidateLoader(false);
          setOtpVerifiedMsg(true);
          if (otpErr) {
            setOtpErr(null);
          }
          setTimeout(() => {
            setOtpVerifiedMsg(false);
            setIsOtpValid(true);
            setIsOtpSent(false);
          }, 2000);
          console.log("res", response.data?.message);
        }
      },
      (err) => {
        setOtpValidateLoader(false);
        setOtpErr(err.response?.data?.message);
        if (err?.response?.status === 400) {
          setTimeout(() => {
            modalCloseHandler();
          }, 2000);
        }
        console.log("otp err", err.response?.data?.message);
      }
    );
  }

  function resetNewPasswordHandler() {
    if (enteredNewPassword.length === 0) {
      setNewPasswordErr(null);
    } else if (
      enteredNewPassword.length < 6 ||
      !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(
        enteredNewPassword
      )
    ) {
      setNewPasswordErr(
        "Password - at least 6 characters - at least one digit - one special character."
      );
    } else {
      setNewPasswordErr(null);
      setNewPasswordLoader(true);
      CallPostApiServices(
        `/user/reset-password`,
        {
          email: enteredEmail,
          newPassword: enteredNewPassword,
        },
        (response) => {
          if (response.status === 200) {
            setNewPasswordLoader(false);
            setPasswordResettedMsg(true);
            setTimeout(() => {
              setPasswordResettedMsg(false);
              modalCloseHandler();
            }, 2000);
          }
        },
        (err) => {
          console.log("err updating new password");
          setNewPasswordLoader(false);
          setNewPasswordErr(err.response?.data?.message);
          setTimeout(() => {
            modalCloseHandler();
          }, 1000);
        }
      );
    }
  }

  function modalCloseHandler() {
    setEnteredEmail(null);
    setEnteredOtp(null);
    setEnteredNewPassword(null);
    setEmailErr(null);
    setOtpErr(null);
    setNewPasswordErr(null);
    setOtpValidateLoader(false);
    setOtpSendLoader(false);
    setNewPasswordLoader(false);
    setIsOtpSent(false);
    setIsOtpValid(false);
    setOtpSentMsg(false);
    setOtpVerifiedMsg(false);
    setPasswordResettedMsg(false);
    closeModal();
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        modalCloseHandler;
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
          {!isOtpSent && !isOtpValid && (
            <View style={styles.subCont}>
              {emailErr && <Text style={styles.errMsgText}>{emailErr}</Text>}
              <View style={styles.labelInput}>
                {/* <Text style={styles.labelText}>Email</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor="#fff"
                  value={enteredEmail}
                  onChangeText={(text) => setEnteredEmail(text.toLowerCase())}
                />
              </View>

              <ButtonComponent
                text={"Sent OTP"}
                style={{
                  // alignSelf: "flex-end",
                  // paddingVertical: 3,
                  // paddingHorizontal: 15,
                  marginTop: 25,
                }}
                fontStyle={{ fontSize: CalculateFontSize(1.7) }}
                disabled={otpSendLoader || otpSentMsg}
                indicator={otpSendLoader || otpSentMsg}
                handler={emailValidatdHandler}
              />
            </View>
          )}
          {isOtpSent && !isOtpValid && (
            <View style={styles.subCont}>
              {otpErr && <Text style={styles.errMsgText}>{otpErr}</Text>}
              <View style={styles.labelInput}>
                {/* <Text style={styles.labelText}>Email</Text> */}
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  placeholder="Enter the OTP"
                  placeholderTextColor="#fff"
                  value={enteredOtp}
                  onChangeText={(text) => setEnteredOtp(text)}
                />
              </View>

              <ButtonComponent
                text={"Validate OTP"}
                style={{
                  marginTop: 25,
                }}
                fontStyle={{ fontSize: CalculateFontSize(1.7) }}
                disabled={otpValidateLoader || !enteredOtp || otpVerifiedMsg}
                indicator={otpValidateLoader || otpVerifiedMsg}
                handler={otpValidatdHandler}
              />
            </View>
          )}
          {isOtpValid && (
            <View style={styles.subCont}>
              {newPasswordErr && (
                <Text style={styles.errMsgText}>{newPasswordErr}</Text>
              )}
              <View style={styles.labelInput}>
                {/* <Text style={styles.labelText}>Email</Text> */}
                <TextInput
                  style={styles.input}
                  placeholder="Enter new password"
                  placeholderTextColor="#fff"
                  value={enteredNewPassword}
                  onChangeText={(text) => setEnteredNewPassword(text)}
                />
              </View>

              <ButtonComponent
                text={"Reset password"}
                style={{
                  marginTop: 25,
                }}
                fontStyle={{ fontSize: CalculateFontSize(1.7) }}
                disabled={
                  newPasswordLoader ||
                  !enteredNewPassword ||
                  PasswordResettedMsg
                }
                indicator={newPasswordLoader || PasswordResettedMsg}
                handler={resetNewPasswordHandler}
              />
            </View>
          )}
        </ScrollView>
      </View>
      <CustomAlertMsgBox
        visible={otpSentMsg}
        message={"OTP sent to your mail"}
      />
      <CustomAlertMsgBox visible={otpVerifiedMsg} message={"OTP verified"} />
      <CustomAlertMsgBox
        visible={PasswordResettedMsg}
        message={"Password updated Successfully"}
      />
    </Modal>
  );
}

export default ForgotPasswordModal;

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
  subCont: {
    height: "auto",
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.clr3,
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

  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: Colors.midWhite,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  errMsgText: {
    color: "red",
    marginBottom: 2,
    textAlign: "center",
    paddingHorizontal: "8%",
  },
});
