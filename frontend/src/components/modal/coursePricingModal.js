import {
  View,
  Text,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";

import Colors from "../../components/colors/colors";
import ButtonComponent from "../buttonComponent/buttonComponent";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";
import CreditCardLogo from "../../images/logo/creditCard.png";

import { useState } from "react";
import CustomAlertBox from "../customAlertBox/customAlertBox";
import ScreenshotModal from "./screenshotModal";

function CoursePricingModal({
  closeModal,
  isModalVisible,
  courseAmount,
  closeCourseDetailModal,
  closeCoursePricingModal,
  tab,
}) {
  const [alertMsgBox, setAlertMsgBox] = useState(false);
  const [screenshotModalOpen, setScreenshotModalOpen] = useState(false);
  const [payNowLoader, setPayNowLoader] = useState(false);

  function alertMsgOpenHandler() {
    setPayNowLoader(true);
    setTimeout(() => {
      setPayNowLoader(false);
      setAlertMsgBox(true);
    }, 1000);
  }

  function screenshotModalOpenHandler() {
    setScreenshotModalOpen(true);
  }

  function screenshotModalCloseHandler() {
    setScreenshotModalOpen(false);
  }

  const handlePay = async () => {
    try {
      const upiAppURI = "upi://pay";
      const receiverUPIID = "7010034542@ybl";
      const amount = courseAmount;

      const paymentLink = `${upiAppURI}?pa=${receiverUPIID}&mc=yourMerchantCode&tid=yourTransactionId&tr=yourTransactionRefId&tn=yourTransactionNote&am=${amount}&cu=INR&url=yourCallBackURL`;

      await Linking.openURL(paymentLink);

      setTimeout(() => {
        screenshotModalOpenHandler();
      }, 1000);
    } catch (error) {
      Alert.alert("Error opening UPI app:", error);
    }
  };

  function alertMsgCloseHandler() {
    setAlertMsgBox(false);
    handlePay();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeModal();
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
            handler={closeModal}
          />
        </View>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollCont}
        >
          <View style={styles.scrollContSub}>
            <Image
              source={CreditCardLogo}
              style={{
                width: "100%",
                height: 205,
              }}
            />
            <View style={styles.orderSummaryCont}>
              <Text style={styles.sideHeadingText}>Order summary</Text>
              <View
                style={[styles.ordersCont, { borderTopColor: Colors.clr4 }]}
              >
                <Text style={styles.ordersContLeftText}>Product</Text>
                <Text numberOfLines={4} style={styles.ordersContRight}>
                  {tab === 0
                    ? "PRICE ACTION - THE COMPLETE COURSE"
                    : tab === 1
                    ? "DOMINATE MARKETS: MASTER PRICE ACTION WITH STOCK ANALYSIS"
                    : tab === 2
                    ? "SYNERGIZING PRICE ACTION WITH FUNDAMENTALS FOR MARKET MASTERY"
                    : ""}
                </Text>
              </View>
              <View style={[styles.ordersCont, { borderTopColor: "none" }]}>
                <Text style={styles.ordersContLeftText}>Price</Text>
                <Text numberOfLines={2} style={styles.ordersContRight}>
                  {tab === 0
                    ? "₹ 2,499"
                    : tab === 1
                    ? "₹ 4,499"
                    : tab === 2
                    ? "₹ 9,499"
                    : ""}
                </Text>
              </View>
              <View style={[styles.ordersCont, { borderTopColor: "none" }]}>
                <Text
                  style={[
                    styles.ordersContLeftText,
                    {
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: CalculateFontSize(1.8),
                    },
                  ]}
                >
                  Total
                </Text>
                <Text
                  style={[
                    styles.ordersContRight,
                    {
                      color: "#fff",
                      fontWeight: "500",
                      fontSize: CalculateFontSize(1.8),
                    },
                  ]}
                >
                  {tab === 0
                    ? "₹ 2,499"
                    : tab === 1
                    ? "₹ 4,499"
                    : tab === 2
                    ? "₹ 9,499"
                    : ""}
                </Text>
              </View>
            </View>

            <ButtonComponent
              text={"Pay now"}
              style={{ marginTop: 60 }}
              handler={alertMsgOpenHandler}
              indicator={payNowLoader}
              disabled={payNowLoader}
            />
          </View>
        </ScrollView>

        <CustomAlertBox
          visible={alertMsgBox}
          onClose={alertMsgCloseHandler}
          message={
            "please send us the screenshot to our whatsapp(8248189924) after the payment is made..."
          }
          btnText={"continue"}
        />

        <ScreenshotModal
          closeModal={screenshotModalCloseHandler}
          isModalVisible={screenshotModalOpen}
          closeCourseDetailModal={closeCourseDetailModal}
          closeCoursePricingModal={closeCoursePricingModal}
        />
      </View>
    </Modal>
  );
}

export default CoursePricingModal;

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
    marginTop: 50,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.transparentBg,
  },
  sideHeadingText: {
    fontSize: CalculateFontSize(2.4),
    fontWeight: "500",
    color: Colors.clr4,
    marginBottom: 15,
  },
  ordersCont: {
    width: "100%",
    height: "auto",
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.2,
    borderLeftColor: Colors.transparentBg,
    borderRightColor: Colors.transparentBg,
    borderBottomColor: "#666",
    // backgroundColor: "red",
  },
  ordersContLeftText: {
    width: "50%",
    fontSize: CalculateFontSize(1.8),
    fontWeight: "300",
    color: Colors.midWhite,
  },
  ordersContRight: {
    width: "50%",
    fontSize: CalculateFontSize(1.6),
    fontWeight: "300",
    color: Colors.midWhite,
  },
});
