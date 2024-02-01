import { View, StyleSheet, Modal, ScrollView, TextInput } from "react-native";

import WebView from "react-native-webview";
import BottomSheet from "react-native-simple-bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useContext, useLayoutEffect } from "react";

import TradingViewFullChart from "../../../components/tradingViewFullChart/tradingViewFullChart";
import TradingViewChartWidget from "../../../components/tradingViewChartWidget/tradingViewChartWidget";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import Colors from "../../../components/colors/colors";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import CustomAlertMsgBox from "../../../components/customAlertBox/customAlertMsgBox";

function MarketScreen() {
  const authCtx = useContext(AuthContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchedStockName, setSearchedStockName] = useState(null);
  const [stockName, setStockName] = useState("TCS");
  const [alertMsgBox, setAlertMsgBox] = useState(false);
  const [paid, setPaid] = useState(null);
  const [courseType, setCourseType] = useState(null);

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

  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-financials.js" async>
  {
  "isTransparent": false,
  "largeChartUrl": "",
  "displayMode": "adaptive",
  "width": "100%",
  "height": "100%",
  "colorTheme": "dark",
  "symbol": "NSE:${stockName}",
  "locale": "in"
}
  </script>
</div>
 `;

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

  function stockNameUpdateHandler() {
    if (!searchedStockName && courseType === "pro" && paid) {
      return;
    } else if (courseType === "pro" && paid && searchedStockName) {
      setStockName(searchedStockName);
    } else {
      setAlertMsgBox(true);
      setTimeout(() => {
        setAlertMsgBox(false);
      }, 3000);
    }
  }

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
          <View style={styles.searchCont}>
            <TextInput
              style={styles.input}
              placeholder="Search for stocks"
              placeholderTextColor="#777"
              value={searchedStockName}
              onChangeText={(text) => setSearchedStockName(text.toUpperCase())}
            />
            <ButtonComponent
              text={"search"}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                alignSelf: "center",
              }}
              handler={stockNameUpdateHandler}
            />
          </View>

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
      <CustomAlertMsgBox
        visible={alertMsgBox}
        message={`Upgrade to "PRO" plan to view financial stats for the stocks...`}
      />
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
    height: 190,
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
    left: "36%",
    bottom: "-10%",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  newsTechWidCont: {
    width: "100%",
    height: 450,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
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
    width: "98%",
    height: "75%",
    // backgroundColor: "red",
  },

  webV: {
    flex: 1,
    width: "100%",
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
  searchCont: {
    width: "100%",
    height: "auto",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",

    // backgroundColor: "red",
  },
  input: {
    width: "73%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    paddingHorizontal: 10,
    color: "#fff",
  },
});
