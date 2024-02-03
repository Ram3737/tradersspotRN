import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Vibration,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useState, useEffect, useContext, useCallback } from "react";

import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { Switch } from "react-native-switch";
import DonutChart from "../../../components/charts/donutChart";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import BlinkingDot from "../../../components/blinkingDot/blinkingDot";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import Colors from "../../../components/colors/colors";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function AnalysisStatsScreen() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const currentDate = new Date();
  const tabsArray = [
    "All",
    "Breakout",
    "Trailing",
    "Reward",
    "Stoploss",
    "Idle",
    "Nill",
  ];
  const [viewResult, setViewResult] = useState(0);
  const [contToDisplay, setContToDisplay] = useState(false);
  const [barChartValue, setBarChartValue] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewFilterCont, setViewFilterCont] = useState(false);
  const [filterTab, setFilterTab] = useState("All");
  const [breakout, setBreakOut] = useState(null);
  const [reward, setReward] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);
  const [resultLink, setResultLink] = useState(null);

  function getAllAnalysis() {
    setIsLoading(true);
    CallGetApiServices(
      `/analysis/getAll${
        contToDisplay ? "FreeSwing" : "Swing"
      }AnalysisUser?page=100&breakout=${breakout}&reward=${reward}&analysisLink=${analysisLink}&resultLink=${resultLink}`,
      (response) => {
        if (response.status === 200) {
          if (!contToDisplay) {
            const filteredData = response.data.allSwingAnalyses.filter(
              (data) => data.result.resultLink !== null
            );
            setAnalysisData(filteredData);
          } else {
            setAnalysisData(response.data.allSwingAnalyses);
          }
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        console.log("err getting getallanalysis", err);
      }
    );
  }

  useEffect(() => {
    getAllAnalysis();
    if (
      authCtx.freeSwingAnalysisStats.reversedMonthlyTotals &&
      authCtx.swingAnalysisStats.reversedMonthlyTotals
    ) {
      setBarChartValue(
        contToDisplay
          ? authCtx.freeSwingAnalysisStats?.reversedMonthlyTotals
          : authCtx.swingAnalysisStats?.reversedMonthlyTotals
      );
    }
  }, [contToDisplay, authCtx, breakout, reward, analysisLink, resultLink]);

  function viewResultHandler(index) {
    setViewResult(index);
  }

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
      if (!contToDisplay) {
        return;
      } else {
        setBreakOut("green");
        setReward(null);
        setAnalysisLink(null);
        setResultLink(null);
      }
    } else if (pressedTab === "Trailing") {
      if (!contToDisplay) {
        return;
      } else {
        setBreakOut("orange");
        setReward(null);
        setAnalysisLink(null);
        setResultLink(null);
      }
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
      console.log(11);
      if (!contToDisplay) {
        return;
      } else {
        setBreakOut(null);
        setReward(null);
        setAnalysisLink(1);
        setResultLink(null);
      }
    } else if (pressedTab === "Nill") {
      setBreakOut(null);
      setReward(null);
      setAnalysisLink(null);
      setResultLink(1);
    }
  }

  function upgradeBtnHandler() {
    navigation.navigate("courses");
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllAnalysis();
    authCtx.nullCall();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
        { justifyContent: "flex-start", padding: 0 },
      ]}
    >
      <View style={styles.statCont}>
        <View style={styles.statContTop}>
          <View style={styles.statContBottom}>
            <Text style={styles.statContTopText}>Last five months stats</Text>
            <Switch
              value={contToDisplay}
              onValueChange={toggleSwitch}
              disabled={false}
              activeText={"Paid"}
              inActiveText={"Free"}
              circleSize={17}
              barHeight={24}
              // circleBorderWidth={3}
              backgroundActive={Colors.transparentBg}
              backgroundInactive={Colors.transparentBg}
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
              switchWidthMultiplier={3.5} // multiplied by the `circleSize` prop to calculate total width of the Switch
              switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
            />
          </View>

          {isLoading && (
            <ActivityIndicator
              size="small"
              color={Colors.clr4}
              style={{ marginTop: "10%" }}
            />
          )}

          {analysisData.length > 0 &&
            !isLoading &&
            (!authCtx.swingAnalysisLoader ||
              !authCtx.freeSwingAnalysisLoader) && (
              <View style={styles.statContTop2}>
                <View style={{ width: "35%", height: "100%", marginTop: "1%" }}>
                  {analysisData.length > 0 &&
                    (!authCtx.swingAnalysisLoader ||
                      !authCtx.freeSwingAnalysisLoader) &&
                    !isLoading && (
                      <DonutChart
                        top={"36%"}
                        left={"24%"}
                        series={[
                          contToDisplay
                            ? authCtx.freeSwingAnalysisStats
                                ?.totalRiskLastFiveMonth > 0
                              ? authCtx.freeSwingAnalysisStats
                                  .totalRiskLastFiveMonth
                              : 10
                            : (authCtx.swingAnalysisStats
                                .totalRiskLastFiveMonth > 0
                                ? authCtx.swingAnalysisStats
                                    .totalRiskLastFiveMonth
                                : 10) || 10,
                          contToDisplay
                            ? authCtx.freeSwingAnalysisStats
                                .totalRewardLastFiveMonth > 0
                              ? authCtx.freeSwingAnalysisStats
                                  .totalRewardLastFiveMonth
                              : 50
                            : (authCtx.swingAnalysisStats
                                .totalRewardLastFiveMonth > 0
                                ? authCtx.swingAnalysisStats
                                    .totalRewardLastFiveMonth
                                : 30) || 50,
                        ]}
                      />
                    )}

                  {analysisData.length === 0 &&
                    (!authCtx.swingAnalysisLoader ||
                      !authCtx.freeSwingAnalysisLoader) &&
                    !isLoading && (
                      <View>
                        <Text
                          style={[
                            styles.labelContText,
                            {
                              fontSize: CalculateFontSize(1.8),
                              marginTop: "10%",
                              alignSelf: "center",
                            },
                          ]}
                        >
                          No data
                        </Text>
                      </View>
                    )}

                  {isLoading && (
                    <ActivityIndicator
                      size="small"
                      color={Colors.clr4}
                      style={{ marginTop: "40%" }}
                    />
                  )}
                </View>
                <View style={styles.lineChartCont}>
                  {(authCtx.swingAnalysisLoader ||
                    authCtx.freeSwingAnalysisLoader) &&
                  isLoading ? (
                    <ActivityIndicator
                      size="small"
                      color={Colors.clr4}
                      style={{ marginTop: "35%", marginRight: "50%" }}
                    />
                  ) : (
                    <View style={styles.lineChartContSub}>
                      {barChartValue.length > 0 ? (
                        barChartValue.map((item, index) => (
                          <View key={index} style={styles.lineCont}>
                            <Text
                              style={[styles.labelContText, { marginTop: 0 }]}
                            >
                              {`${item.risk}:${item.reward}`}
                            </Text>
                            <View style={styles.lineOut}>
                              <View
                                style={[
                                  styles.lineIn,
                                  {
                                    height: `${
                                      item.reward * 5 >= 100
                                        ? 100
                                        : item.reward * 5
                                    }%`,
                                  },
                                ]}
                              ></View>
                            </View>
                            <Text style={[styles.labelContText]}>
                              {item.month}
                            </Text>
                          </View>
                        ))
                      ) : (
                        <View>
                          <Text
                            style={[
                              styles.labelContText,
                              {
                                fontSize: CalculateFontSize(1.8),
                                marginTop: "30%",
                                alignSelf: "center",
                              },
                            ]}
                          >
                            No data
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
            )}

          {analysisData.length === 0 && !isLoading && (
            <View style={{ alignSelf: "center", marginTop: 50 }}>
              <Text
                style={[
                  styles.labelContText,
                  {
                    fontSize: CalculateFontSize(1.5),
                    color: "#b8b6b6",
                    // marginTop: "10%",
                    alignSelf: "center",
                  },
                ]}
              >
                No data
              </Text>
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

      <View style={styles.analysisScrollCont}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Colors.clr4}
            style={{ marginTop: "60%" }}
          />
        )}
        {!contToDisplay &&
        (filterTab === "Breakout" ||
          filterTab === "Trailing" ||
          filterTab === "Idle") ? (
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
          <>
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
                    styles.labelContText,
                    {
                      fontSize: CalculateFontSize(1.5),
                      color: "#b8b6b6",
                      // marginTop: "50%",
                      alignSelf: "center",
                    },
                  ]}
                >
                  No data
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </View>
  );
}

export default AnalysisStatsScreen;

const styles = StyleSheet.create({
  scrollMainContainer: {
    width: "100%",
  },
  statCont: {
    height: 200,
    width: "100%",
    padding: "3%",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: Colors.clr2,
  },
  statContTop: {
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
  },
  statContBottom: {
    width: "100%",
    marginBottom: "3%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  statContTopText: {
    fontSize: CalculateFontSize(2.1),
    fontWeight: "400",
    color: "#fff",
    marginBottom: "5%",
  },
  lineChartCont: {
    height: "75%",
    width: "65%",
    padding: 5,
    marginTop: "-3%",
    // backgroundColor: "red",
  },
  lineChartContSub: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  lineCont: {
    width: 33,
    height: "80%",
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  lineOut: {
    width: 12,
    height: "88%",
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
  statContTop2: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  filterCont: {
    width: "95%",
    height: "auto",
    marginTop: "2%",
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
  },

  analysisScrollContSub: {
    flex: 1,
    width: "100%",
  },
  analysis: {
    width: "95%",
    height: "auto",
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
