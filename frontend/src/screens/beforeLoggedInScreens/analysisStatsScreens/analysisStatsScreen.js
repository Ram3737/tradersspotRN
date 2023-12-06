import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Vibration,
  StyleSheet,
} from "react-native";
import { useState } from "react";

import { LinkPreview } from "@flyerhq/react-native-link-preview";
import { BarChart } from "react-native-chart-kit";
import { Switch } from "react-native-switch";
import DonutChart from "../../../components/charts/donutChart";

import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import Colors from "../../../components/colors/colors";

function AnalysisStatsScreen() {
  const analysisArr = [1, 2, 3, 4];
  const [viewResult, setViewResult] = useState(0);
  const [contToDisplay, setContToDisplay] = useState(false);

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

    setContToDisplay(!contToDisplay);
  };

  const renderItem = ({ item, index }) => (
    <View
      key={index}
      style={[
        styles.analysis,
        {
          height:
            viewResult === index
              ? CalculateFontSize(58)
              : CalculateFontSize(31.5),
        },
      ]}
    >
      <View style={styles.analysisSub}>
        <View style={styles.analysisSubBtns}>
          <Text style={styles.analysisSubBtnsText}>JWSENERGY</Text>
        </View>

        <View style={[styles.analysisSubBtns, { marginLeft: 8 }]}>
          <Text style={styles.analysisSubBtnsText}>TRIANGLE PATTERN</Text>
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
      <View style={styles.viewResultCont}>
        <TouchableOpacity
          style={styles.playBtn}
          onPress={() => viewResultHandler(index)}
        >
          <Text style={styles.viewResultText}>View Result</Text>
        </TouchableOpacity>
      </View>
      {viewResult === index && (
        <>
          <Text style={styles.riskRewardText}>1:2 RR</Text>

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
            text="https://www.tradingview.com/x/tXn6jAey"
          />
        </>
      )}
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
          <Text style={styles.statContTopText}>This Week's stats</Text>
          <View style={styles.statContTop2}>
            <DonutChart top={"36%"} left={"24%"} />
            <BarChart
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                datasets: [
                  {
                    data: [300, 150, 700, 300, 900],
                  },
                ],
              }}
              width={280} // from react-native
              height={110}
              yAxisLabel=""
              yAxisSuffix=""
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                // backgroundColor: "#fff",
                backgroundGradientFrom: Colors.clr2,
                backgroundGradientTo: Colors.clr2,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => "#fff",
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                strokeWidth: 1,
                barPercentage: 0.8,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: Colors.btnClr,
                },
                propsForBackgroundLines: {
                  display: "none",
                },
                propsForHorizontalLabels: {
                  display: "none",
                },
              }}
              bezier
              style={{
                marginLeft: -70,
                borderRadius: 16,
                zIndex: -10,
                // marginLeft: "-7%",
              }}
            />
          </View>
        </View>
        <View style={styles.statContBottom}>
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
      </View>
      <View style={styles.analysisScrollCont}>
        <FlatList
          data={analysisArr}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.analysisScrollContSub}
          inverted={true}
        />
      </View>
    </View>
  );
}

export default AnalysisStatsScreen;

const styles = StyleSheet.create({
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
    height: "83%",
    // backgroundColor: "red",
  },
  statContBottom: {
    width: "100%",
    marginTop: "3.5%",
    alignItems: "flex-end",
  },
  statContTopText: {
    fontSize: CalculateFontSize(2.1),
    fontWeight: "400",
    color: "#fff",
    marginBottom: "5%",
  },
  statContTop2: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    // backgroundColor: "yellow",
  },
  analysisScrollCont: {
    flex: 1,
    width: "100%",
    paddingTop: 15,
    marginTop: "2%",
    borderRadius: 20,
  },

  analysisScrollContSub: {
    flex: 1,
    width: "100%",
  },
  analysis: {
    width: "95%",
    height: CalculateFontSize(53),
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
});
