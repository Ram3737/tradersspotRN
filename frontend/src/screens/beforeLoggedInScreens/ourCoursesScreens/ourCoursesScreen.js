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
  Dimensions,
} from "react-native";
import {
  useState,
  useLayoutEffect,
  useContext,
  useEffect,
  useRef,
} from "react";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "react-native-simple-bottom-sheet";
import Carousel, { Pagination } from "react-native-snap-carousel";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CustomAlertBox from "../../../components/customAlertBox/customAlertBox";
import { CallPatchApiServices } from "../../../webServices/apiCalls";
import { AuthContext } from "../../../components/stores/context/authContextProvider";

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

function OurCoursesScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [tab, setTab] = useState(0);
  const [paidStatus, setPaidStatus] = useState(false);
  const [courseTypeFromRes, setCourseTypeFromRes] = useState(null);
  const [courseAmount, setCourseAmount] = useState("6499.00");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);

  const data = [
    {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://picsum.photos/id/11/200/300",
    },
    {
      title: "In turpis",
      body: "Aenean ut eros et nisl sagittis vestibulum. Donec posuere vulputate arcu. Proin faucibus arcu quis ante. Curabitur at lacus ac velit ornare lobortis. ",
      imgUrl: "https://picsum.photos/id/10/200/300",
    },
    {
      title: "Lorem Ipsum",
      body: "Phasellus ullamcorper ipsum rutrum nunc. Nullam quis ante. Etiam ultricies nisi vel augue. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc.",
      imgUrl: "https://picsum.photos/id/12/200/300",
    },
  ];

  useEffect(() => {
    if (tab === 0) {
      setCourseAmount("2499.00");
    } else if (tab === 1) {
      setCourseAmount("6499.00");
    } else if (tab === 2) {
      setCourseAmount("9499.00");
    }
  }, [tab]);

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

  const makePaymentHandler = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handlePay();
    }, 2000);
    // CallPatchApiServices(
    //   `/user/buyCourse`,
    //   {
    //     email: authCtx.userEmail,
    //     courseType: authCtx.userSelectedCourse,
    //   },
    //   (response) => {
    //     if (response.status === 201) {
    //       setCourseTypeFromRes(response.data.courseType);
    //       setPaidStatus(response.data.paid);
    //       setTimeout(() => {
    //         setIsLoading(false);
    //         setAlertVisible(true);
    //       }, 3000);
    //     }
    //   },
    //   (error) => {
    //     console.log("payerr", error.message);
    //   }
    // );
  };

  function buyNowHandler(course) {
    authCtx.setUserSelectedCourse(course);
    if (authCtx.isAuthenticated && !authCtx.paid) {
      console.log(1);

      CallPatchApiServices(
        `/user/buyCourse`,
        {
          email: authCtx.userEmail,
          courseType: course,
          triedToUpdate: false,
        },
        (response) => {
          if (response.status === 201) {
            toggleModal();
            console.log("course updated");
          }
        },
        (error) => {
          console.log("payerr", error.message);
        }
      );
    } else if (authCtx.isAuthenticated && authCtx.paid) {
      console.log(2);

      CallPatchApiServices(
        `/user/buyCourse`,
        {
          email: authCtx.userEmail,
          courseType: authCtx.courseType,
          triedToUpdate: true,
        },
        (response) => {
          if (response.status === 201) {
            toggleModal();
            console.log("course updated");
          }
        },
        (error) => {
          console.log("payerr", error.message);
        }
      );
    } else {
      authCtx.setRegisterSignupToggle(true);
      navigation.navigate("loginSignup");
    }
  }

  const handlePay = async () => {
    try {
      const upiAppURI = "upi://pay";
      const receiverUPIID = "7010034542@ybl";
      const amount = courseAmount;

      const paymentLink = `${upiAppURI}?pa=${receiverUPIID}&mc=yourMerchantCode&tid=yourTransactionId&tr=yourTransactionRefId&tn=yourTransactionNote&am=${amount}&cu=INR&url=yourCallBackURL`;

      await Linking.openURL(paymentLink);
    } catch (error) {
      console.error("Error opening UPI app:", error);
    }
  };

  const CarouselCardItem = ({ item, index }) => {
    const imageSource1 = `../../../images/pictures/buyNow1.jpg`;
    const imageSource2 = `../../../images/pictures/buyNow2.jpg`;
    const imageSource3 = `../../../images/pictures/buyNow0.jpg`;
    return (
      <View style={styles.container} key={index}>
        {index === 0 ? (
          <ImageBackground
            source={require(imageSource1)}
            style={styles.priceCont}
            imageStyle={{ opacity: 0.2, height: "100%" }}
          >
            <Text style={styles.planText}>
              {tab === 0
                ? "BASIC"
                : tab === 1
                ? "STANDARD"
                : tab === 2
                ? "PRO"
                : ""}
            </Text>
            <Text style={styles.priceText}>
              {tab === 0
                ? "₹ 2,499"
                : tab === 1
                ? "₹ 6,499"
                : tab === 2
                ? "₹ 9,499"
                : ""}
            </Text>
          </ImageBackground>
        ) : index === 1 ? (
          <ImageBackground
            source={require(imageSource2)}
            style={styles.priceCont}
            imageStyle={{ opacity: 0.15, height: "100%" }}
          >
            <Text style={styles.planText}>
              {tab === 0
                ? "BASIC"
                : tab === 1
                ? "STANDARD"
                : tab === 2
                ? "PRO"
                : ""}
            </Text>
            <Text style={styles.priceText}>
              {tab === 0
                ? "₹ 2,499"
                : tab === 1
                ? "₹ 6,499"
                : tab === 2
                ? "₹ 9,499"
                : ""}
            </Text>
          </ImageBackground>
        ) : index === 2 ? (
          <ImageBackground
            source={require(imageSource3)}
            style={styles.priceCont}
            imageStyle={{ opacity: 0.12, height: "100%" }}
          >
            <Text style={styles.planText}>
              {tab === 0
                ? "BASIC"
                : tab === 1
                ? "STANDARD"
                : tab === 2
                ? "PRO"
                : ""}
            </Text>
            <Text style={styles.priceText}>
              {tab === 0
                ? "₹ 2,499"
                : tab === 1
                ? "₹ 6,499"
                : tab === 2
                ? "₹ 9,499"
                : ""}
            </Text>
          </ImageBackground>
        ) : (
          ""
        )}
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
            handler={() => {
              buyNowHandler(
                tab === 0
                  ? "basic"
                  : tab === 1
                  ? "standard"
                  : tab === 2
                  ? "pro"
                  : ""
              );
            }}

            // handler={handlePay}
          />
        </View>
      </View>
    );
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
      {/* <View style={styles.tabCont}>
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
      </View>*/}

      <View style={{ height: "80%", marginTop: "8%" }}>
        <Carousel
          layout="default"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH - 20}
          itemWidth={ITEM_WIDTH - 20}
          onSnapToItem={(index) => setTab(index)}
          useScrollView={true}
        />
        <Pagination
          dotsLength={data.length}
          activeDotIndex={tab}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: "#555",
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>

      <Text style={styles.SwipeText}>Swipe up for course contents</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.modalContainer}>
          <ButtonComponent text={"Make Payment"} handler={makePaymentHandler} />
          {isLoading && <ActivityIndicator size="large" color={Colors.clr4} />}
        </View>
      </Modal>
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
  container: {
    backgroundColor: Colors.transparentBg,
    height: "90%",
    width: ITEM_WIDTH - 20,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // paddingBottom: 30,
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    borderRadius: 8,
    marginTop: "15%",
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 7,
  },

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
    height: "30%",
    alignItems: "center",
    // backgroundColor: "red",
  },
  planText: {
    fontSize: CalculateFontSize(2.5),
    fontWeight: "800",
    padding: 10,
    alignSelf: "flex-start",
    color: Colors.midWhite,
  },
  priceText: {
    fontSize: CalculateFontSize(5),
    fontWeight: "700",
    color: Colors.btnClr,
  },

  featuresCont: {
    width: "100%",
    height: "auto",
    marginTop: "10%",
    alignItems: "center",
    // backgroundColor: "blue",
  },

  featureText: {
    fontSize: CalculateFontSize(1.6),
    color: "#fff",
    marginBottom: "8%",
  },
  btnCont: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginTop: "11%",
    paddingHorizontal: 20,
    marginBottom: "5%",
    // backgroundColor: "red",
  },

  SwipeText: {
    fontSize: CalculateFontSize(2),
    fontWeight: "400",
    marginTop: "13%",
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
