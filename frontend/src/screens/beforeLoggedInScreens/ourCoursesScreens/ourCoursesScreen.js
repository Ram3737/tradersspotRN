import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { useState, useLayoutEffect, useContext, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "react-native-simple-bottom-sheet";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CustomAlertBox from "../../../components/customAlertBox/customAlertBox";
import { CallPatchApiServices } from "../../../webServices/apiCalls";
import { AuthContext } from "../../../components/stores/context/authContextProvider";

function OurCoursesScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [tab, setTab] = useState("basic");
  const [paidStatus, setPaidStatus] = useState(false);
  const [courseTypeFromRes, setCourseTypeFromRes] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    if (authCtx.buyingWithoutLogin) {
      authCtx.setBuyingWithoutLogin(false);
    }
  };

  useLayoutEffect(() => {
    if (authCtx.buyingWithoutLogin) {
      toggleModal();
    }
  }, [authCtx.buyingWithoutLogin]);

  const hideAlert = () => {
    setAlertVisible(false);
    toggleModal();
    authCtx.setBuyingWithoutLogin(false);
    authCtx.setCourseType(courseTypeFromRes);
    authCtx.setPaid(paidStatus);
  };

  const makePaymentHandler = () => {
    setIsLoading(true);
    CallPatchApiServices(
      `/user/buyCourse`,
      {
        email: authCtx.userEmail,
        courseType: authCtx.userSelectedCourse,
      },
      (response) => {
        if (response.status === 201) {
          setCourseTypeFromRes(response.data.courseType);
          setPaidStatus(response.data.paid);
          setTimeout(() => {
            setIsLoading(false);
            setAlertVisible(true);
          }, 3000);
        }
      },
      (error) => {
        console.log("payerr", error.message);
      }
    );
  };

  function buyNowHandler(course) {
    if (authCtx.isAuthenticated) {
      toggleModal();
      authCtx.setUserSelectedCourse(course);
    } else {
      authCtx.setRegisterSignupToggle(true);
      navigation.navigate("loginSignup");
      authCtx.setBuyingWithoutLogin1(true);
      authCtx.setUserSelectedCourse(course);
    }
  }

  const handlePay = async () => {
    try {
      const upiAppURI = "upi://pay";
      const receiverUPIID = "7010034542@ybl";
      const amount = "10.00";

      const paymentLink = `${upiAppURI}?pa=${receiverUPIID}&mc=yourMerchantCode&tid=yourTransactionId&tr=yourTransactionRefId&tn=yourTransactionNote&am=${amount}&cu=INR&url=yourCallBackURL`;

      await Linking.openURL(paymentLink);
    } catch (error) {
      console.error("Error opening UPI app:", error);
    }
  };

  return (
    <View
      style={[CommonStyles.mainContainer, { justifyContent: "flex-start" }]}
    >
      <CustomAlertBox
        visible={alertVisible}
        onClose={hideAlert}
        message="Purchased successfully"
        needCancelBtn={false}
      />
      <View style={styles.tabCont}>
        <TouchableOpacity
          style={[
            { backgroundColor: tab === "basic" ? Colors.clr3 : Colors.clr2 },
            styles.tab,
          ]}
          onPress={() => setTab("basic")}
        >
          <Text style={styles.tabText}>Basic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { backgroundColor: tab === "standard" ? Colors.clr3 : Colors.clr2 },
            styles.tab,
          ]}
          onPress={() => setTab("standard")}
        >
          <Text style={styles.tabText}>Standard</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { backgroundColor: tab === "premium" ? Colors.clr3 : Colors.clr2 },
            styles.tab,
          ]}
          onPress={() => setTab("premium")}
        >
          <Text style={styles.tabText}>Premium</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsCont}>
        <Image
          source={require("../../../images/pictures/cardBg.png")}
          style={styles.courseIcon}
        />
        <View style={styles.cards}>
          <View style={styles.priceCont}>
            <Text style={styles.priceText}>₹ 2,499</Text>
          </View>

          <View style={styles.featuresCont}>
            <Text style={styles.featureText}>- Access to 14hrs of course</Text>
            <Text style={styles.featureText}>- Any time oubt clearence</Text>
            <Text style={styles.featureText}>- Validity 1 Month</Text>
            <Text style={styles.featureText}>- Validity 1 Month</Text>
            <Text style={styles.featureText}>- Validity 1 Month</Text>
          </View>

          <View style={styles.btnCont}>
            <ButtonComponent
              text={"Buy Now"}
              // handler={() => {
              //   buyNowHandler("basic");
              // }}

              handler={handlePay}
            />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalContainer}>
            <ButtonComponent
              text={"Make Payment"}
              handler={makePaymentHandler}
            />
            {isLoading && (
              <ActivityIndicator size="large" color={Colors.clr4} />
            )}
          </View>
        </Modal>
      </View>

      <Text style={styles.SwipeText}>Swipe up for course contents</Text>
      <BottomSheet
        isOpen={false}
        sliderMinHeight={40}
        sliderMaxHeight={680}
        wrapperStyle={{
          backgroundColor: Colors.clr2,
          paddingHorizontal: 0,
          paddingTop: 0,
          paddingBottom: 15,
        }}
      >
        {(onScrollEndDrag) => (
          <ScrollView style={styles.courseContentCont}>
            {/* <Text style={styles.headingText}>Course Content</Text> */}
            <View style={styles.contents}>
              <View style={styles.contentsSub}>
                <View style={styles.contentsSideHeadingCont}>
                  <Text style={styles.contentsSideHeading}>BASICS</Text>
                </View>
                <Text style={styles.contentsName}>
                  - What is Stock Trading ?
                </Text>
                <Text style={styles.contentsName}>- Charts & Candlesticks</Text>
                <Text style={styles.contentsName}>
                  - Fundamental vs Technical analysis
                </Text>
              </View>

              <View style={styles.contentsSub}>
                <View style={styles.contentsSideHeadingCont}>
                  <Text style={styles.contentsSideHeading}>CORE</Text>
                </View>
                <Text style={styles.contentsName}>
                  - Support & Resistance (Supply & Demand)
                </Text>
                <Text style={styles.contentsName}>
                  - Zones and how to identify zone ?
                </Text>
                <Text style={styles.contentsName}>
                  - Trendlines and how to draw a perfect trendline ?
                </Text>
              </View>

              <View style={styles.contentsSub}>
                <View style={styles.contentsSideHeadingCont}>
                  <Text style={styles.contentsSideHeading}>INDICTORS</Text>
                </View>
                <Text style={styles.contentsName}>
                  - Lagging vs Leading indicator
                </Text>
                <Text style={styles.contentsName}>
                  - Volume Profile and how to use it ?
                </Text>
                <Text style={styles.contentsName}>
                  - Golden Fibonacci rule (0.618)
                </Text>
                <Text style={styles.contentsName}>
                  - Relative Strength Index (RSI) & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Moving Averages (9ma, 20ma, 50ma) & cheatsheet
                </Text>
              </View>

              <View style={styles.contentsSub}>
                <View style={styles.contentsSideHeadingCont}>
                  <Text style={styles.contentsSideHeading}>PATTERNS</Text>
                </View>
                <Text style={styles.contentsName}>- What are Patterns ?</Text>
                <Text style={styles.contentsName}>
                  - Triangle pattern & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Channel pattern & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Flag pattern & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Wedge pattern & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Double Top pattern & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Double Bottom pattern & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Head and Shoulder & cheatsheet
                </Text>
                <Text style={styles.contentsName}>
                  - Inverse Head and Shoulder & cheatsheet
                </Text>
              </View>

              <View style={styles.contentsSub}>
                <View style={styles.contentsSideHeadingCont}>
                  <Text style={styles.contentsSideHeading}>STARTEGIES</Text>
                </View>
                <Text style={styles.contentsName}>
                  - #1 strategy for Intraday
                </Text>
                <Text style={styles.contentsName}>- #1 strategy for Swing</Text>
              </View>

              <View style={styles.contentsSub}>
                <View style={styles.contentsSideHeadingCont}>
                  <Text style={styles.contentsSideHeading}>
                    RISK MANAGEMENT
                  </Text>
                </View>
                <Text style={styles.contentsName}>- Position sizing</Text>
                <Text style={styles.contentsName}>- Risk / Reward</Text>
              </View>
            </View>
          </ScrollView>
        )}
      </BottomSheet>
    </View>
  );
}

