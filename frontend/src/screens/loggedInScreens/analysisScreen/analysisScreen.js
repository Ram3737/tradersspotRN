import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
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
  StyleSheet,
} from "react-native";

import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import Colors from "../../../components/colors/colors";
import DonutChart from "../../../components/charts/donutChart";
import BlinkingDot from "../../../components/blinkingDot/blinkingDot";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import { AuthContext } from "../../../components/stores/context/authContextProvider";

import { Switch } from "react-native-switch";
import HapticFeedback from "react-native-haptic-feedback";
import { LinkPreview } from "@flyerhq/react-native-link-preview";

function AnalysisScreen() {
  const authCtx = useContext(AuthContext);
  const [contToDisplay, setContToDisplay] = useState(false);
  const [viewResult, setViewResult] = useState(0);
  const [analysisData, setAnalysisData] = useState([]);
  const [totalSwingAnalysis, setTotalSwingAnalysis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisStat, setAnalysisStat] = useState("swingAnalysisStats");
  const [refreshing, setRefreshing] = useState(false);

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

    setContToDisplay(!contToDisplay);
  };

  function getAllAnalysis() {
    setIsLoading(true);
    CallGetApiServices(
      `/analysis/getAll${
        contToDisplay ? "FreeSwing" : "Swing"
      }AnalysisUser?page=100`,
      (response) => {
        if (response.status === 200) {
          setAnalysisData(response.data.allSwingAnalyses);
          setTotalSwingAnalysis(response.data.totalSwingAnalysis);
          setIsLoading(false);
        }
      },
      (err) => {
        setIsLoading(false);
        console.log("err getting analysis screnn", err);
      }
    );
  }

  useEffect(() => {
    getAllAnalysis();
    contToDisplay
      ? setAnalysisStat("freeSwingAnalysisStats")
      : setAnalysisStat("swingAnalysisStats");
  }, [contToDisplay]);

  function viewResultHandler(index) {
    setViewResult(index);
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
          {analysisData.length > 0 &&
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
                        {totalSwingAnalysis || 0}
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
              <View>
                <Text style={styles.topContSubBottomSubText1}> No data</Text>
              </View>
            )}
        </View>
      </View>
      <View style={styles.analysisScrollCont}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Colors.clr4}
            style={{ marginTop: "60%" }}
          />
        )}
        {/* {analysisData.length > 0 && !isLoading && (
          <FlatList
            data={analysisData}
            renderItem={contToDisplay ? renderItemFree : renderItemPaid}
            keyExtractor={(item, index) => index.toString()}
            style={styles.analysisScrollContSub}
            inverted={true}
          />
        )} */}
        {analysisData.length === 0 && !isLoading && (
          <View>
            <Text
              style={[
                styles.topContSubBottomSubText1,
                { marginTop: "50%", alignSelf: "center" },
              ]}
            >
              No data
            </Text>
          </View>
        )}
      </View>
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
    width: "100%",
    padding: "3.5%",
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

  analysisScrollCont: {
    flex: 1,
    width: "100%",
    paddingTop: 15,
    marginTop: "2%",
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
});
