import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Vibration } from "react-native";

import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import Colors from "../../../components/colors/colors";
import DonutChart from "../../../components/charts/donutChart";

import { Switch } from "react-native-switch";
import HapticFeedback from "react-native-haptic-feedback";
import { LinkPreview } from "@flyerhq/react-native-link-preview";

function AnalysisScreen() {
  const analysisArr = [1, 2, 3, 4];

  const [contToDisplay, setContToDisplay] = useState(false);

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
            <Text style={styles.headingText}>Intraday Stats</Text>
            <View style={styles.toggleContainer}>
              <Switch
                value={contToDisplay}
                onValueChange={toggleSwitch}
                disabled={false}
                activeText={"intraday"}
                inActiveText={"swing"}
                circleSize={19}
                barHeight={28}
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
                switchWidthMultiplier={contToDisplay ? 4.5 : 3.8} // multiplied by the `circleSize` prop to calculate total width of the Switch
                switchBorderRadius={30} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
              />
            </View>
          </View>
          <View style={styles.topContSubBottom}>
            <DonutChart />
            <View style={styles.topContSubBottomSub}>
              <Text style={styles.topContSubBottomSubText1}>
                Total analysis shared:
              </Text>
              <Text style={styles.topContSubBottomSubText2}>2146</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.analysisScrollCont}>
        <ScrollView style={styles.analysisScrollContSub}>
          {analysisArr.map((analysis, index) => (
            <View key={index} style={styles.analysis}>
              <View style={styles.analysisSub}>
                <View style={styles.analysisSubBtns}>
                  <Text style={styles.analysisSubBtnsText}>JWSENERGY</Text>
                </View>

                <View style={[styles.analysisSubBtns, { marginLeft: 8 }]}>
                  <Text style={styles.analysisSubBtnsText}>
                    TRIANGLE PATTERN
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
                text="https://www.tradingview.com/x/tXn6jAey"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default AnalysisScreen;

const styles = StyleSheet.create({
  topCont: {
    height: "29%",
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
    paddingLeft: "5%",
    justifyContent: "center",
    // backgroundColor: "yellow",
  },

  topContSubBottomSubText1: {
    fontSize: CalculateFontSize(1.5),
    color: "#fff",
    fontWeight: "400",
    marginBottom: "1%",
  },

  topContSubBottomSubText2: {
    fontSize: CalculateFontSize(2.3),
    color: Colors.clr4,
    fontWeight: "600",
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

  analysis: {
    width: "95%",
    height: CalculateFontSize(30),
    marginBottom: 20,
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
});
