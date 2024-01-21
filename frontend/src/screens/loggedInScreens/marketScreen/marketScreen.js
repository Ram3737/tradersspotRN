import { View, StyleSheet, Modal, ScrollView } from "react-native";

import WebView from "react-native-webview";
import BottomSheet from "react-native-simple-bottom-sheet";
import { useState } from "react";

import TradingViewFullChart from "../../../components/tradingViewFullChart/tradingViewFullChart";
import TradingViewChartWidget from "../../../components/tradingViewChartWidget/tradingViewChartWidget";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import Colors from "../../../components/colors/colors";

function MarketScreen() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const uri =
    "https://www.tradingview.com/chart/?symbol=NIFTY&theme=dark&toolbar_bg=333333&enable_publishing=0";

  const techanalysisWidget = `
<div class="tradingview-widget-container" >
  <div class="tradingview-widget-container__widget"></div>

  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
  {
  "interval": "1H",
  "width": "100%",
  "isTransparent": true,
  "height": "100%",
  "symbol": "NSE:NIFTY1!",
  "showIntervalTabs": true,
  "displayMode": "single",
  "locale": "in",
  "colorTheme": "dark"
}
  </script>
</div>`;

  const newsWidget = `
  <div class="tradingview-widget-container">
    <div class="tradingview-widget-container__widget"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js" async>
    {
    "feedMode": "market",
    "colorTheme": "dark",
    "isTransparent": true,
    "displayMode": "regular",
    "width": "100%",
    "height": "100%",
    "locale": "in",
    "market": "index"
  }
    </script>
  </div>
 `;

  return (
    <ScrollView
      style={styles.scrollMainContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          CommonStyles.mainContainer,
          { padding: 0, justifyContent: "flex-start" },
        ]}
      >
        <View style={styles.chartCont}>
          <TradingViewChartWidget />
          <ButtonComponent
            style={styles.fullChartBtn}
            text={"view full chart"}
            handler={toggleModal}
          />
        </View>
        <View style={styles.newsTechWidCont}>
          <View style={styles.mtr1Cont}>
            <WebView
              style={styles.webV}
              source={{ html: newsWidget }}
              scalesPageToFit={false}
              scrollEnabled={false}
              javaScriptEnabled={true}
              originWhitelist={["*"]}
            />
          </View>
        </View>

        <BottomSheet
          isOpen={false}
          sliderMinHeight={45}
          sliderMaxHeight={700}
          wrapperStyle={{
            backgroundColor: Colors.mainBgClr,
            paddingHorizontal: 0,
            paddingTop: 0,
          }}
        >
          {(onScrollEndDrag) => (
            <View style={styles.mtrCont}>
              <WebView
                style={styles.webVSlider}
                source={{ html: techanalysisWidget }}
                scalesPageToFit={false}
                scrollEnabled={false}
                javaScriptEnabled={true}
                originWhitelist={["*"]}
              />
            </View>
          )}
        </BottomSheet>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalContainer}>
            <TradingViewFullChart />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export default MarketScreen;

const styles = StyleSheet.create({
  scrollMainContainer: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    backgroundColor: Colors.mainBgClr,
  },
  chartCont: {
    width: "93%",
    height: "32%",
    borderWidth: 0.5,
    // borderLeftColor: Colors.clr3,
    // borderRightColor: Colors.clr3,
    // borderBottomColor: Colors.clr3,
    borderColor: Colors.clr3,
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: "4%",
    paddingBottom: "8.5%",
    marginTop: "3%",
    backgroundColor: Colors.transparentBg,
    position: "relative",
  },

  fullChartBtn: {
    position: "absolute",
    left: "33%",
    bottom: "-10%",
  },

  newsTechWidCont: {
    width: "100%",
    flex: 1,
    // paddingHorizontal: 10,
    paddingVertical: 10,
    paddingTop: 0,
    marginTop: "15%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    backgroundColor: Colors.clr2,
  },

  mtrCont: {
    width: "100%",
    height: 310,
    marginTop: "-4%",
    // backgroundColor: "red",
  },

  mtr1Cont: {
    width: "100%",
    height: "85%",
    // backgroundColor: "red",
  },

  webV: {
    flex: 1,
    width: "100%",
    // height: "50%",
    backgroundColor: Colors.clr2,
  },

  webVSlider: {
    flex: 1,
    width: "100%",
    // height: "50%",
    backgroundColor: Colors.mainBgClr,
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.mainBgClr,
  },
});
