import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  useContext,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { useNavigation } from "@react-navigation/native";

import { LinkPreview } from "@flyerhq/react-native-link-preview";
import MarqueeView from "react-native-marquee-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../../components/colors/colors";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import DonutChart from "../../../components/charts/donutChart";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import BlinkingDot from "../../../components/blinkingDot/blinkingDot";
import UserProfileModal from "../../../components/modal/userProfileModal";

function DashboardScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [analysisData, setAnalysisData] = useState([]);
  const [viewResult, setViewResult] = useState(false);
  const [barChartLabel, setBarChartLabel] = useState([]);
  const [barChartValue, setBarChartValue] = useState([]);
  const [stocksToWatch, setStocksToWatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const nm = await AsyncStorage.getItem("name");
      const convertedPaid = JSON.parse(pid);

      setToken(tkn);
      setName(nm);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  function loginrSignupHandler() {
    navigation.navigate("loginSignup");
  }

  function viewResultHandler(index) {
    setViewResult(!viewResult);
  }

  function getAllAnalysis() {
    setIsLoading(true);
    CallGetApiServices(
      `/analysis/free-swing-analysis/get-all-free-swing-analysis?page=1`,
      (response) => {
        if (response.status === 200) {
          setAnalysisData(response.data.allSwingAnalyses);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        console.log("err getting getallanalysis", err);
      }
    );
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const closeModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllAnalysis();
    authCtx.nullCall();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getAllAnalysis();
  }, []);

  return (
    <ScrollView
      style={styles.scrollMainContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressBackgroundColor={Colors.transparentBg}
          colors={[Colors.btnClr, Colors.clr4, Colors.clr5, Colors.clr3]}
        />
      }
    >
      <ImageBackground
        source={require("../../../images/pictures/bgDashboard.jpg")}
        style={styles.scrollMainContainerTop}
        imageStyle={styles.scrollMainContainerBg}
      >
        <View style={styles.headerCont}>
          <Text
            numberOfLines={1}
            style={styles.headerNameText}
            ellipsizeMode="tail"
          >
            Hi {name ? name : "there"}
          </Text>

          {token ? (
            <TouchableOpacity
              style={styles.userAvatar}
              onPress={() => toggleModal()}
            >
              <Image
                source={require("../../../images/icons/userAvatar.png")}
                style={{ width: 55, height: 55 }}
              />
            </TouchableOpacity>
          ) : (
            <ButtonComponent
              text={"Login/Signup"}
              style={{ paddingVertical: 5, paddingHorizontal: 5 }}
              fontStyle={{ fontSize: CalculateFontSize(1.8) }}
              handler={loginrSignupHandler}
            />
          )}
        </View>
        <Text style={styles.headingText}>
          Risk Reward stats - Free analysis
        </Text>
        <View style={styles.freeAnalysisCont}>
          <View style={styles.freeAnalysisContTop}>
            <View style={styles.freeAnalysisContTopLeft}>
              {authCtx.freeSwingAnalysisLoader && (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "20%" }}
                />
              )}
              {!authCtx.freeSwingAnalysisLoader && analysisData.length > 0 && (
                <>
                  <Text
                    style={[
                      styles.freeAnalysisContTopLeftText,
                      { marginBottom: 14 },
                    ]}
                  >
                    Overall Stats
                  </Text>
                  <DonutChart
                    top={"34%"}
                    left={"25%"}
                    series={[
                      authCtx.freeSwingAnalysisStats?.totalRisk > 0
                        ? authCtx.freeSwingAnalysisStats.totalRisk
                        : 10,
                      authCtx.freeSwingAnalysisStats.totalReward > 0
                        ? authCtx.freeSwingAnalysisStats.totalReward
                        : 50,
                    ]}
                    height={102}
                  />
                </>
              )}
              {!isLoading && analysisData.length === 0 && (
                <View>
                  <Text
                    style={[
                      styles.labelContText,
                      {
                        fontSize: CalculateFontSize(1.5),
                        marginBottom: "35%",
                        alignSelf: "center",
                      },
                    ]}
                  >
                    No data
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.freeAnalysisContTopRight}>
              <View style={styles.freeAnalysisContTopRightTop}>
                <Text style={styles.freeAnalysisContTopLeftText}>Overall</Text>
                <View style={styles.lineCont}>
                  <View style={styles.lineOut}>
                    <View
                      style={[
                        styles.lineIn1,
                        {
                          width: `${
                            authCtx.freeSwingAnalysisStats?.totalRisk
                              ? authCtx.freeSwingAnalysisStats?.totalRisk * 3 >
                                40
                                ? 40
                                : authCtx.freeSwingAnalysisStats?.totalRisk * 10
                              : 20
                          }%`,
                        },
                      ]}
                    >
                      <Text style={styles.lineIn1Text}>
                        {authCtx.freeSwingAnalysisStats?.totalRisk}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.lineIn2,
                        {
                          width: `${
                            authCtx.freeSwingAnalysisStats?.totalReward
                              ? authCtx.freeSwingAnalysisStats?.totalReward *
                                  3 >
                                60
                                ? 60
                                : authCtx.freeSwingAnalysisStats?.totalReward *
                                  10
                              : 80
                          }%`,
                        },
                      ]}
                    >
                      <Text style={styles.lineIn2Text}>
                        {authCtx.freeSwingAnalysisStats?.totalReward}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.freeAnalysisContTopRightBottom}>
                <Text style={styles.freeAnalysisContTopLeftText}>
                  Last month
                </Text>
                <View style={styles.lineCont}>
                  <View style={styles.lineOut}>
                    <View
                      style={[
                        styles.lineIn1,
                        {
                          width: `${
                            authCtx.freeSwingAnalysisStats?.totalRiskLastMonth
                              ? authCtx.freeSwingAnalysisStats
                                  ?.totalRiskLastMonth *
                                  3 >
                                40
                                ? 40
                                : authCtx.freeSwingAnalysisStats
                                    ?.totalRiskLastMonth * 10
                              : 20
                          }%`,
                        },
                      ]}
                    >
                      <Text style={styles.lineIn1Text}>
                        {authCtx.freeSwingAnalysisStats?.totalRiskLastMonth}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.lineIn2,
                        {
                          width: `${
                            authCtx.freeSwingAnalysisStats?.totalRewardLastMonth
                              ? authCtx.freeSwingAnalysisStats
                                  ?.totalRewardLastMonth *
                                  3 >
                                60
                                ? 60
                                : authCtx.freeSwingAnalysisStats
                                    ?.totalRewardLastMonth * 10
                              : 80
                          }%`,
                        },
                      ]}
                    >
                      <Text style={styles.lineIn2Text}>
                        {authCtx.freeSwingAnalysisStats?.totalRewardLastMonth}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.freeAnalysisContBottom}>
            <View style={styles.freeAnalysisContBottomSub}>
              <Text style={styles.freeAnalysisContBottomSubText}>
                Consider risking 1%(1000) of a 1 lakh capital on our analysis...
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.tickerContFloat}>
          <View style={[styles.freeAnalysisContBottomSubBottom]}>
            <View
              style={[
                styles.freeAnalysisContBottomSubBottomLeft,
                { justifyContent: "center" },
              ]}
            >
              <Text style={styles.rrText}>Risk is</Text>
              <View style={styles.freeAnalysisContBottomSubBottomLeftSub}>
                <Text style={styles.rrText1}>
                  {authCtx.freeSwingAnalysisStats?.totalRisk
                    ? authCtx.freeSwingAnalysisStats?.totalRisk * 1000
                    : 0}
                </Text>
              </View>
              <Text style={styles.rrText}>and the Reward is</Text>
              <View style={styles.freeAnalysisContBottomSubBottomLeftSub}>
                <Text style={[styles.rrText1, { color: "#00563b" }]}>
                  {authCtx.freeSwingAnalysisStats?.totalReward
                    ? authCtx.freeSwingAnalysisStats?.totalReward * 1000
                    : 0}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.paidAndFreeAnalysisCont}>
        <Text style={styles.headingTextPaidAndFree}>
          Risk Reward stats - Paid analysis
        </Text>
        <View style={styles.paidCont}>
          <View style={{ width: "100%", flexDirection: "row", height: 98 }}>
            <View style={[styles.paidContSub, { width: "25%" }]}>
              {authCtx.swingAnalysisLoader && (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "20%" }}
                />
              )}
              {!authCtx.swingAnalysisLoader &&
                authCtx.swingAnalysisStats?.totalRisk > 0 && (
                  <>
                    <DonutChart
                      top={"-95%"}
                      left={"25%"}
                      series={[
                        authCtx.swingAnalysisStats?.totalRisk > 0
                          ? authCtx.swingAnalysisStats.totalRisk
                          : 10,
                        authCtx.swingAnalysisStats.totalReward > 0
                          ? authCtx.swingAnalysisStats.totalReward
                          : 50,
                      ]}
                      height={55}
                    />

                    <Text style={styles.paidContSubText1}>{`${
                      authCtx.swingAnalysisStats?.totalRisk > 0
                        ? authCtx.swingAnalysisStats.totalRisk
                        : 0
                    }:${
                      authCtx.swingAnalysisStats.totalReward > 0
                        ? authCtx.swingAnalysisStats.totalReward
                        : 0
                    }`}</Text>
                  </>
                )}
              {!isLoading && analysisData.length === 0 && (
                <View>
                  <Text
                    style={[
                      styles.labelContText,
                      {
                        fontSize: CalculateFontSize(1.5),
                        marginTop: "30%",
                        alignSelf: "center",
                      },
                    ]}
                  >
                    No data
                  </Text>
                </View>
              )}
              <Text style={styles.paidContSubText2}>Overall</Text>
            </View>
            <View style={[styles.paidContSub, { width: "70%" }]}>
              <View style={styles.indicatorCont}>
                <View style={styles.indicatorContSub}>
                  <View style={styles.indicatorContSubOutlinedCircle}>
                    <View style={styles.indicatorContSubDot}></View>
                  </View>
                  <Text style={[styles.paidContSubText2, { marginTop: 0 }]}>
                    Breakout
                  </Text>
                </View>
                <View style={styles.indicatorContSub}>
                  <View style={styles.indicatorContSubOutlinedCircle}>
                    <View
                      style={[
                        styles.indicatorContSubDot,
                        { backgroundColor: "#FF5F1F" },
                      ]}
                    ></View>
                  </View>
                  <Text style={[styles.paidContSubText2, { marginTop: 0 }]}>
                    Trailing
                  </Text>
                </View>
              </View>
              {authCtx.swingAnalysisLoader ||
              authCtx.freeSwingAnalysisLoader ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "2%" }}
                />
              ) : (
                <MarqueeView
                  style={styles.marquee}
                  autoPlay={true}
                  speed={0.19}
                >
                  <View
                    style={{
                      width: authCtx.allBreakoutAnalyses.length * 50 || 200,
                      height: "100%",
                      flexDirection: "row",
                    }}
                  >
                    {authCtx.allBreakoutAnalyses.length > 0 &&
                      (!authCtx.swingAnalysisLoader ||
                        !authCtx.freeSwingAnalysisLoader) &&
                      authCtx.allBreakoutAnalyses.map((item, index) => {
                        return (
                          <View
                            style={[
                              styles.analysisSubBtns,
                              {
                                width: "auto",
                                flexDirection: "row",
                                paddingHorizontal: 5,
                                marginRight: 15,
                              },
                            ]}
                            key={item?._id || index}
                          >
                            <BlinkingDot
                              value={4}
                              color={item?.result?.breakout}
                            />
                            <Text
                              style={[
                                styles.analysisSubBtnsText,
                                { marginLeft: 3 },
                              ]}
                            >
                              {item?.analysis?.stockName}
                            </Text>
                          </View>
                        );
                      })}
                    {authCtx.allBreakoutAnalyses.length === 0 &&
                      (!authCtx.swingAnalysisLoader ||
                        !authCtx.freeSwingAnalysisLoader) && (
                        <Text
                          style={[
                            styles.labelContText,
                            {
                              fontSize: CalculateFontSize(1.5),
                              alignSelf: "center",
                            },
                          ]}
                        >
                          No data
                        </Text>
                      )}
                  </View>
                </MarqueeView>
              )}
              <Text style={styles.paidContSubText2}>Stocks to watch</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.headingTextPaidAndFree, { marginTop: "2%" }]}>
          Weekly Free analysis
        </Text>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={Colors.clr4}
            style={{ marginTop: "8%" }}
          />
        )}
        {analysisData.length > 0 && !isLoading && (
          <View style={styles.analysis}>
            <View style={styles.analysisSub}>
              <View style={styles.analysisSubBtns}>
                <Text style={styles.analysisSubBtnsText}>
                  {analysisData[0]?.analysis?.stockName}
                </Text>
              </View>

              <View style={[styles.analysisSubBtns, { marginLeft: 8 }]}>
                <Text style={styles.analysisSubBtnsText}>
                  {analysisData[0]?.analysis?.pattern}
                </Text>
              </View>

              <View style={{ marginLeft: "auto", alignSelf: "flex-start" }}>
                {analysisData[0].result?.breakout && (
                  <BlinkingDot color={analysisData[0].result?.breakout} />
                )}
              </View>
            </View>

            <LinkPreview
              enableAnimation={true}
              containerStyle={{
                // backgroundColor: "red",
                width: "95%",
              }}
              metadataContainerStyle={{
                display: "none",
              }}
              textContainerStyle={{
                // backgroundColor: "#fff",
                marginLeft: 0,
                marginTop: 0,
                marginBottom: 11,
              }}
              renderText={(text, props) => (
                <Text
                  {...props}
                  style={{
                    color: Colors.clr4,
                    fontSize: CalculateFontSize(1.5),
                    fontWeight: "400",
                  }}
                >
                  {text}
                </Text>
              )}
              text={analysisData[0]?.analysis.analysisLink}
            />
            <View style={styles.viewResultCont}>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => viewResultHandler()}
              >
                <Text style={styles.viewResultText}>View Result</Text>
              </TouchableOpacity>
            </View>
            {viewResult &&
              (analysisData[0]?.result.resultLink &&
              analysisData[0]?.result.resultLink !== "none" ? (
                <>
                  <Text style={styles.riskRewardText}>
                    {`${
                      analysisData[0]?.result?.reward === 0
                        ? "stoploss hit"
                        : `${analysisData[0]?.result.risk}:${analysisData[0]?.result.reward} RR`
                    }      ${
                      analysisData[0]?.result?.reward === 0
                        ? -analysisData[0]?.result?.percentage
                        : analysisData[0]?.result?.percentage
                    }%`}
                  </Text>

                  <LinkPreview
                    enableAnimation={true}
                    containerStyle={{
                      // backgroundColor: "red",
                      width: "95%",
                    }}
                    metadataContainerStyle={{
                      display: "none",
                    }}
                    textContainerStyle={{
                      // backgroundColor: "#fff",
                      marginLeft: 0,
                      marginTop: 8,
                      marginBottom: 11,
                    }}
                    renderText={(text, props) => (
                      <Text
                        {...props}
                        style={{
                          color: Colors.clr4,
                          fontSize: CalculateFontSize(1.5),
                          fontWeight: "400",
                        }}
                      >
                        {text}
                      </Text>
                    )}
                    text={analysisData[0]?.result.resultLink}
                  />
                </>
              ) : (
                <Text
                  style={[
                    styles.riskRewardText,
                    {
                      marginTop: -10,
                      marginLeft: 10,
                      fontSize: CalculateFontSize(1.2),
                    },
                  ]}
                >
                  {analysisData[0]?.result.resultLink == "none"
                    ? "No Result"
                    : "Not yet updated..."}
                </Text>
              ))}
          </View>
        )}
        {analysisData.length === 0 && !isLoading && (
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
      </View>
      {/* <Text style={{ color: "#fff" }}>dashboard Screen screen</Text>
      <ButtonComponent text={"login/signup"} handler={loginrSignupHandler} />
      <ButtonComponent text={"logout"} handler={authCtx.logout} /> */}
      <UserProfileModal
        closeModal={closeModal}
        isModalVisible={isModalVisible}
      />
    </ScrollView>
  );
}