export default OurCoursesScreen;

const styles = StyleSheet.create({
  tabCont: {
    height: "6%",
    width: "90%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.clr2,
    borderRadius: 30,
    marginTop: "12%",
    paddingHorizontal: 8,
  },
  tab: {
    width: "30%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },

  tabText: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "500",
    color: "#fff",
  },

  cardsCont: {
    height: "53%",
    width: "100%",
    marginTop: "15%",
    alignItems: "center",
    position: "relative",
    // backgroundColor: "red",
  },
  cards: {
    height: "100%",
    width: "73%",
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    borderRadius: 10,
    overflow: "hidden",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.transparentBg,
  },
  imgCont: {
    width: "100%",
    height: "auto",
    // backgroundColor: "blue",
    alignItems: "center",
  },
  courseIcon: {
    width: 180,
    height: 180,
    top: "60%",
    right: "-20%",
    opacity: 0.4,
    position: "absolute",
  },

  priceCont: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    marginTop: "2%",
    // backgroundColor: "red",
  },
  priceText: {
    fontSize: CalculateFontSize(6),
    fontWeight: "800",
    color: Colors.clr4,
  },

  featuresCont: {
    width: "100%",
    height: "auto",
    marginTop: "15.5%",
    // backgroundColor: "red",
  },

  featureText: {
    fontSize: CalculateFontSize(1.6),
    color: "#fff",
    marginBottom: "8%",
  },
  btnCont: {
    width: "100%",
    justifyContent: "flex-end",
    // alignItems: "center",
    marginTop: "11%",
  },

  SwipeText: {
    fontSize: CalculateFontSize(2),
    fontWeight: "400",
    marginTop: "35%",
    color: Colors.btnClr,
  },

  courseContentCont: {
    width: "100%",
    height: 910,
    marginTop: "-4%",
    paddingHorizontal: "3%",
    paddingTop: "0.5%",
    // backgroundColor: "red",
  },

  headingText: {
    fontSize: CalculateFontSize(3),
    fontWeight: "600",
    alignSelf: "center",
    color: Colors.clr4,
  },

  contents: {
    width: "100%",
    height: 1010,
    marginTop: "6%",
    // backgroundColor: "red",
  },
  contentsSub: {
    width: "100%",
    height: "auto",
    marginBottom: "7%",
    // backgroundColor: "blue",
  },

  contentsSideHeadingCont: {
    height: 30,
    width: "auto",
    paddingHorizontal: 10,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: "5%",
    backgroundColor: Colors.clr4,
  },

  contentsSideHeading: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "700",
  },

  contentsName: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "400",
    color: "#fff",
    marginBottom: "2.5%",
    marginLeft: "2%",
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.mainBgClr,
  },
});
