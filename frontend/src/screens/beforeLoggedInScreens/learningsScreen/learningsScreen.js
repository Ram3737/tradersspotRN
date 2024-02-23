import {
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Vibration,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  useState,
  useContext,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import VideoModal from "./components/videoModal";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import { CallGetApiServicesWithTkn } from "../../../webServices/apiCalls";
import CustomAlertMsgBox from "../../../components/customAlertBox/customAlertMsgBox";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";

function LearningsScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const [mainTopicsFundamentals, setMainTopicsFundamentals] = useState([
    {
      name: "STARTER",
      duration: `1hr:08 mins`,
      link: "startContent",
    },
    {
      name: "CORE",
      duration: `1hr:44 mins`,
      link: "coreContent",
    },
  ]);

  const [topic, setTopic] = useState(mainTopicsFundamentals);

  const [allContent, setAllContent] = useState();
  const [content, setContent] = useState([]);
  const [modalVideoContent, setModalVideoContent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("BASICS");
  const [selectedContent, setSelectedContent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const [name, setName] = useState(null);
  const [upgradeCourseAlert, setUpgradeCourseAlert] = useState(false);

  const tradingViewWidget = `
  <div class="tradingview-widget-container" >
    <div class="tradingview-widget-container__widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
    {
    "symbols": [
      {
        "proName": "FOREXCOM:SPXUSD",
        "title": "S&P 500"
      },
      {
        "proName": "FOREXCOM:NSXUSD",
        "title": "US 100"
      },
      {
        "proName": "FX_IDC:EURUSD",
        "title": "EUR to USD"
      },
      {
        "proName": "BITSTAMP:BTCUSD",
        "title": "Bitcoin"
      },
      {
        "proName": "BITSTAMP:ETHUSD",
        "title": "Ethereum"
      }
    ],
    "height":"150",
    "showSymbolLogo": true,
    "colorTheme": "dark",
    "isTransparent": false,
    "displayMode": "compact",
    "locale": "in"
  }
    </script>
  </div>
`;

  function callCourseContent() {
    setIsLoading(true);
    CallGetApiServicesWithTkn(
      `/course/fundamental-free-course-content
      `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 200) {
          setSelectedCategory("STARTER");
          setAllContent(response.data);
          setContent(response.data.startContent);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        console.log("err getting allCourseContents", err);
      }
    );
  }

  useEffect(() => {
    setSelectedCategory("STARTER");
    setSelectedContent(0);
    callCourseContent();
  }, []);

  useEffect(() => {
    if (token) {
      callCourseContent();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const nm = await AsyncStorage.getItem("name");
      const convertedPaid = JSON.parse(pid);

      setToken(tkn);
      setName(nm);
      setCourseType(cType);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  function modalVideoHandler(content, selectedContent) {
    setModalVideoContent(content);
    setSelectedContent(selectedContent);
  }

  const toggleModal = (content, selectedContent) => {
    if (!token) {
      setUpgradeCourseAlert(true);
      setTimeout(() => {
        setUpgradeCourseAlert(false);
      }, 3000);

      return;
    }
    setModalVisible(!isModalVisible);
    setModalVideoContent(content);
    setSelectedContent(selectedContent);
  };

  const closeModal = () => {
    setModalVideoContent(null);
    setModalVisible(!isModalVisible);
    setSelectedContent(selectedContent);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    callCourseContent();
    setSelectedCategory("STARTER");
    authCtx.nullCall();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // console.log("contnt", topic);

  return (
    <View
      style={[
        CommonStyles.mainContainer,
        { padding: 0, justifyContent: "flex-start", paddingBottom: 10 },
      ]}
    >
      <ImageBackground
        source={require("../../../images/pictures/learningBg.jpg")}
        style={styles.topInfoCont}
        imageStyle={styles.topInfoContPic}
      >
        <View style={styles.topInfoContLeft}>
          <Text style={styles.text1}>
            Learn the core froundations of Stock Market Trading
          </Text>
        </View>

        <View style={styles.topInfoContFloat}>
          <View style={styles.topInfoContFloatTop}>
            <View style={styles.topInfoContFloatTopSub}>
              <Text style={styles.topInfoContFloatTopSubText2}>20</Text>
              <Text style={styles.topInfoContFloatTopSubText}>
                Total Videos
              </Text>
            </View>

            <View style={styles.topInfoContFloatTopSub}>
              <Text style={styles.topInfoContFloatTopSubText2}>14</Text>
              <Text style={[styles.topInfoContFloatTopSubText]}>
                Total Hours
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        nestedScrollEnabled={true}
        style={styles.scrollMainCont}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressBackgroundColor={Colors.transparentBg}
            colors={[Colors.btnClr, Colors.clr4, Colors.clr5, Colors.clr3]}
          />
        }
      >
        <View style={styles.categoryCont}>
          <View style={styles.categoryHeadingCont}>
            <View style={styles.categoryHeadingSubCont}>
              <Text style={styles.categoryHeadingText}>Categories</Text>
            </View>
          </View>
          <ScrollView style={styles.categorySubCont} horizontal={true}>
            {topic.map((topic, index) => (
              <ImageBackground
                key={index}
                style={styles.categories}
                source={require("../../../images/pictures/cat1.jpg")}
                imageStyle={styles.categoriesPic}
              >
                <View style={styles.categoriesTop}>
                  <Text style={styles.categoriesTopText}>{topic.name}</Text>
                </View>
                <View style={styles.categoriesBottom}>
                  <View style={styles.categoriesBottomCenter}>
                    <Text style={styles.categoriesBottomText2}>
                      {topic.duration}
                    </Text>
                  </View>
                  <View style={styles.categoriesBottomRight}>
                    <TouchableOpacity
                      style={[
                        styles.viewBtn,
                        {
                          backgroundColor:
                            selectedCategory === topic.name
                              ? "#555"
                              : Colors.clr4,
                        },
                      ]}
                      onPress={() => {
                        setContent(allContent?.[topic.link] || []);
                        setSelectedCategory(topic.name);
                        setSelectedContent(0);
                      }}
                    >
                      <Text
                        style={[
                          styles.viewBtnText,
                          {
                            color:
                              selectedCategory === topic.name
                                ? Colors.midWhite
                                : "#000",
                          },
                        ]}
                      >
                        view
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        </View>

        <View style={styles.contentCont}>
          <View style={styles.contentHeadingSubCont}>
            <Text style={styles.contentHeadingText}>Contents</Text>
            <Text style={styles.contentToDisplayText}>
              {`-   ${selectedCategory?.toLowerCase()}`}
            </Text>
          </View>
          <View style={styles.contentContMain}>
            <ScrollView
              nestedScrollEnabled={true}
              style={styles.scrollContentCont}
            >
              {content.length === 0 && isLoading && (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "20%" }}
                />
              )}
              {content.length > 0 &&
                !isLoading &&
                content.map((content, index) => (
                  <View
                    key={index}
                    style={[
                      styles.contents,
                      {
                        backgroundColor:
                          selectedContent === index ? "#222" : Colors.clr2,
                      },
                    ]}
                  >
                    <View style={styles.contentsLeft}>
                      <Text style={styles.contentsLeftText}>{index + 1}</Text>
                    </View>
                    <View style={styles.contentsCenter}>
                      <Text
                        style={styles.contentsCenterText1}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {content.name}
                      </Text>
                      <Text style={styles.contentsCenterText2}>
                        {content.duration}
                      </Text>
                    </View>
                    <View style={styles.contentsRight}>
                      <TouchableOpacity
                        style={styles.playBtn}
                        onPress={() => toggleModal(content, index)}
                      >
                        {!token ? (
                          <Image
                            source={require("../../../images/logo/lock.png")}
                            style={styles.lockBtnImg}
                          />
                        ) : (
                          <Image
                            source={require("../../../images/icons/play.png")}
                            style={styles.playBtnImg}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

              {content.length === 0 && !isLoading && (
                <View>
                  <Text
                    style={[
                      styles.labelContText,
                      {
                        fontSize: CalculateFontSize(1.5),
                        marginTop: "10%",
                        marginBottom: "20%",
                        alignSelf: "center",
                      },
                    ]}
                  >
                    No data
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <VideoModal
        content={content}
        modalVideoContent={modalVideoContent}
        selectedContent={selectedContent}
        selectedCategory={selectedCategory}
        modalVideoHandler={modalVideoHandler}
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />

      <CustomAlertMsgBox
        visible={upgradeCourseAlert}
        message={"Register for free to view this content"}
      />
    </View>
  );
}

export default LearningsScreen;

const styles = StyleSheet.create({
  scrollMainCont: {
    flex: 1,
    width: "100%",
  },
  topInfoCont: {
    height: 205,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: Colors.clr2,
    position: "relative",
    marginBottom: "14%",
  },
  topInfoContPic: {
    resizeMode: "cover",
    height: "100%",
    opacity: 0.3,
  },
  topInfoContLeft: {
    height: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    color: "white",
    fontSize: CalculateFontSize(2),
    textAlign: "left",
    marginBottom: 5,
    fontWeight: "400",
    width: 90,
  },
  text: {
    color: "white",
    fontSize: CalculateFontSize(2),
    textAlign: "left",
    marginBottom: 5,
    fontWeight: "400",
  },
  text1: {
    color: Colors.midWhite,
    fontSize: CalculateFontSize(3),
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 30,
  },
  picCont: {
    width: "155%",
    height: "140%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: -20,
    right: -22,
    transform: [{ rotate: "50deg" }],
  },
  pic: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
  },
  topInfoContFloat: {
    width: "85%",
    height: 60,
    justifyContent: "flex-end",
    position: "absolute",
    top: "83%",
    backgroundColor: Colors.transparentBg,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    overflow: "hidden",
  },

  topInfoContFloatTop: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "yellow",
  },

  topInfoContFloatTopSub: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  topInfoContFloatTopSubImg: {
    width: 15,
    height: 15,
    marginBottom: 7,
  },

  topInfoContFloatTopSubText: {
    fontSize: CalculateFontSize(1),
    fontWeight: "500",
    color: "#fff",
  },

  topInfoContFloatTopSubText2: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    marginBottom: 2,
    color: Colors.btnClr,
  },

  tickerCont: {
    width: "100%",
    height: 30,
    // backgroundColor: "red",
  },
  webV: {
    height: 5,
    backgroundColor: Colors.transparentBg,
    borderRadius: 10,
  },

  categoryCont: {
    height: 200,
    width: "100%",
    marginTop: "1%",
  },
  categoryHeadingCont: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  categoryHeadingSubCont: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  toggleContainer: {
    width: "auto",
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryHeadingText: {
    fontSize: CalculateFontSize(2.5),
    fontWeight: "500",
    color: Colors.clr4,
    paddingLeft: 10,
    marginBottom: "2%",
  },
  categorySubCont: {
    height: "100%",
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    // alignItems: "center",
    // backgroundColor: "red",
  },
  categories: {
    height: "100%",
    width: 170,
    marginLeft: 15,
    // backgroundColor: Colors.transparentBg,
    borderRadius: 10,
    borderColor: Colors.clr3,
    borderWidth: 0.5,
    overflow: "hidden",
  },

  categoriesPic: {
    resizeMode: "cover",
    height: "100%",
    opacity: 0.4,
  },

  categoriesTop: {
    height: "70%",
    width: "100%",
    justifyContent: "flex-end",
    paddingLeft: 10,
    paddingBottom: 10,
    // backgroundColor: "black",
    position: "relative",
  },

  categoriesTopText: {
    fontSize: CalculateFontSize(2.2),
    fontWeight: "500",
    color: "#fff",
  },

  categoriesBottom: {
    height: "30%",
    width: "100%",
    padding: 10,
    paddingLeft: 10,
    flexDirection: "row",
    // justifyContent: "center",
    backgroundColor: Colors.transparentBg,
  },

  categoriesBottomLeft: {
    width: 35,
    // backgroundColor: "blue",
  },

  categoriesBottomText1: {
    fontSize: CalculateFontSize(1.2),
    fontWeight: "500",
    color: "#fff",
  },

  categoriesBottomCenter: {
    width: 63,
    justifyContent: "center",
    // backgroundColor: "red",
  },

  categoriesBottomText2: {
    width: 70,
    fontSize: CalculateFontSize(1.4),
    fontWeight: "500",
    color: Colors.clr4,
  },

  categoriesBottomRight: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  viewBtn: {
    width: 35,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.clr4,
    borderRadius: 6,
    // padding: 15,
  },

  viewBtnText: {
    fontSize: CalculateFontSize(1.4),
    fontWeight: "700",
    color: "#000",
  },

  contentCont: {
    flex: 1,
    width: "100%",
    marginTop: "5%",
    // paddingBottom: 10,
  },
  contentHeadingSubCont: {
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  contentToDisplayText: {
    color: Colors.midWhite,
    fontSize: CalculateFontSize(1.6),
    fontWeight: "500",
    marginBottom: 4,
    marginLeft: 8,
  },
  contentHeadingText: {
    fontSize: CalculateFontSize(2.5),
    fontWeight: "500",
    color: Colors.clr4,
    paddingLeft: 10,
    marginBottom: "2%",
  },
  contentContMain: {
    width: "100%",
    height: 230,
    paddingBottom: 5,
  },
  scrollContentCont: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  contents: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: Colors.clr2,
    borderRadius: 10,
    // borderColor: Colors.clr3,
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
    backgroundColor: Colors.clr4,
    borderRadius: 50,
    // padding: 15,
  },

  playBtnImg: {
    width: 10,
    height: 10,
  },
  lockBtnImg: {
    width: 25,
    height: 25,
  },
  labelContText: {
    fontSize: CalculateFontSize(1.2),
    color: "#c9c8c7",
  },
});