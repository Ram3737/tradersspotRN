import {
  View,
  Text,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";

import { useState } from "react";

import Colors from "../colors/colors";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";
import ButtonComponent from "../buttonComponent/buttonComponent";

import CustomAlertMsgBox from "../customAlertBox/customAlertMsgBox";

function NewUserRegistrationOTPModal({
  closeModal,
  isModalVisible,
  otp,
  registerHandler,
}) {
  const [enteredOTP, setEnteredOTP] = useState(null);
  const [otpErr, setOTPErr] = useState(null);
  const [otpVerifiedMsg, setOtpVerifiedMsg] = useState(false);
  const [otpVerifyBtnLoader, setOtpVerifyBtnLoader] = useState(false);

  function modalCloseHandler() {
    setEnteredOTP(null);
    setOTPErr(null);
    closeModal();
  }

  function otpValidateHandler() {
    setOtpVerifyBtnLoader(true);
    if (enteredOTP !== otp) {
      setOTPErr("Please enter valid OTP");
    } else {
      setOTPErr(null);
      setTimeout(() => {
        setOtpVerifyBtnLoader(false);
        setOtpVerifiedMsg(true);
      }, 1000);
      setTimeout(() => {
        setOtpVerifiedMsg(false);
        modalCloseHandler();
        registerHandler();
      }, 2000);
    }
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
          <View style={styles.subCont}>
            {otpErr && <Text style={styles.errMsgText}>{otpErr}</Text>}
            <View style={styles.labelInput}>
              {/* <Text style={styles.labelText}>Email</Text> */}
              <TextInput
                style={styles.input}
                placeholder="Enter otp sent to your email"
                placeholderTextColor="#777"
                value={enteredOTP}
                onChangeText={(text) => setEnteredOTP(text.toLowerCase())}
              />
            </View>

            <ButtonComponent
              text={"Verify OTP"}
              style={{
                marginTop: 25,
              }}
              fontStyle={{ fontSize: CalculateFontSize(1.7) }}
              indicator={otpVerifyBtnLoader}
              handler={otpValidateHandler}
            />
          </View>
        </ScrollView>
      </View>

      <CustomAlertMsgBox visible={otpVerifiedMsg} message={"OTP verified ✅"} />
    </Modal>
  );
}

export default NewUserRegistrationOTPModal;

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
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  subCont: {
    height: "auto",
    width: "90%",
    alignSelf: "center",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginTop: "50%",
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
