import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext, useEffect } from "react";

import WebView from "react-native-webview";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import VideoModal from "./components/videoModal";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import UserProfileModal from "../../../components/modal/userProfileModal";

//FOR FONT RESPONSIVE HEIGHT
const { height } = Dimensions.get("window");

const calculateFontSize = (percentage) => {
  return (height * percentage) / 100;
};

function MyCoursesScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);

  const [mainTopics, setMainTopics] = useState([
    {
      name: "BASICS",
      duration: `15:29 mins`,
      link: "basicsContent",
    },
    {
      name: "CORE",
      duration: `15:29 mins`,
      link: "coreContent",
    },
    {
      name: "INDICATORS",
      duration: `15:29 mins`,
      link: "indicatorsContent",
    },
    {
      name: "PATTERNS",
      duration: `15:29 mins`,
      link: "patternsContent",
    },
    {
      name: "STARTEGIES",
      duration: `15:29 mins`,
      link: "strategiesContent",
    },
    {
      name: "MANAGE RISK",
      duration: `15:29 mins`,
      link: "riskManagementContent",
    },
    {
      name: "BONUS",
      duration: `15:29 mins`,
      link: "bonusContent",
    },
  ]);

  const [allContent, setAllContent] = useState();
  const [content, setContent] = useState([]);
  const [modalVideoContent, setModalVideoContent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("BASICS");
  const [selectedContent, setSelectedContent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    setIsLoading(true);
    CallGetApiServices(
      `/course/getCourseContent`,
      (response) => {
        if (response.status === 200) {
          setAllContent(response.data);
          setContent(response.data.basicsContent);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        console.log("err getting allCourseContents", err);
      }
    );
  }, []);

  function modalVideoHandler(content, selectedContent) {
    setModalVideoContent(content);
    setSelectedContent(selectedContent);
  }

  const toggleModal = (content, selectedContent) => {
    setModalVisible(!isModalVisible);
    setModalVideoContent(content);
    setSelectedContent(selectedContent);
  };

  const closeModal = () => {
    setModalVideoContent(null);
    setModalVisible(!isModalVisible);
    setSelectedContent(selectedContent);
  };

  const toggleProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

  const closeProfileModal = () => {
    setIsProfileModalVisible(!isProfileModalVisible);
  };

  return (
    <View
      style={[
        CommonStyles.mainContainer,
        { padding: 0, justifyContent: "flex-start" },
      ]}
    >
      <ImageBackground
        source={require("../../../images/pictures/myCoursetopContBg.jpg")}
        style={styles.topInfoCont}
        imageStyle={styles.topInfoContPic}
      >
        <View style={styles.topInfoContLeft}>
          <Text style={styles.text}>Hey, Ashwin</Text>
          <Text style={styles.text1}>Good Day !</Text>
        </View>

        <View style={styles.topInfoContRight}>
          <ImageBackground
            source={require("../../../images/pictures/planetCourseTop.png")}
            style={styles.picCont}
            imageStyle={styles.pic}
          ></ImageBackground>
        </View>

        <View style={styles.topInfoContFloat}>
          <View style={styles.topInfoContFloatTop}>
            <View style={styles.topInfoContFloatTopSub}>
              <Image
                source={require("../../../images/icons/totalHours.png")}
                style={styles.topInfoContFloatTopSubImg}
              />
              <Text style={styles.topInfoContFloatTopSubText}>Total Hours</Text>
            </View>

            <View style={styles.topInfoContFloatTopSub}>
              <Image
                source={require("../../../images/icons/view.png")}
                style={styles.topInfoContFloatTopSubImg}
              />
              <Text style={[styles.topInfoContFloatTopSubText]}>
                Watched Hours
              </Text>
            </View>

            <TouchableOpacity
              style={styles.topInfoContFloatTopSub}
              onPress={() => toggleProfileModal()}
            >
              <Image
                source={require("../../../images/icons/user.png")}
                style={styles.topInfoContFloatTopSubImg}
              />
              <Text style={styles.topInfoContFloatTopSubText}>Profile</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={{ height: "36%" }}>
            <WebView style={styles.webV} source={{ html: tradingViewWidget }} />
          </View> */}
        </View>
      </ImageBackground>

      <View style={styles.tickerCont}>
        <WebView style={styles.webV} source={{ html: tradingViewWidget }} />
      </View>

      {/* <View style={styles.tabCont}>
        <TouchableOpacity
          style={[
            { backgroundColor: tab === "contents" ? Colors.clr3 : Colors.clr2 },
            styles.tab,
          ]}
          onPress={() => setTab("contents")}
        >
          <Text style={styles.tabText}>Contents</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            { backgroundColor: tab === "discuss" ? Colors.clr3 : Colors.clr2 },
            styles.tab,
          ]}
          onPress={() => setTab("discuss")}
        >
          <Text style={styles.tabText}>Discuss</Text>
        </TouchableOpacity>
      </View> */}

      <View style={styles.categoryCont}>
        <Text style={styles.categoryHeadingText}>Categories</Text>
        <ScrollView style={styles.categorySubCont} horizontal={true}>
          {mainTopics.map((topic, index) => (
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
                <View style={styles.categoriesBottomLeft}>
                  <Text style={styles.categoriesBottomText1}>Total Hours</Text>
                </View>
                <View style={styles.categoriesBottomCenter}>
                  <Text style={styles.categoriesBottomText2}>
                    {topic.duration}
                  </Text>
                </View>
                <View style={styles.categoriesBottomRight}>
                  <TouchableOpacity
                    style={styles.viewBtn}
                    onPress={() => {
                      setContent(allContent?.[topic.link] || []);
                      setSelectedCategory(topic.name);
                      setSelectedContent(0);
                    }}
                  >
                    <Text style={styles.viewBtnText}>view</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
      </View>

      <View style={styles.contentCont}>
        <Text style={styles.contentHeadingText}>Contents</Text>
        <ScrollView style={styles.contentSubCont}>
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
                    <Image
                      source={require("../../../images/icons/play.png")}
                      style={styles.playBtnImg}
                    />
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
                    fontSize: calculateFontSize(1.5),
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

      <VideoModal
        content={content}
        modalVideoContent={modalVideoContent}
        selectedContent={selectedContent}
        selectedCategory={selectedCategory}
        modalVideoHandler={modalVideoHandler}
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />

      <UserProfileModal
        closeModal={closeProfileModal}
        isModalVisible={isProfileModalVisible}
      />
    </View>
  );
}

export default MyCoursesScreen;

const styles = StyleSheet.create({
  topInfoCont: {
    height: "25%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: Colors.clr2,
    position: "relative",
  },
  topInfoContPic: {
    resizeMode: "cover",
    height: "100%",
    opacity: 0.5,
  },
  topInfoContLeft: {
    height: "100%",
    padding: 13,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1.3,
    // backgroundColor: "red",
  },
  topInfoContRight: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    // backgroundColor: "yellow",
    position: "relative",
    overflow: "hidden",
  },
  text: {
    color: "white",
    fontSize: calculateFontSize(2),
    textAlign: "left",
    marginBottom: 5,
    fontWeight: "400",
  },
  text1: {
    color: "white",
    fontSize: calculateFontSize(3),
    textAlign: "left",
    fontWeight: "500",
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
    height: "35%",
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
    fontSize: calculateFontSize(1),
    fontWeight: "500",
    color: "#fff",
  },

  tickerCont: {
    width: "100%",
    height: "5%",
    // backgroundColor: "red",
    marginTop: "16.5%",
  },
  webV: {
    height: 10,
    backgroundColor: Colors.transparentBg,
    borderRadius: 10,
  },

  categoryCont: {
    height: 200,
    width: "100%",
    marginTop: "7%",
    // backgroundColor: "red",
  },
  categoryHeadingText: {
    fontSize: calculateFontSize(2.5),
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
    fontSize: calculateFontSize(2.2),
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
    fontSize: calculateFontSize(1.2),
    fontWeight: "500",
    color: "#fff",
  },

  categoriesBottomCenter: {
    width: 63,
    justifyContent: "center",
    // backgroundColor: "red",
  },

  categoriesBottomText2: {
    fontSize: calculateFontSize(1.4),
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
    fontSize: calculateFontSize(1.4),
    fontWeight: "700",
    color: "#000",
  },

  contentCont: {
    flex: 1,
    width: "100%",
    marginTop: "7%",
    paddingBottom: 10,
    // backgroundColor: "red",
  },
  contentHeadingText: {
    fontSize: calculateFontSize(2.5),
    fontWeight: "500",
    color: Colors.clr4,
    paddingLeft: 10,
    marginBottom: "2%",
  },

  contentSubCont: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "column",
    // backgroundColor: "blue",
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
    fontSize: calculateFontSize(2.2),
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
    fontSize: calculateFontSize(2),
    fontWeight: "400",
    color: "#fff",
    marginBottom: 5,
  },
  contentsCenterText2: {
    fontSize: calculateFontSize(1.4),
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
  labelContText: {
    fontSize: calculateFontSize(1.2),
    color: "#c9c8c7",
  },
});
