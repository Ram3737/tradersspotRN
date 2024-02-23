import {
  View,
  Text,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useState, useContext, useRef, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "react-native-simple-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../components/colors/colors";
import ButtonComponent from "../buttonComponent/buttonComponent";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";
import BuyNow0 from "../../images/pictures/buyNow0.jpg";
import BuyNow1 from "../../images/pictures/buyNow1.jpg";
import BuyNow2 from "../../images/pictures/buyNow2.jpg";
import VideosLogo from "../../images/logo/videos.png";
import SheetsLogo from "../../images/logo/sheets.png";
import ValidityLogo from "../../images/logo/validityNeon.png";
import AnalysisLogo from "../../images/logo/analysisNeon.png";
import VideosNeonLogo from "../../images/logo/videosNeon.png";
import NewsNeonLogo from "../../images/logo/newsNeon.png";
import ScreenerNeonLogo from "../../images/logo/screenerNeon.png";
import InsightsNeonLogo from "../../images/logo/insightsNeon.png";
import lockLogo from "../../images/logo/lock.png";
import NewsLogo from "../../images/logo/news.png";
import StocksLogo from "../../images/logo/stocksAnalysis.png";
import ScreenerLogo from "../../images/logo/screener.png";
import OneToOneLogo from "../../images/logo/oneToOne.png";
import FundamentalLogo from "../../images/logo/fundamental.png";
import { AuthContext } from "../stores/context/authContextProvider";
import CoursePricingModal from "./coursePricingModal";
import {
  CallPatchApiServices,
  CallPatchApiServicesWithTkn,
} from "../../webServices/apiCalls";

function CourseDetailsModal({
  closeModal,
  isModalVisible,
  course,
  courseAmount,
  tab,
}) {
  const panelRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [contentTab, setContentTab] = useState("overview");
  const [buyNowLoader, setBuyNowLoader] = useState(false);
  const [coursePricingModalOpen, setCoursePricingModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [paid, setPaid] = useState(null);
  const [email, setEmail] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const courseContent = [
    {
      topic: "BASICS",
      subContent: [
        {
          contentName: "What is Stock Trading ?",
          contentDuration: "15:29 mins",
        },
        { contentName: "Charts & Candlesticks", contentDuration: "18:45 mins" },
        {
          contentName: "Fundamental vs Technical analysis",
          contentDuration: "34:08 mins",
        },
      ],
    },
    {
      topic: "CORE",
      subContent: [
        {
          contentName: "Support & Resistance (Supply & Demand)",
          contentDuration: "47:41 mins",
        },
        {
          contentName: "Zones and how to identify zone ?",
          contentDuration: "20:45 mins",
        },
        {
          contentName: "Trendlines and how to draw a perfect trendline ?",
          contentDuration: "36:35 mins",
        },
      ],
    },
    {
      topic: "INDICATORS",
      subContent: [
        {
          contentName: "Lagging vs Leading indicator",
          contentDuration: "06:46 mins",
        },
        {
          contentName: "Volume Profile and how to use it ?",
          contentDuration: "29:14 mins",
        },
        {
          contentName: "Golden Fibonacci rule (0.618)",
          contentDuration: "24:33 mins",
        },
        {
          contentName: "Relative Strength Index (RSI) & cheatsheet",
          contentDuration: "26:19 mins",
        },
        {
          contentName: "Moving Averages (9ma, 20ma, 50ma) & cheatsheet",
          contentDuration: "17:26 mins",
        },
      ],
    },
    {
      topic: "PATTERNS",
      subContent: [
        {
          contentName: "What are Patterns ?",
          contentDuration: "07:27 mins",
        },
        {
          contentName: "Triangle pattern & cheatsheet",
          contentDuration: "58:42 mins",
        },
        {
          contentName: "Channel pattern & cheatsheet",
          contentDuration: "30:24 mins",
        },
        {
          contentName: "Flag pattern & cheatsheet",
          contentDuration: "20:31 mins",
        },
        {
          contentName: "Wedge pattern & cheatsheet",
          contentDuration: "33:05 mins",
        },
        {
          contentName: "Double Top pattern & cheatsheet",
          contentDuration: "29:11 mins",
        },
        {
          contentName: "Double Bottom pattern & cheatsheet",
          contentDuration: "18:08 mins",
        },
        {
          contentName: "Head and Shoulder & cheatsheet",
          contentDuration: "24:42 mins",
        },
        {
          contentName: "Inverse Head and Shoulder & cheatsheet",
          contentDuration: "21:17 mins",
        },
        {
          contentName: "Major patterns to trade",
          contentDuration: "19:32 mins",
        },
      ],
    },
    {
      topic: "STRATEGIES",
      subContent: [
        {
          contentName: "#1 strategy for Intraday",
          contentDuration: "1:29:37 mins",
        },
        {
          contentName: "#1 strategy for Swing",
          contentDuration: "1:15:27 mins",
        },
      ],
    },
    {
      topic: "RISK MANAGEMENT",
      subContent: [
        {
          contentName: "Position sizing",
          contentDuration: "09:39 mins",
        },
        {
          contentName: "Risk / Reward",
          contentDuration: "09:56 mins",
        },
      ],
    },
    {
      topic: "BONUS",
      subContent: [
        {
          contentName: "Breakout vs Fakeout",
          contentDuration: "10:04 mins",
        },
        {
          contentName: "Perfect & Confluence entry",
          contentDuration: "27:25 mins",
        },
        {
          contentName: "Trail your trade",
          contentDuration: "21:18 mins",
        },
      ],
    },
  ];

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const uType = await AsyncStorage.getItem("userType");
      const emil = await AsyncStorage.getItem("email");
      const convertedPaid = JSON.parse(pid);

      setToken(tkn);
      setPaid(convertedPaid);
      setCourseType(cType);
      setEmail(emil);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  function contentViewHandler(text) {
    setContentTab(text);
  }

  function coursePricingModalOpenHandler() {
    if (token && !paid) {
      setBuyNowLoader(true);
      CallPatchApiServicesWithTkn(
        `/user/buy-course`,
        {
          email: email,
          courseType: course,
          triedToUpdate: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          if (response.status === 201) {
            setBuyNowLoader(false);
            setCoursePricingModalOpen(true);
            console.log("course updated");
          }
        },
        (error) => {
          setBuyNowLoader(false);
          Alert.alert("Server down", "Please try again sometime");
          console.log("payerr", error.message);
        }
      );
    } else if (token && paid) {
      console.log(2);
      setBuyNowLoader(true);
      CallPatchApiServicesWithTkn(
        `/user/buy-course`,
        {
          email: email,
          courseType: courseType,
          triedToUpdate: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          if (response.status === 201) {
            setBuyNowLoader(false);
            setCoursePricingModalOpen(true);
            console.log("course updated");
          }
        },
        (error) => {
          setBuyNowLoader(false);
          Alert.alert("Server down", "Please try again sometime");
          console.log("payerr", error.message);
        }
      );
    } else {
      authCtx.setRegisterSignupToggle(true);
      navigation.navigate("loginSignup");
      closeModal();
    }
  }

  function coursePricingModalCloseHandler() {
    setCoursePricingModalOpen(false);
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
        <View style={styles.tabCont}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  contentTab === "overview" ? Colors.clr4 : "transparent",
              },
            ]}
            onPress={() => contentViewHandler("overview")}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: contentTab === "overview" ? "#000" : "#fff",
                  fontWeight: contentTab === "overview" ? "500" : "300",
                },
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  contentTab === "contents" ? Colors.clr4 : "transparent",
              },
            ]}
            onPress={() => contentViewHandler("contents")}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: contentTab === "contents" ? "#000" : "#fff",
                  fontWeight: contentTab === "contents" ? "500" : "300",
                },
              ]}
            >
              Contents
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollCont}
        >
          {contentTab === "overview" && (
            <View style={styles.scrollContSub}>
              <View>
                {tab === 0 && (
                  <ImageBackground
                    source={BuyNow1}
                    style={styles.imgCont}
                    imageStyle={styles.imgContImg}
                  />
                )}
                {tab === 1 && (
                  <ImageBackground
                    source={BuyNow2}
                    style={styles.imgCont}
                    imageStyle={styles.imgContImg}
                  />
                )}
                {tab === 2 && (
                  <ImageBackground
                    source={BuyNow0}
                    style={styles.imgCont}
                    imageStyle={[styles.imgContImg, { opacity: 0.45 }]}
                  />
                )}
                <Text style={styles.courseHeadingText}>
                  {tab === 0
                    ? "PRICE ACTION - THE COMPLETE COURSE"
                    : tab === 1
                    ? "DOMINATE MARKETS: MASTER PRICE ACTION WITH STOCK ANALYSIS"
                    : tab === 2
                    ? "SYNERGIZING PRICE ACTION WITH FUNDAMENTALS FOR MARKET MASTERY"
                    : ""}
                </Text>
                <Text style={styles.courseHeadingTextSub}>
                  {tab === 0
                    ? "Basics"
                    : tab === 1
                    ? "Standard"
                    : tab === 2
                    ? "Pro"
                    : ""}
                </Text>
              </View>
              <View style={styles.cardCont}>
                <View style={styles.card}>
                  <Image
                    source={VideosLogo}
                    style={{
                      width: 25,
                      height: 36,
                      marginLeft: -10,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.cardText}>VIDEOS</Text>
                </View>
                <View style={[styles.card, { marginLeft: 10 }]}>
                  <Image
                    source={SheetsLogo}
                    style={{
                      width: 25,
                      height: 36,
                      marginLeft: -10,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.cardText}>ANALYSIS STATS</Text>
                </View>
                {(tab === 1 || tab === 2) && (
                  <View style={[styles.card, { marginLeft: 10 }]}>
                    <Image
                      source={NewsLogo}
                      style={{
                        width: 25,
                        height: 36,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <Text style={styles.cardText}>CORE NEWS</Text>
                  </View>
                )}
              </View>

              {(tab === 1 || tab === 2) && (
                <View style={styles.cardCont}>
                  <View style={[styles.card]}>
                    <Image
                      source={StocksLogo}
                      style={{
                        width: 25,
                        height: 38,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <Text style={styles.cardText}>STOCK ANALYSIS</Text>
                  </View>

                  {tab === 2 && (
                    <View style={[styles.card, { marginLeft: 10 }]}>
                      <Image
                        source={ScreenerLogo}
                        style={{
                          width: 25,
                          height: 42,
                          marginLeft: -10,
                          marginRight: 3,
                        }}
                      />
                      <Text style={styles.cardText}>SCREENER ANALYSIS</Text>
                    </View>
                  )}
                </View>
              )}

              {tab === 2 && (
                <View style={styles.cardCont}>
                  <View style={[styles.card]}>
                    <Image
                      source={OneToOneLogo}
                      style={{
                        width: 25,
                        height: 41,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <Text style={styles.cardText}>ONE - ONE</Text>
                  </View>

                  <View style={[styles.card, { marginLeft: 10 }]}>
                    <Image
                      source={FundamentalLogo}
                      style={{
                        width: 25,
                        height: 36,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <Text style={styles.cardText}>FUNDAMENTAL INSIGHTS</Text>
                  </View>
                </View>
              )}
              <View style={styles.aboutCourseCont}>
                <Text style={styles.sideHeadingText}>About This Course</Text>
                {tab === 0 && (
                  <Text style={styles.contentDescriptionText}>
                    Welcome to Trader's Spot Price Action - The complete course.
                    The essential knowledge that every trader should possess.
                  </Text>
                )}
                {tab === 1 && (
                  <Text style={styles.contentDescriptionText}>
                    Welcome to Trader's Spot Dominate Markets - Master price
                    action with stock analysis. The essential knowledge that
                    every trader should possess.
                  </Text>
                )}
                {tab === 2 && (
                  <Text style={styles.contentDescriptionText}>
                    Welcome to Trader's Spot Synergizing price action with
                    fundamentals for market mastery. Key information that every
                    trader should have in their possession.
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => panelRef.current.togglePanel()}
                >
                  {tab === 0 && (
                    <Text style={styles.contentDescriptionText}>
                      In this course, you'll gain insights into successful price
                      action trading...
                      <Text
                        style={[
                          styles.contentDescriptionText,
                          {
                            textDecorationLine: "underline",
                            color: Colors.clr4,
                            fontSize: CalculateFontSize(1.6),
                          },
                        ]}
                      >
                        Read more
                      </Text>
                      {/* through the acquisition of effective and proven
              strategies. */}
                    </Text>
                  )}

                  {tab === 1 && (
                    <Text style={styles.contentDescriptionText}>
                      In this course, you will acquire knowledge through
                      real-time stock charts and price action trading...
                      <Text
                        style={[
                          styles.contentDescriptionText,
                          {
                            textDecorationLine: "underline",
                            color: Colors.clr4,
                            fontSize: CalculateFontSize(1.6),
                          },
                        ]}
                      >
                        Read more
                      </Text>
                    </Text>
                  )}

                  {tab === 2 && (
                    <Text style={styles.contentDescriptionText}>
                      In this course, you will acquire knowledge in core
                      fundamentals of stocks with price action trading...
                      <Text
                        style={[
                          styles.contentDescriptionText,
                          {
                            textDecorationLine: "underline",
                            color: Colors.clr4,
                            fontSize: CalculateFontSize(1.6),
                          },
                        ]}
                      >
                        Read more
                      </Text>
                    </Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.whatElseCont}>
                <Text
                  style={[
                    styles.sideHeadingText,
                    { fontSize: CalculateFontSize(2) },
                  ]}
                >
                  What else you will get ?
                </Text>
                <View style={styles.whatElseSubCont}>
                  <View style={styles.whatElseSubContItem}>
                    <Image
                      source={ValidityLogo}
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <View style={styles.whatElseSubContItemDescCont}>
                      <Text style={styles.whatElseSubContItemText}>
                        Validity
                      </Text>
                      {tab === 0 && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          You will get 1 month validity
                        </Text>
                      )}
                      {tab === 1 && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          You will get 3 month validity
                        </Text>
                      )}
                      {tab === 2 && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          You will get 1 year validity
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.whatElseSubContItem}>
                    <Image
                      source={VideosNeonLogo}
                      style={{
                        width: 42,
                        height: 42,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <View style={styles.whatElseSubContItemDescCont}>
                      <Text style={styles.whatElseSubContItemText}>Videos</Text>
                      {(tab === 0 || tab === 1) && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          Access to 15 hours of video contents
                        </Text>
                      )}
                      {tab === 2 && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          Access to 18 hours of video contents
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
                <View style={[styles.whatElseSubCont, { marginTop: 18 }]}>
                  <View style={styles.whatElseSubContItem}>
                    <Image
                      source={AnalysisLogo}
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <View style={styles.whatElseSubContItemDescCont}>
                      <Text style={styles.whatElseSubContItemText}>
                        Analysis
                      </Text>
                      {tab === 0 && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          You will get free analyses(1/week)
                        </Text>
                      )}
                      {(tab === 1 || tab === 2) && (
                        <Text style={styles.whatElseSubContItemDescText}>
                          You will get paid analyses(6/week)
                        </Text>
                      )}
                    </View>
                  </View>
                  {(tab === 1 || tab === 2) && (
                    <View style={styles.whatElseSubContItem}>
                      <Image
                        source={NewsNeonLogo}
                        style={{
                          width: 50,
                          height: 60,
                          marginLeft: -15,
                          marginRight: 3,
                        }}
                      />
                      <View style={styles.whatElseSubContItemDescCont}>
                        <Text style={styles.whatElseSubContItemText}>News</Text>
                        <Text style={styles.whatElseSubContItemDescText}>
                          You will get high priority news
                        </Text>
                      </View>
                    </View>
                  )}
                </View>

                {tab === 2 && (
                  <View style={[styles.whatElseSubCont, { marginTop: 18 }]}>
                    <View style={styles.whatElseSubContItem}>
                      <Image
                        source={ScreenerNeonLogo}
                        style={{
                          width: 50,
                          height: 60,
                          marginLeft: -10,
                          marginRight: 3,
                        }}
                      />
                      <View style={styles.whatElseSubContItemDescCont}>
                        <Text style={styles.whatElseSubContItemText}>
                          Screener
                        </Text>

                        <Text style={styles.whatElseSubContItemDescText}>
                          Learning screener for fundamental
                        </Text>
                      </View>
                    </View>

                    <View style={styles.whatElseSubContItem}>
                      <Image
                        source={InsightsNeonLogo}
                        style={{
                          width: 50,
                          height: 65,
                          marginLeft: -15,
                          marginRight: 3,
                        }}
                      />
                      <View style={styles.whatElseSubContItemDescCont}>
                        <Text style={styles.whatElseSubContItemText}>
                          Insights
                        </Text>
                        <Text style={styles.whatElseSubContItemDescText}>
                          Learning deep analysis of a stock
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
              <Text style={[styles.sideHeadingText, { marginTop: 30 }]}>
                Pricing Details
              </Text>
              <View style={styles.pricingCont}>
                <View style={styles.pricingContSub}>
                  <Text style={styles.pricingContSubText1}>You Pay</Text>
                  <View style={styles.pricingContSubCont}>
                    <Text style={styles.pricingContSubContText1}>
                      {tab === 0
                        ? "₹ 4,999"
                        : tab === 1
                        ? "₹ 7,999"
                        : tab === 2
                        ? "₹ 12,999"
                        : ""}
                    </Text>
                    <Text style={styles.pricingContSubContText2}>
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
              </View>
            </View>
          )}
          {contentTab === "contents" && (
            <View style={styles.scrollContSub}>
              {courseContent.map((topic, topicIndex) => (
                <View key={topicIndex} style={styles.contentMain}>
                  <Text style={[styles.sideHeadingText, { marginBottom: 15 }]}>
                    {topic.topic}
                  </Text>
                  {topic.subContent.map((content, index) => (
                    <View key={index} style={styles.contents}>
                      <View style={styles.contentsLeft}>
                        <Image
                          source={VideosLogo}
                          style={{
                            width: 25,
                            height: 36,
                            marginRight: 3,
                          }}
                        />
                      </View>
                      <View style={styles.contentsCenter}>
                        <Text
                          style={styles.contentsCenterText1}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {content.contentName}
                        </Text>
                        <Text style={styles.contentsCenterText2}>
                          {content.contentDuration}
                        </Text>
                      </View>
                      <View style={styles.contentsRight}>
                        <TouchableOpacity
                          style={styles.playBtn}
                          onPress={() => toggleModal(content, index)}
                        >
                          <Image source={lockLogo} style={styles.playBtnImg} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
        <View style={styles.buyNowBelowCont}>
          <View style={styles.priceBelowCont}>
            <Text style={styles.priceBelowContActualPriceText}>
              {tab === 0
                ? "₹ 2,499"
                : tab === 1
                ? "₹ 4,499"
                : tab === 2
                ? "₹ 9,499"
                : ""}
            </Text>
            <View style={styles.priceBelowContSub}>
              <Text style={styles.priceBelowContSubText1}>
                {tab === 0
                  ? "₹ 4,999"
                  : tab === 1
                  ? "₹ 7,999"
                  : tab === 2
                  ? "₹ 12,999"
                  : ""}
              </Text>
              <Text style={styles.priceBelowContSubText2}>20% OFF</Text>
            </View>
          </View>
          <View style={styles.buyNowBtnCont}>
            <ButtonComponent
              text={"Buy now"}
              fontStyle={{
                fontSize: CalculateFontSize(2.3),
                fontWeight: "600",
              }}
              handler={coursePricingModalOpenHandler}
              indicator={buyNowLoader}
              disabled={buyNowLoader}
            />
          </View>
        </View>

        <CoursePricingModal
          closeModal={coursePricingModalCloseHandler}
          isModalVisible={coursePricingModalOpen}
          courseAmount={courseAmount}
          closeCourseDetailModal={closeModal}
          closeCoursePricingModal={coursePricingModalCloseHandler}
          tab={tab}
        />
        <BottomSheet
          ref={(ref) => (panelRef.current = ref)}
          isOpen={false}
          sliderMinHeight={0}
          sliderMaxHeight={680}
          wrapperStyle={{
            backgroundColor: Colors.clr2,
            paddingHorizontal: 0,
            paddingTop: 0,
            paddingBottom: 15,
          }}
        >
          {(onScrollEndDrag) => (
            <ScrollView style={styles.bsCourseContentCont}>
              <View
                style={[
                  styles.bsContents,
                  {
                    height:
                      tab === 0 ? 820 : tab === 1 ? 980 : tab === 2 ? 1150 : "",
                  },
                ]}
              >
                <View style={styles.bsContentsSub}>
                  <Text style={styles.sideHeadingText}>About This Course</Text>
                  <Text
                    style={[
                      styles.courseHeadingText,
                      { color: Colors.midWhite, marginTop: 30 },
                    ]}
                  >
                    {tab === 0
                      ? "PRICE ACTION - THE COMPLETE COURSE"
                      : tab === 1
                      ? "DOMINATE MARKETS: MASTER PRICE ACTION WITH STOCK ANALYSIS"
                      : tab === 2
                      ? "SYNERGIZING PRICE ACTION WITH FUNDAMENTALS FOR MARKET MASTERY"
                      : ""}
                  </Text>
                  <View style={styles.cardCont}>
                    <View
                      style={[styles.card, { backgroundColor: Colors.clr3 }]}
                    >
                      <Text
                        style={[
                          styles.cardText,
                          {
                            color: "#000",
                            fontWeight: "700",
                            fontSize: CalculateFontSize(1.6),
                          },
                        ]}
                      >
                        {tab === 0
                          ? "Basics"
                          : tab === 1
                          ? "Standard"
                          : tab === 2
                          ? "Pro"
                          : ""}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[styles.line, { marginTop: 25, marginBottom: 10 }]}
                  ></View>

                  {tab === 0 && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        { color: "#fff", lineHeight: 20 },
                      ]}
                    >
                      Welcome to Trader's Spot Price Action - The complete
                      course. The essential knowledge that every trader should
                      possess.
                    </Text>
                  )}
                  {tab === 1 && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        { color: "#fff", lineHeight: 20 },
                      ]}
                    >
                      Welcome to Trader's Spot Dominate Markets - Master price
                      action with stock analysis. The essential knowledge that
                      every trader should possess.
                    </Text>
                  )}
                  {tab === 2 && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        { color: "#fff", lineHeight: 20 },
                      ]}
                    >
                      Welcome to Trader's Spot Synergizing price action with
                      fundamentals for market mastery. Key information that
                      every trader should have in their possession.
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20 },
                    ]}
                  >
                    {tab === 0 &&
                      `In this course, you'll gain insights into successful price action trading through the acquisition of effective and proven strategies.`}
                    {tab === 1 &&
                      `In this course, you will acquire knowledge through real-time stock charts and price action trading through the acquisition of effective and proven strategies.`}
                    {tab === 2 &&
                      `In this course, you will acquire knowledge in core fundamentals of stocks with price action trading through the acquisition of effective and proven strategies.`}
                  </Text>

                  {tab === 2 && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        { color: "#fff", lineHeight: 20, marginTop: 30 },
                      ]}
                    >
                      😎 {"  "}Learn how to uncover the core values of a stock
                      through fundamental analysis (balance sheets, intrinsic
                      values, EPS, and more), with the assistance of a screener.
                    </Text>
                  )}
                  {tab === 2 && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        { color: "#fff", lineHeight: 20, marginTop: 15 },
                      ]}
                    >
                      😎 {"  "}Master the market by combining technical and
                      fundamental strategies.
                    </Text>
                  )}
                  {(tab === 1 || tab === 2) && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        {
                          color: "#fff",
                          lineHeight: 20,
                          marginTop: tab === 1 ? 30 : 15,
                        },
                      ]}
                    >
                      😎 {"  "}Learn how to analyze a chart in real-time and
                      execute trades with technical expertise.
                    </Text>
                  )}

                  {(tab === 1 || tab === 2) && (
                    <Text
                      style={[
                        styles.contentDescriptionText,
                        {
                          color: "#fff",
                          lineHeight: 20,
                          marginTop: 15,
                        },
                      ]}
                    >
                      😎 {"  "}Pre-analyzed charts offer ample assistance in
                      enhancing your technical analysis skills.
                    </Text>
                  )}
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      {
                        color: "#fff",
                        lineHeight: 20,
                        marginTop: tab === 0 ? 30 : 15,
                      },
                    ]}
                  >
                    😎 {"  "}Obtain in-depth knowledge about factual price
                    action trading.
                  </Text>
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20 },
                    ]}
                  >
                    😎 {"  "}Proven strategies to progress from beginner to
                    expert level.
                  </Text>
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20 },
                    ]}
                  >
                    😎 {"  "}Our strategy is designed to minimize losses and
                    ensure consistent profitability in market.
                  </Text>
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20 },
                    ]}
                  >
                    😎 {"  "}Advanced price action strategy for maximum trading
                    benefits.
                  </Text>
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20 },
                    ]}
                  >
                    😎 {"  "}Consistent profits through market-tested trading
                    tactics
                  </Text>
                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20 },
                    ]}
                  >
                    😎 {"  "}Unlock the potential for consistent returns with
                    our strategic approach.
                  </Text>

                  <Text
                    style={[
                      styles.contentDescriptionText,
                      { color: "#fff", lineHeight: 20, marginTop: 30 },
                    ]}
                  >
                    Before purchasing the course, please conduct thorough
                    research on the analyses we have shared on our Telegram
                    channel over the last two years to understand how our
                    strategy works.
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </BottomSheet>
      </View>
    </Modal>
  );
}

