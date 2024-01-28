import {
  View,
  Text,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
  Linking,
  StyleSheet,
} from "react-native";

import Colors from "../../components/colors/colors";
import ButtonComponent from "../buttonComponent/buttonComponent";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";
import ScreenshotLogo from "../../images/logo/screenshot.png";

import { useState, useContext } from "react";

import { AuthContext } from "../stores/context/authContextProvider";
import CustomAlertMsgBox from "../customAlertBox/customAlertMsgBox";

function ScreenshotModal({
  closeModal,
  isModalVisible,
  closeCourseDetailModal,
  closeCoursePricingModal,
}) {
  const authCtx = useContext(AuthContext);
  const [screenshotLoader, setScreenshotLoader] = useState(false);
  const [alertMsgBox, setAlertMsgBox] = useState(false);
  const [mobileNo, setMobileNo] = useState("8248189924");

  function closeAllPayModal() {
    setAlertMsgBox(true);
    setTimeout(() => {
      setAlertMsgBox(false);
      closeModal();
      closeCourseDetailModal();
      closeCoursePricingModal();
      authCtx.logout();
    }, 2000);
  }

  const sendOnWhatsApp = () => {
    setScreenshotLoader(true);
    let url =
      "whatsapp://send?phone=91" +
      mobileNo +
      "&text=" +
      "Hey, here is my payment screenshot(attach your screenshot here)";
    Linking.openURL(url)
      .then(() => {
        setTimeout(() => {
          setScreenshotLoader(false);
          closeAllPayModal();
        }, 2000);
      })
      .catch(() => {
        setScreenshotLoader(false);
        Alert.alert("Error", "Make sure WhatsApp is installed on your device");
      });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeAllPayModal();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.topBtnCont}>
          <ButtonComponent
            text={"Cancel"}
            style={{
              alignSelf: "flex-end",
              paddingVertical: 3,
              paddingHorizontal: 15,
            }}
            handler={closeAllPayModal}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollCont}
        >
          <View style={styles.scrollContSub}>
            <Image
              source={ScreenshotLogo}
              style={{
                width: "100%",
                height: 280,
              }}
            />
            <View style={styles.orderSummaryCont}>
              <Text style={styles.ordersContRight}>
                For security purposes, you will be logged off after sending a
                screenshot or upon returning from this page. Please log in
                again.
              </Text>
              <ButtonComponent
                text={"Send screenshot"}
                handler={sendOnWhatsApp}
                indicator={screenshotLoader}
                disabled={screenshotLoader}
              />
            </View>
          </View>
        </ScrollView>
        <CustomAlertMsgBox
          visible={alertMsgBox}
          message={"Logging out for security purposes, please login again..."}
        />
      </View>
    </Modal>
  );
}

export default ScreenshotModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.mainBgClr,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topBtnCont: {
    height: "auto",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  scrollCont: {
    width: "100%",
    paddingHorizontal: 14,
    marginTop: 30,
  },
  scrollContSub: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 25,
  },
  orderSummaryCont: {
    width: "100%",
    height: "auto",
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.transparentBg,
  },
  ordersContRight: {
    width: "100%",
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 30,
    color: Colors.midWhite,
  },
});
