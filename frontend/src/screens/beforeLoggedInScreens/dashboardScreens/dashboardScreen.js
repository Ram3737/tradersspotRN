import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { LinkPreview } from "@flyerhq/react-native-link-preview";

import Colors from "../../../components/colors/colors";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import DonutChart from "../../../components/charts/donutChart";
import { CallGetApiServices } from "../../../webServices/apiCalls";

function DashboardScreen() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const [analysisData, setAnalysisData] = useState([]);
  const [viewResult, setViewResult] = useState(false);
  const [barChartLabel, setBarChartLabel] = useState([]);
  const [barChartValue, setBarChartValue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const lastFiveDaysDataIntraday =
    authCtx.intradayAnalysisStats.lastFiveDaysData;

  useEffect(() => {
    if (lastFiveDaysDataIntraday) {
      const days = Object.keys(lastFiveDaysDataIntraday);
      const riskRewards = days.map((day) => {
        return {
          risk: lastFiveDaysDataIntraday[day].risk,
          reward: lastFiveDaysDataIntraday[day].reward,
        };
      });
      setBarChartLabel(Object.keys(lastFiveDaysDataIntraday).reverse());
      setBarChartValue(riskRewards.reverse());
    }
  }, [lastFiveDaysDataIntraday]);

  function loginrSignupHandler() {
    navigation.navigate("loginSignup");
  }

  function viewResultHandler(index) {
    setViewResult(!viewResult);
  }

  function getAllAnalysis() {
    setIsLoading(true);
    CallGetApiServices(
      `/analysis/getAllFreeAnalysis?page=1`,
      (response) => {
        if (response.status === 200) {
          setAnalysisData(response.data);
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
  }, []);

  return (
    <ScrollView style={styles.scrollMainContainer}>
      <ImageBackground
        source={require("../../../images/pictures/bgDashboard.jpg")}
        style={styles.scrollMainContainerTop}
        imageStyle={styles.scrollMainContainerBg}
      >
        <View style={styles.headerCont}>
          <Text style={styles.headerText}>Hi there,</Text>
          <ButtonComponent
            text={"Login/Signup"}
            style={{ paddingVertical: 5, paddingHorizontal: 5 }}
            fontStyle={{ fontSize: CalculateFontSize(1.8) }}
            handler={loginrSignupHandler}
          />
        </View>
        <Text style={styles.headingText}>
          Risk Reward stats - Free analysis
        </Text>
        <View style={styles.freeAnalysisCont}>
          <View style={styles.freeAnalysisContTop}>
            <View style={styles.freeAnalysisContTopLeft}>
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
                series={[10, 50]}
                height={102}
              />
            </View>
            <View style={styles.freeAnalysisContTopRight}>
              <View style={styles.freeAnalysisContTopRightTop}>
                <Text style={styles.freeAnalysisContTopLeftText}>Overall</Text>
                <View style={styles.lineCont}>
                  <View style={styles.lineOut}>
                    <View style={styles.lineIn1}>
                      <Text style={styles.lineIn1Text}>1</Text>
                    </View>
                    <View style={styles.lineIn2}>
                      <Text style={styles.lineIn2Text}>7</Text>
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
                    <View style={styles.lineIn1}>
                      <Text style={styles.lineIn1Text}>3</Text>
                    </View>
                    <View style={styles.lineIn2}>
                      <Text style={styles.lineIn2Text}>12</Text>
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
                <Text style={styles.rrText1}>2000</Text>
              </View>
              <Text style={styles.rrText}>and the Reward is</Text>
              <View style={styles.freeAnalysisContBottomSubBottomLeftSub}>
                <Text style={[styles.rrText1, { color: "#00563b" }]}>
                  12,000
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
          <ScrollView horizontal={true}>
            <View style={styles.paidContSub}>
              {/*           <GaugeChart
                id="gauge-chart5"
                nrOfLevels={420}
                arcsLength={[0.3, 0.5, 0.2]}
                colors={["#5BE12C", "#F5CD19", "#EA4228"]}
                percent={0.37}
                arcPadding={0.02}
              /> */}
              <DonutChart
                top={"-95%"}
                left={"25%"}
                series={[10, 50]}
                height={55}
              />
              <Text style={styles.paidContSubText1}>1:2</Text>
              <Text style={styles.paidContSubText2}>Today's</Text>
            </View>
            <View style={styles.paidContSub}>
              <DonutChart
                top={"-95%"}
                left={"25%"}
                series={[10, 50]}
                height={55}
              />
              <Text style={styles.paidContSubText1}>1:2</Text>
              <Text style={styles.paidContSubText2}>Yesterday's</Text>
            </View>
            <View style={styles.paidContSub}>
              <DonutChart
                top={"-95%"}
                left={"25%"}
                series={[10, 50]}
                height={55}
              />
              <Text style={styles.paidContSubText1}>1:2</Text>
              <Text style={styles.paidContSubText2}>Last week</Text>
            </View>
            <View style={[styles.paidContSub, { width: 200 }]}>
              {authCtx.intradayAnalysisLoader || authCtx.freeAnalysisLoader ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "25%" }}
                />
              ) : (
                <View style={styles.lineChartContSub}>
                  {barChartLabel.length > 0 &&
                    barChartLabel.map((item, index) => (
                      <View key={index} style={styles.lineContPaid}>
                        <Text style={[styles.labelContText, { marginTop: 0 }]}>
                          {`${barChartValue[index].risk}:${barChartValue[index].reward}`}
                        </Text>
                        <View style={styles.lineOutPaid}>
                          <View
                            style={[
                              styles.lineIn,
                              { height: `${barChartValue[index].reward * 5}%` },
                            ]}
                          ></View>
                        </View>
                      </View>
                    ))}
                </View>
              )}
              <Text style={styles.paidContSubText2}>Last five days</Text>
            </View>
          </ScrollView>
        </View>
        <Text style={styles.headingTextPaidAndFree}>Today's Free analysis</Text>
        {analysisData.length > 0 && (
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
              analysisData[0]?.result.resultLink !== "none" &&
              analysisData[0]?.result.resultLink !== "sl" ? (
                <>
                  <Text
                    style={styles.riskRewardText}
                  >{`${analysisData[0]?.result.risk}:${analysisData[0]?.result.reward} RR`}</Text>

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
                    : analysisData[0]?.result.resultLink == "sl"
                    ? "Stoploss hit"
                    : "Not yet updated..."}
                </Text>
              ))}
          </View>
        )}
      </View>
      {/* <Text style={{ color: "#fff" }}>dashboard Screen screen</Text>
      <ButtonComponent text={"login/signup"} handler={loginrSignupHandler} />
      <ButtonComponent text={"logout"} handler={authCtx.logout} /> */}
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
  headingText: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "600",
    marginLeft: "5.5%",
    color: Colors.midWhite,
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
    padding: 10,
    marginTop: "27%",
  },
  headingTextPaidAndFree: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "600",
    marginLeft: "3.5%",
    marginBottom: "4%",
    color: Colors.midWhite,
  },
  paidCont: {
    height: 103,
    width: "100%",
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginBottom: 25,
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
    top: "27%",
    left: "45%",
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