export default CourseDetailsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.mainBgClr,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
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
  tabCont: {
    height: 35,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  tab: {
    width: "25%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: Colors.clr5,
    borderWidth: 0.8,
    marginRight: 10,
  },

  tabText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "300",
    color: "#fff",
  },
  line: {
    width: "100%",
    height: 0.3,
    alignSelf: "center",
    backgroundColor: Colors.midWhite,
  },
  scrollCont: {
    width: "100%",
    paddingHorizontal: 14,
    marginTop: 30,
  },
  scrollContSub: {
    width: "100%",
    height: "auto",
    paddingBottom: 25,
  },
  imgCont: {
    width: "100%",
    height: 160,
    alignItems: "center",
    marginBottom: 10,
  },
  imgContImg: {
    height: "100%",
    opacity: 0.3,
    objectFit: "fill",
  },
  courseHeadingText: {
    fontSize: CalculateFontSize(2.5),
    fontWeight: "600",
    color: "#fff",
    lineHeight: 30,
    marginTop: 10,
  },
  courseHeadingTextSub: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    color: Colors.midWhite,
    marginTop: 10,
  },
  cardCont: {
    height: 23,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  card: {
    width: "auto",
    height: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#222",
  },
  cardText: {
    fontSize: CalculateFontSize(1.4),
    fontWeight: "300",
    color: "#fff",
  },
  aboutCourseCont: {
    width: "100%",
    marginTop: 30,
    // backgroundColor: "red",
  },
  sideHeadingText: {
    fontSize: CalculateFontSize(2.4),
    fontWeight: "500",
    color: Colors.clr4,
  },
  contentDescriptionText: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "300",
    color: Colors.midWhite,
    lineHeight: 20,
    marginTop: 15,
  },
  whatElseCont: {
    width: "100%",
    height: "auto",
    marginTop: 30,
    padding: 10,
    backgroundColor: Colors.transparentBg,
  },
  whatElseSubCont: {
    width: "100%",
    height: 53,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    // backgroundColor: "red",
  },
  whatElseSubContItem: {
    width: "45%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  whatElseSubContItemDescCont: {
    width: "65%",
    height: "100%",
    flexDirection: "column",
    // backgroundColor: "#999",
  },
  whatElseSubContItemText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "500",
    color: "#fff",
    marginBottom: 5,
  },
  whatElseSubContItemDescText: {
    fontSize: CalculateFontSize(1.3),
    fontWeight: "300",
    color: Colors.midWhite,
    marginLeft: 1,
    lineHeight: 13,
  },
  buyNowBelowCont: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.clr2,
  },
  priceBelowCont: {
    width: "auto",
    height: "100%",
    paddingHorizontal: 35,
    paddingLeft: 25,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buyNowBtnCont: {
    width: "auto",
    height: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  priceBelowContActualPriceText: {
    fontSize: CalculateFontSize(2.6),
    fontWeight: "500",
    color: "#fff",
  },
  priceBelowContSub: {
    width: "100%",
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 10,
  },
  priceBelowContSubText1: {
    fontSize: CalculateFontSize(2),
    fontWeight: "500",
    color: "#fff",
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  priceBelowContSubText2: {
    fontSize: CalculateFontSize(1.5),
    fontWeight: "300",
    color: "yellow",
    alignSelf: "center",
  },
  pricingCont: {
    width: "100%",
    height: 80,
    marginTop: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "red",
  },
  pricingContSub: {
    width: "90%",
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.clr3,
    borderWidth: 0.8,
    borderRadius: 5,
  },
  pricingContSubText1: {
    fontSize: CalculateFontSize(2),
    fontWeight: "500",
    color: Colors.midWhite,
  },
  pricingContSubCont: {
    width: "auto",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  pricingContSubContText1: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    marginRight: 10,
    color: Colors.midWhite,
    textDecorationLine: "line-through",
  },
  pricingContSubContText2: {
    fontSize: CalculateFontSize(2.4),
    fontWeight: "500",
    color: "#fff",
  },
  contentMain: {
    width: "100%",
    height: "auto",
    marginBottom: 15,
    // backgroundColor: "red",
  },
  contents: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: Colors.transparentBg,
    borderRadius: 20,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  contentsLeft: {
    flex: 0.8,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  contentsLeftText: {
    fontSize: CalculateFontSize(2.2),
    fontWeight: "300",
    color: "#fff",
  },

  contentsCenter: {
    flex: 5,
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    // backgroundColor: "cyan",
  },
  contentsCenterText1: {
    fontSize: CalculateFontSize(2),
    fontWeight: "400",
    color: "#fff",
    marginBottom: 5,
  },
  contentsCenterText2: {
    fontSize: CalculateFontSize(1.4),
    fontWeight: "500",
    color: Colors.btnClr,
  },
  contentsRight: {
    flex: 1.2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },

  playBtn: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#555",
    borderRadius: 50,
    // padding: 15,
  },

  playBtnImg: {
    width: 30,
    height: 30,
  },
  bsCourseContentCont: {
    width: "100%",
    height: 910,
    marginTop: "-4%",
    paddingHorizontal: "4%",
    paddingTop: "0.5%",
    // backgroundColor: "red",
  },
  bsContents: {
    width: "100%",
    height: 820,
    marginTop: "6%",
    // backgroundColor: "red",
  },
  bsContentsSub: {
    width: "100%",
    height: "auto",
    marginBottom: "7%",
    // backgroundColor: "blue",
  },
});
