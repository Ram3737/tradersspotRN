import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
  useLayoutEffect,
} from "react";
import {
  View,
  Text,
  ScrollView,
  Vibration,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Alert,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import Colors from "../../../components/colors/colors";
import DonutChart from "../../../components/charts/donutChart";
import BlinkingDot from "../../../components/blinkingDot/blinkingDot";
import { CallGetApiServicesWithTkn } from "../../../webServices/apiCalls";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Switch } from "react-native-switch";
import HapticFeedback from "react-native-haptic-feedback";
import { LinkPreview } from "@flyerhq/react-native-link-preview";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function AnalysisScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const tabsArray = [
    "All",
    "Breakout",
    "Trailing",
    "Reward",
    "Stoploss",
    "Idle",
    "Nill",
  ];
  const [contToDisplay, setContToDisplay] = useState(false);
  const [viewResult, setViewResult] = useState(0);
  const [analysisData, setAnalysisData] = useState([]);
  const [totalSwingAnalysis, setTotalSwingAnalysis] = useState([]);
  const [wholeTotalSwingAnalysis, setWholeTotalSwingAnalysis] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStat, setAnalysisStat] = useState("swingAnalysisStats");
  const [refreshing, setRefreshing] = useState(false);
  const [paid, setPaid] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const [viewFilterCont, setViewFilterCont] = useState(false);
  const [filterTab, setFilterTab] = useState("All");
  const [breakout, setBreakOut] = useState(null);
  const [reward, setReward] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);
  const [resultLink, setResultLink] = useState(null);
  const [token, setToken] = useState(null);

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const uType = await AsyncStorage.getItem("userType");
      const convertedPaid = JSON.parse(pid);

      setPaid(convertedPaid);
      setCourseType(cType);
      setToken(tkn);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  const toggleSwitch = () => {
    if (Platform.OS === "ios") {
      const options = {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      };
      HapticFeedback.trigger("impactLight", options);
    } else if (Platform.OS === "android") {
      Vibration.vibrate(50);
    }

    setFilterTab("All");
    setBreakOut(null);
    setReward(null);
    setAnalysisLink(null);
    setResultLink(null);
    setViewFilterCont(false);
    setContToDisplay(!contToDisplay);
  };

  function getAllAnalysis() {
    if (!token) {
      return;
    }

    setIsLoading(true);
    CallGetApiServicesWithTkn(
      `/analysis/${
        contToDisplay
          ? "free-swing-analysis/get-all-free-swing-analysis-user"
          : "swing-analysis/get-all-swing-analysis-user"
      }?page=100&breakout=${breakout}&reward=${reward}&analysisLink=${analysisLink}&resultLink=${resultLink}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 200) {
          console.log("hii", response.data);
          setAnalysisData(response.data.allSwingAnalyses);
          setTotalSwingAnalysis(response.data.totalSwingAnalysis);
          setWholeTotalSwingAnalysis(response.data.wholeTotalSwingAnalysis);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        Alert.alert("Error", "Error getting analysis");
        console.log("err getting analysis screnn", err);
      }
    );
  }

  useEffect(() => {
    getAllAnalysis();
    contToDisplay
      ? setAnalysisStat("freeSwingAnalysisStats")
      : setAnalysisStat("swingAnalysisStats");
  }, [contToDisplay, breakout, reward, analysisLink, resultLink, token]);

  function viewResultHandler(index) {
    setViewResult(index);
  }

  function viewFilterTabHandler() {
    setViewFilterCont(!viewFilterCont);
    setBreakOut(null);
    setReward(null);
    setAnalysisLink(null);
    setResultLink(null);
    setFilterTab("All");
  }

  function tabPressHandler(pressedTab) {
    setFilterTab(pressedTab);
    if (pressedTab === "All") {
      setBreakOut(null);
      setReward(null);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Breakout") {
      setBreakOut("green");
      setReward(null);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Trailing") {
      setBreakOut("orange");
      setReward(null);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Reward") {
      setBreakOut(null);
      setReward(1);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Stoploss") {
      setBreakOut(null);
      setReward(0);
      setAnalysisLink(null);
      setResultLink(null);
    } else if (pressedTab === "Idle") {
      setBreakOut(null);
      setReward(null);
      setAnalysisLink(1);
      setResultLink(null);
    } else if (pressedTab === "Nill") {
      setBreakOut(null);
      setReward(null);
      setAnalysisLink(null);
      setResultLink(1);
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllAnalysis();
    authCtx.nullCall();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  function upgradeBtnHandler() {
    navigation.navigate("Upgrade");
  }

  const renderItemPaid = ({ item, index }) => (
    <View key={index} style={styles.analysis}>
      <View style={styles.analysisSub}>
        <View style={styles.analysisSubBtns}>
          <Text style={styles.analysisSubBtnsText}>
            {item?.analysis?.stockName}
          </Text>
        </View>

        <View style={[styles.analysisSubBtns, { marginLeft: 8 }]}>
          <Text style={styles.analysisSubBtnsText}>
            {item?.analysis?.pattern}
          </Text>
        </View>

        <View style={{ marginLeft: "auto", alignSelf: "flex-start" }}>
          {item.result?.breakout && (
            <BlinkingDot color={item.result.breakout} />
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
        text={item.analysis.analysisLink}
      />
      <View style={styles.viewResultCont}>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => viewResultHandler(index)}
        >
          <Text style={styles.viewResultText}>View Result</Text>
        </TouchableOpacity>
      </View>
      {viewResult === index &&
        (item.result.resultLink && item.result.resultLink !== "none" ? (
          <>
            <Text style={styles.riskRewardText}>
              {`${
                item.result?.reward === 0
                  ? "stoploss hit"
                  : `${item.result.risk}:${item.result.reward} RR`
              }    ${
                item.result?.reward === 0
                  ? -item.result?.percentage
                  : item.result?.percentage
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
              text={item.result.resultLink}
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
            {item.result.resultLink == "none"
              ? "No Result"
              : "Not yet updated..."}
          </Text>
        ))}
    </View>
  );

  const renderItemFree = ({ item, index }) => (
    <View key={index} style={styles.analysis}>
      <View style={styles.analysisSub}>
        <View style={styles.analysisSubBtns}>
          <Text style={styles.analysisSubBtnsText}>
            {item?.analysis?.stockName}
          </Text>
        </View>

        <View style={[styles.analysisSubBtns, { marginLeft: 8 }]}>
          <Text style={styles.analysisSubBtnsText}>
            {item?.analysis?.pattern}
          </Text>
        </View>

        <View style={{ marginLeft: "auto", alignSelf: "flex-start" }}>
          {item.result?.breakout && (
            <BlinkingDot color={item.result.breakout} />
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
        text={item.analysis.analysisLink}
      />
      <View style={styles.viewResultCont}>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => viewResultHandler(index)}
        >
          <Text style={styles.viewResultText}>View Result</Text>
        </TouchableOpacity>
      </View>
      {viewResult === index &&
        (item.result.resultLink && item.result.resultLink !== "none" ? (
          <>
            <Text style={styles.riskRewardText}>
              {`${
                item.result?.reward === 0
                  ? "stoploss hit"
                  : `${item.result.risk}:${item.result.reward} RR`
              }      ${
                item.result?.reward === 0
                  ? -item.result?.percentage
                  : item.result?.percentage
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
              text={item.result.resultLink}
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
            {item.result.resultLink == "none"
              ? "No Result"
              : "Not yet updated..."}
          </Text>
        ))}
    </View>
  );

  return (
    <View
      style={[
        CommonStyles.mainContainer,
        { padding: 0, justifyContent: "flex-start" },
      ]}
    >
      <View style={styles.topCont}>
        <View style={styles.topContSub}>
          <View style={styles.topContSubTop}>
            <Text style={styles.headingText}>Swing Stats</Text>
            <View style={styles.toggleContainer}>
              <Switch
                value={contToDisplay}
                onValueChange={toggleSwitch}
                disabled={false}
                activeText={"swing"}
                inActiveText={"free"}
                circleSize={17}
                barHeight={24}
                // circleBorderWidth={3}
                backgroundActive={Colors.clr2}
                backgroundInactive={Colors.clr2}
                circleActiveColor={Colors.btnClr}
                circleInActiveColor={Colors.btnClr}
                // renderInsideCircle={} // custom component to render inside the Switch circle (Text, Image, etc.)
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{}} // style for outer animated circle
                renderActiveText={true}
                renderInActiveText={true}
                switchLeftPx={10} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={10} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={contToDisplay ? 4.2 : 3.8} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          </View>
          {isLoading && (
            <ActivityIndicator
              size="small"
              color={Colors.clr4}
              style={{ marginTop: "18%" }}
            />
          )}
          {analysisData.length >= 0 &&
            (!authCtx.swingAnalysisLoader ||
              !authCtx.freeSwingAnalysisLoader) &&
            !isLoading && (
              <View style={styles.topContSubBottom}>
                {authCtx.swingAnalysisStats && (
                  <DonutChart
                    top={"35%"}
                    left={"20%"}
                    marginTop={"8%"}
                    series={[
                      contToDisplay
                        ? authCtx.freeSwingAnalysisStats?.totalRisk > 0
                          ? authCtx.freeSwingAnalysisStats.totalRisk
                          : 10
                        : (authCtx.swingAnalysisStats.totalRisk > 0
                            ? authCtx.swingAnalysisStats.totalRisk
                            : 10) || 10,
                      contToDisplay
                        ? authCtx.freeSwingAnalysisStats.totalReward > 0
                          ? authCtx.freeSwingAnalysisStats.totalReward
                          : 50
                        : (authCtx.swingAnalysisStats.totalReward > 0
                            ? authCtx.swingAnalysisStats.totalReward
                            : 30) || 50,
                    ]}
                  />
                )}
                <View style={styles.topContSubBottomSub}>
                  {authCtx.swingAnalysisLoader ? (
                    <ActivityIndicator
                      size="small"
                      color={Colors.clr4}
                      style={{ marginTop: "25%", marginRight: "30%" }}
                    />
                  ) : (
                    <>
                      <Text style={styles.topContSubBottomSubText1}>
                        Total analysis shared:
                      </Text>
                      <Text style={styles.topContSubBottomSubText2}>
                        {wholeTotalSwingAnalysis
                          ? wholeTotalSwingAnalysis
                          : totalSwingAnalysis
                          ? totalSwingAnalysis
                          : 0}
                      </Text>
                      <View style={styles.riskRewardStatMainCont}>
                        {authCtx[analysisStat] && (
                          <ScrollView
                            style={{
                              width: "100%",
                            }}
                            horizontal={true}
                          >
                            <View style={styles.riskRewardStatCont}>
                              <Text style={styles.rrContSubBottomSubText1}>
                                Last month
                              </Text>
                              <Text
                                style={styles.rrContSubBottomSubText2}
                              >{`${authCtx[analysisStat].totalRiskLastMonth}:${authCtx[analysisStat].totalRewardLastMonth}`}</Text>
                            </View>
                            <View style={styles.riskRewardStatCont}>
                              <Text style={styles.rrContSubBottomSubText1}>
                                Five months
                              </Text>
                              <Text
                                style={styles.rrContSubBottomSubText2}
                              >{`${authCtx[analysisStat].totalRiskLastFiveMonth}:${authCtx[analysisStat].totalRewardLastFiveMonth}`}</Text>
                            </View>
                            <View style={styles.riskRewardStatCont}>
                              <Text style={styles.rrContSubBottomSubText1}>
                                Last year
                              </Text>
                              <Text
                                style={styles.rrContSubBottomSubText2}
                              >{`${authCtx[analysisStat].totalRiskLastYear}:${authCtx[analysisStat].totalRewardLastYear}`}</Text>
                            </View>
                            <View style={styles.riskRewardStatCont}>
                              <Text style={styles.rrContSubBottomSubText1}>
                                Overall
                              </Text>
                              <Text
                                style={styles.rrContSubBottomSubText2}
                              >{`${authCtx[analysisStat].totalRisk}:${authCtx[analysisStat].totalReward}`}</Text>
                            </View>
                          </ScrollView>
                        )}
                      </View>
                    </>
                  )}
                </View>
              </View>
            )}
          {analysisData.length === 0 &&
            (!authCtx.swingAnalysisLoader ||
              !authCtx.freeSwingAnalysisLoader) &&
            !isLoading && (
              <View style={{ alignSelf: "center", marginTop: 50 }}>
                <Text style={styles.topContSubBottomSubText1}> No data</Text>
              </View>
            )}
        </View>
      </View>
      <View style={styles.filterCont}>
        <MaterialIcons
          name={"filter-list"}
          size={25}
          color={Colors.btnClr}
          onPress={viewFilterTabHandler}
        />
        {viewFilterCont && (
          <View style={styles.tabCont}>
            <ScrollView style={styles.tabSubCont} horizontal={true}>
              {tabsArray.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tab,
                    {
                      backgroundColor:
                        filterTab === tab ? Colors.clr4 : "transparent",
                    },
                  ]}
                  onPress={() => tabPressHandler(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: filterTab === tab ? "#000" : "#fff",
                        fontWeight: filterTab === tab ? "500" : "300",
                      },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      {courseType === "basic" && paid && !contToDisplay ? (
        <View style={styles.upgradeBtnMainCont}>
          <View style={styles.upgradeBtnCont}>
            <Text style={styles.upgradeBtnContText}>
              Upgrade to "STANDARD" plan to access our high potential swing
              analysis. You can view free analysis stats.
            </Text>
            <ButtonComponent
              text={"Upgrade"}
              style={{ alignSelf: "center" }}
              handler={upgradeBtnHandler}
            />
          </View>
        </View>
      ) : (
        <View style={styles.analysisScrollCont}>
          {isLoading && (
            <ActivityIndicator
              size="large"
              color={Colors.clr4}
              style={{ marginTop: "60%" }}
            />
          )}
          {analysisData.length > 0 && !isLoading && (
            <FlatList
              data={analysisData}
              renderItem={contToDisplay ? renderItemFree : renderItemPaid}
              keyExtractor={(item, index) => index.toString()}
              style={styles.analysisScrollContSub}
              inverted={true}
            />
          )}
          {analysisData.length === 0 && !isLoading && (
            <View style={styles.noDataCont}>
              <Text
                style={[
                  styles.topContSubBottomSubText1,
                  { alignSelf: "center" },
                ]}
              >
                No data
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

export default AnalysisScreen;

const styles = StyleSheet.create({
  scrollMainContainer: {
    width: "100%",
  },
  topCont: {
    height: 210,
    width: "95%",
    paddingVertical: "3.5%",
    // backgroundColor: "red",
  },

  topContSub: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    borderRadius: 10,
    padding: "3%",
    paddingTop: "4%",
    paddingBottom: "4%",
    overflow: "hidden",
    borderColor: Colors.clr5,
    borderWidth: 0.5,
    backgroundColor: Colors.transparentBg,
  },

  topContSubTop: {
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },

  headingText: {
    fontSize: CalculateFontSize(2.3),
    fontWeight: "500",
    color: "#fff",
    marginBottom: "2%",
  },

  toggleContainer: {
    flexDirection: "row",
    // alignItems: "center",
  },

  topContSubBottom: {
    width: "100%",
    height: "80%",
    flexDirection: "row",
    // backgroundColor: "red",
  },

  topContSubBottomSub: {
    width: "60%",
    height: "100%",
    paddingTop: "3%",
    paddingLeft: "1%",
    // marginTop: 5,
    justifyContent: "center",
    // backgroundColor: "yellow",
  },

  topContSubBottomSubText1: {
    fontSize: CalculateFontSize(1.5),
    color: "#b8b6b6",
    fontWeight: "400",
    marginBottom: "1%",
  },

  topContSubBottomSubText2: {
    fontSize: CalculateFontSize(2.3),
    color: Colors.clr4,
    fontWeight: "600",
  },

  rrContSubBottomSubText1: {
    fontSize: CalculateFontSize(1.2),
    color: "#b8b6b6",
    fontWeight: "400",
    marginBottom: "2%",
  },

  rrContSubBottomSubText2: {
    fontSize: CalculateFontSize(1.8),
    color: Colors.clr4,
    fontWeight: "500",
  },

  filterCont: {
    width: "94%",
    height: "auto",
    // marginTop: "2%",
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "blue",
  },
  tabCont: {
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  tabSubCont: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "red",
  },
  tab: {
    width: "auto",
    height: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: Colors.clr5,
    borderWidth: 0.8,
    marginRight: 10,
  },

  tabText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "300",
    color: "#fff",
  },

  analysisScrollCont: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    marginTop: "1%",
    borderRadius: 20,
    // overflow: "hidden",
    // backgroundColor: Colors.clr2,
  },

  analysisScrollContSub: {
    flex: 1,
    width: "100%",
    // overflow: "hidden",
    // backgroundColor: Colors.clr2,
  },

  riskRewardStatMainCont: {
    marginTop: 11,
    marginBottom: 5,
    borderColor: Colors.clr3,
    borderWidth: 0.3,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    marginRight: "-7%",
    paddingLeft: 5,
    paddingRight: 12,
    height: 50,
  },

  riskRewardStatCont: {
    height: "100%",
    width: 70,
    paddingLeft: 10,
    marginRight: 5,
    justifyContent: "center",
  },

  analysis: {
    width: "95%",
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
  upgradeBtnMainCont: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  upgradeBtnCont: {
    width: "90%",
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: Colors.transparentBg,
  },
  upgradeBtnContText: {
    width: "100%",
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 30,
    color: Colors.midWhite,
  },
  noDataCont: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
});
