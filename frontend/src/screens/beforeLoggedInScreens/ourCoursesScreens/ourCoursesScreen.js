import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
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
import Carousel, { Pagination } from "react-native-snap-carousel";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CustomAlertBox from "../../../components/customAlertBox/customAlertBox";
import { CallPatchApiServices } from "../../../webServices/apiCalls";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import CourseDetailsModal from "../../../components/modal/courseDetailsModal";

const SLIDER_WIDTH = Dimensions.get("window").width + 80;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

function OurCoursesScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [tab, setTab] = useState(0);
  const [paidStatus, setPaidStatus] = useState(false);
  const [courseTypeFromRes, setCourseTypeFromRes] = useState("none");
  const [courseAmount, setCourseAmount] = useState("6499.00");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedCourse, setselectedCourse] = useState("basic");
  const [paid, setPaid] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const isCarousel = useRef(null);

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const uType = await AsyncStorage.getItem("userType");
      const convertedPaid = JSON.parse(pid);

      setPaid(convertedPaid);
      setCourseType(cType);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

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

  function openCourseDetailModal() {
    setModalVisible(true);
  }
  function closeCourseDetailModal() {
    setModalVisible(false);
  }

  function getThisCourseHandler(course) {
    setselectedCourse(course);
    authCtx.setUserSelectedCourse(course);
    openCourseDetailModal();
  }

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
                ? "₹ 4,999"
                : tab === 1
                ? "₹ 7,999"
                : tab === 2
                ? "₹ 12,999"
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
                ? "₹ 4,999"
                : tab === 1
                ? "₹ 7,999"
                : tab === 2
                ? "₹ 12,999"
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
                ? "₹ 4,999"
                : tab === 1
                ? "₹ 7,999"
                : tab === 2
                ? "₹ 12,999"
                : ""}
            </Text>
          </ImageBackground>
        ) : (
          ""
        )}
        {tab === 0 ? (
          <>
            <Text style={[styles.planSubText]}>
              PRICE ACTION - THE COMPLETE COURSE
            </Text>
            <View style={styles.featuresCont}>
              <Text style={styles.featureText}>
                Access to 14hours of technical course content
              </Text>
              <Text style={styles.featureText}>
                Access to weekly free analysis stats
              </Text>

              <Text style={styles.featureText}>
                1 month unlimited course access
              </Text>
              <Text style={styles.featureText}> Any time doubt clearence</Text>

              <TouchableOpacity
                onPress={() => {
                  getThisCourseHandler(
                    tab === 0
                      ? "basic"
                      : tab === 1
                      ? "standard"
                      : tab === 2
                      ? "pro"
                      : ""
                  );
                }}
              >
                <Text
                  style={[
                    styles.featureText,
                    { textDecorationLine: "underline", color: Colors.clr4 },
                  ]}
                >
                  View more
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : tab === 1 ? (
          <>
            <Text style={[styles.planSubText]}>
              DOMINATE MARKETS: MASTER PRICE ACTION WITH STOCK ANALYSIS
            </Text>
            <View style={styles.featuresCont}>
              <Text style={styles.featureText}>
                Access to 14hours of technical course content
              </Text>
              <Text style={styles.featureText}>
                Access to potential stock analysis - 6/week
              </Text>

              <Text style={styles.featureText}>
                3 months unlimited course access
              </Text>
              <Text style={styles.featureText}> Any time doubt clearence</Text>

              <TouchableOpacity
                onPress={() => {
                  getThisCourseHandler(
                    tab === 0
                      ? "basic"
                      : tab === 1
                      ? "standard"
                      : tab === 2
                      ? "pro"
                      : ""
                  );
                }}
              >
                <Text
                  style={[
                    styles.featureText,
                    { textDecorationLine: "underline", color: Colors.clr4 },
                  ]}
                >
                  View more
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : tab === 2 ? (
          <>
            <Text style={[styles.planSubText]}>
              SYNERGIZING PRICE ACTION WITH FUNDAMENTALS FOR MARKET MASTERY
            </Text>
            <View style={styles.featuresCont}>
              <Text style={styles.featureText}>
                Access to 3hours of fundamental course content
              </Text>
              <Text style={styles.featureText}>
                Access to 14hours of technical course content
              </Text>
              <Text style={styles.featureText}>
                1 year unlimited access to everything
              </Text>
              <Text style={styles.featureText}> 1 -1 doubt clearence</Text>

              <TouchableOpacity
                onPress={() => {
                  getThisCourseHandler(
                    tab === 0
                      ? "basic"
                      : tab === 1
                      ? "standard"
                      : tab === 2
                      ? "pro"
                      : ""
                  );
                }}
              >
                <Text
                  style={[
                    styles.featureText,
                    { textDecorationLine: "underline", color: Colors.clr4 },
                  ]}
                >
                  View more
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <></>
        )}
        <View style={styles.btnCont}>
          {tab === 0 && (
            <ButtonComponent
              text={
                courseType === "basic" && paid
                  ? "Your current course"
                  : "Get this course"
              }
              disabled={courseType === "basic" && paid}
              handler={() => {
                getThisCourseHandler("basic");
              }}
            />
          )}
          {tab === 1 && (
            <ButtonComponent
              text={
                courseType === "standard" && paid
                  ? "Your current course"
                  : "Get this course"
              }
              disabled={courseType === "standard" && paid}
              handler={() => {
                getThisCourseHandler("standard");
              }}
            />
          )}
          {tab === 2 && (
            <ButtonComponent
              text={
                courseType === "pro" && paid
                  ? "Your current course"
                  : "Get this course"
              }
              disabled={courseType === "pro" && paid}
              handler={() => {
                getThisCourseHandler("pro");
              }}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      style={styles.scrollMainContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[CommonStyles.mainContainer, { justifyContent: "flex-start" }]}
      >
        <View style={{ height: "90%", marginTop: "8%" }}>
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

        {/* <Text style={styles.SwipeText}>Swipe up for course contents</Text> */}
        <CourseDetailsModal
          isModalVisible={isModalVisible}
          closeModal={closeCourseDetailModal}
          course={selectedCourse}
          courseAmount={courseAmount}
          tab={tab}
        />
      </View>
    </ScrollView>
  );
}

export default OurCoursesScreen;

const styles = StyleSheet.create({
  scrollMainContainer: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    backgroundColor: Colors.mainBgClr,
  },
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
  planSubText: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "500",
    alignSelf: "center",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
    color: Colors.clr4,
  },
  priceText: {
    fontSize: CalculateFontSize(5),
    fontWeight: "700",
    marginTop: 15,
    color: Colors.btnClr,
  },

  featuresCont: {
    width: "100%",
    height: "auto",
    marginTop: "10%",
    alignItems: "center",
    textAlign: "center",
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

  headingText: {
    fontSize: CalculateFontSize(3),
    fontWeight: "600",
    alignSelf: "center",
    color: Colors.clr4,
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