export default DashboardScreen;

const styles = StyleSheet.create({
  scrollMainContainer: {
    width: "100%",
    backgroundColor: Colors.mainBgClr,
  },
  scrollMainContainerTop: {
    width: "100%",
    height: 350,
    position: "relative",
  },
  scrollMainContainerBg: {
    resizeMode: "cover",
    height: "100%",
    opacity: 0.15,
  },
  headerCont: {
    width: "100%",
    height: 50,
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: CalculateFontSize(2.3),
    fontWeight: "500",
    color: "#fff",
  },
  headerNameText: {
    width: 90,
    fontSize: CalculateFontSize(2.3),
    fontWeight: "500",
    color: "#fff",
  },
  headingText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "600",
    marginLeft: "5.5%",
    color: Colors.midWhite,
  },

  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderColor: Colors.transparentBg,
    borderWidth: 1,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.transparentBg,
  },
  freeAnalysisCont: {
    width: "90%",
    height: 255,
    top: "36%",
    position: "absolute",
    alignSelf: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 18,
    marginTop: 25,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    backgroundColor: Colors.transparentBg,
    justifyContent: "space-between",
  },
  freeAnalysisContTop: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
  },
  freeAnalysisContTopLeft: {
    height: "100%",
    flex: 0.8,
    paddingHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: Colors.clr2,
    // elevation: 8,
    // shadowColor: "#666",
    // shadowOpacity: 0.5,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 8,
  },
  freeAnalysisContTopLeftText: {
    fontSize: CalculateFontSize(1.4),
    fontWeight: "600",
    color: Colors.midWhite,
    marginBottom: 12,
  },
  freeAnalysisContTopRight: {
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
    marginLeft: 15,
    // backgroundColor: "aqua",
  },
  freeAnalysisContTopRightTop: {
    width: "100%",
    flex: 1,
    padding: 5,
    marginBottom: 7.5,
    borderRadius: 8,
    borderColor: Colors.clr3,
    borderWidth: 0.2,
    overflow: "hidden",
    backgroundColor: Colors.transparentBg,
  },
  freeAnalysisContTopRightBottom: {
    width: "100%",
    flex: 1,
    padding: 5,
    marginTop: 7.5,
    borderRadius: 8,
    borderColor: Colors.clr3,
    borderWidth: 0.2,
    overflow: "hidden",
    backgroundColor: Colors.transparentBg,
  },

  lineCont: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
    // backgroundColor: "yellow",
  },
  lineOut: {
    width: "100%",
    height: "35%",
    padding: "1%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    marginBottom: 5,
    // overflow: "hidden",
    backgroundColor: "#222",
  },
  lineIn1: {
    width: "20%",
    height: "80%",
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#b22222",
  },
  lineIn1Text: {
    position: "absolute",
    fontSize: CalculateFontSize(1.5),
    fontWeight: "500",
    bottom: 10,
    left: 1,
    color: "#b22222",
  },
  lineIn2: {
    width: "70%",
    height: "80%",
    borderRadius: 5,
    position: "relative",
    backgroundColor: "#00563b",
  },
  lineIn2Text: {
    position: "absolute",
    fontSize: CalculateFontSize(1.5),
    fontWeight: "500",
    bottom: 10,
    left: 1,
    color: "#00563b",
  },
  freeAnalysisContBottom: {
    width: "100%",
    flex: 0.6,
    marginTop: 15,
  },
  freeAnalysisContBottomSub: {
    width: "100%",
    height: "100%",
    padding: 5,
    justifyContent: "flex-start",
    borderRadius: 8,
    // backgroundColor: Colors.clr2,
  },
  freeAnalysisContBottomSubText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "400",
    marginTop: "1%",
    lineHeight: 19,
    color: Colors.midWhite,
  },
  freeAnalysisContBottomSubBottom: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "red",
  },
  freeAnalysisContBottomSubBottomLeft: {
    width: "100%",
    height: "100%",
    // padding: 5,
    paddingLeft: 0,
    // paddingHorizontal: 15,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "yellow",
  },

  freeAnalysisContBottomSubBottomLeftSub: {
    width: "auto",
    height: "70%",
    paddingVertical: 3,
    paddingHorizontal: 5,
    // marginLeft: "2%",
    // marginRight: "2%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 8,
    // backgroundColor: Colors.transparentBg,
  },
  rrText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "400",
    color: Colors.midWhite,
  },
  rrText1: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "700",
    color: "#b22222",
  },
  freeAnalysisContBottomSubBottomRight: {
    width: "45%",
    height: "100%",
    paddingVertical: 5,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  tickerContFloat: {
    width: "75%",
    height: 50,
    padding: 5,
    position: "absolute",
    bottom: "-23%",
    left: "13%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(30, 30, 30,1)",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    overflow: "hidden",
  },
  paidAndFreeAnalysisCont: {
    height: "auto",
    padding: 8,
    marginTop: "27%",
  },
  headingTextPaidAndFree: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "600",
    marginLeft: "3.2%",
    marginBottom: "4%",
    color: Colors.midWhite,
  },
  paidCont: {
    height: 103,
    width: "98%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginLeft: "1%",
    marginBottom: 25,
    marginTop: 3.2,
  },
  paidContSub: {
    height: "100%",
    width: 99,
    position: "relative",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.clr2,
    borderRadius: 8,
    padding: 6,
    marginRight: 15,
  },
  paidContSubText1: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "400",
    position: "absolute",
    top: "29.5%",
    left: "43%",
    lineHeight: 19,
    color: Colors.clr4,
  },
  paidContSubText2: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "500",
    marginTop: "1%",
    lineHeight: 19,
    color: Colors.midWhite,
  },

  marquee: {
    color: "#fff",
    width: "100%",
    height: 20,
    marginTop: "3%",
  },

  indicatorCont: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },

  indicatorContSub: {
    width: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  indicatorContSubOutlinedCircle: {
    width: 13,
    height: 13,
    borderRadius: 13 / 2,
    borderColor: "#666",
    borderWidth: 1,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  indicatorContSubDot: {
    width: 3,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#00ff0a",
  },
  analysis: {
    width: "95%",
    height: "auto",
    marginTop: 7,
    marginBottom: 20,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    // borderWidth: 0.5,
    borderColor: Colors.transparentBg,
    backgroundColor: Colors.transparentBg,
  },

  analysisSub: {
    height: 23,
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // backgroundColor: "red",
  },

  analysisSubBtns: {
    height: "98%",
    width: "auto",
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: Colors.clr3,
  },

  analysisSubBtnsText: {
    fontSize: CalculateFontSize(1.3),
    fontWeight: "600",
  },
  riskRewardText: {
    fontSize: CalculateFontSize(1.5),
    fontWeight: "200",
    color: "#fff",
    marginLeft: "2%",
    alignSelf: "flex-start",
  },
  viewResultCont: {
    width: "100%",
    flexDirection: "row",
    marginTop: "2%",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: "red",
  },
  playBtn: {
    marginRight: "2%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  viewResultText: {
    fontSize: CalculateFontSize(1.2),
    marginRight: "2%",
    color: Colors.clr4,
    // textDecorationLine: "underline",
  },
  lineChartContSub: {
    width: "100%",
    height: "76%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  lineContPaid: {
    width: 33,
    height: "100%",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  lineOutPaid: {
    width: 8,
    height: "65%",
    padding: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 5,
    marginTop: "20%",
    marginBottom: "20%",
    overflow: "hidden",
    backgroundColor: Colors.transparentBg,
  },
  lineIn: {
    width: "80%",
    height: "50%",
    borderRadius: 5,
    backgroundColor: Colors.clr3,
  },
  labelContText: {
    fontSize: CalculateFontSize(1.2),
    color: "#c9c8c7",
  },
});
