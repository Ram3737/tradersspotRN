import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";

import {
  CallPostApiServices,
  CallGetApiServices,
  CallPatchApiServices,
} from "../../../webServices/apiCalls";
import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import Colors from "../../../components/colors/colors";

function AdminAnalysisScreen() {
  const [selectedStockName, setSelectedStockName] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);
  const [risk, setRisk] = useState(null);
  const [reward, setReward] = useState(null);
  const [analysisResultLink, setAnalysisResultLink] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [lastFiveAnalysis, setLastFiveAnalysis] = useState([]);
  const [selectedStockForResult, setSelectedStockForResult] = useState(null);
  const [tab, setTab] = useState("Intraday");
  const patternArr = [
    "PRICE ACTION",
    "TRIANGLE PATTERN",
    "ASCENDING TRIANGLE",
    "DESCENDING TRIANGLE",
    "WEDGE PATTERN",
    "RISING WEDGE",
    "FALLING WEDGE",
    "CHANNEL PATTERN",
    "RISING CHANNEL",
    "FALLING CHANNEL",
    "DOUBLE TOP",
    "DOUBLE BOTTOM",
  ];

  const obj = {
    analysis: {
      stockName: "TCS",
      pattern: "TRIANGLE PATTERN",
      analysisLink: "https://www.tradingview.com/x/tXn6jAey",
    },
    result: {
      riskReward: "1:3 RR",
      resultLink: "https://www.tradingview.com/x/tXn6jAey",
    },
  };

  function getAllAnalysis() {
    CallGetApiServices(
      `/analysis/getAll${tab}Analysis?page=5`,
      (response) => {
        if (response.status === 200) {
          setLastFiveAnalysis(response.data);
        }
      },
      (err) => {
        console.log("err getting getallanalysis", err);
      }
    );
  }

  useEffect(() => {
    getAllAnalysis();
  }, [tab]);

  function analysisBtnHandler() {
    if (!selectedStockName || !selectedPattern || !analysisLink) {
      return;
    }
    CallPostApiServices(
      `/analysis/create${tab}Analysis`,
      {
        analysis: {
          stockName: selectedStockName,
          pattern: selectedPattern,
          analysisLink: analysisLink,
        },
        result: {
          risk: null,
          reward: null,
          resultLink: null,
        },
      },
      (response) => {
        if (response.status === 201) {
          setSelectedStockName(null);
          setSelectedPattern(null);
          setAnalysisLink(null);
          getAllAnalysis();
          console.log("analysis created");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  function analysisResultBtnHandler() {
    if (
      !selectedStockForResult ||
      (risk !== 0 && !risk) ||
      (reward !== 0 && !reward) ||
      !analysisResultLink
    ) {
      return;
    }

    CallPatchApiServices(
      `/analysis/update${tab}Results/${selectedStockForResult}`,
      {
        result: {
          risk: risk,
          reward: reward,
          resultLink: analysisResultLink,
        },
      },
      (response) => {
        if (response.status === 201) {
          console.log(response.data);
          setSelectedStockForResult(null);
          setRisk(null);
          setReward(null);
          setAnalysisResultLink(null);
          getAllAnalysis();
        }
      },
      (err) => {
        console.log("result update err", err);
      }
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[CommonStyles.mainContainer, { flexGrow: 1 }]}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        style={{ width: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.tabCont}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    tab === "Intraday" ? Colors.clr3 : Colors.clr2,
                },
                styles.tab,
              ]}
              onPress={() => setTab("Intraday")}
            >
              <Text style={styles.tabText}>Intraday</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  backgroundColor: tab === "Swing" ? Colors.clr3 : Colors.clr2,
                },
                styles.tab,
              ]}
              onPress={() => setTab("Swing")}
            >
              <Text style={styles.tabText}>Swing</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  backgroundColor: tab === "Free" ? Colors.clr3 : Colors.clr2,
                },
                styles.tab,
              ]}
              onPress={() => setTab("Free")}
            >
              <Text style={styles.tabText}>Free</Text>
            </TouchableOpacity>
          </View>
          {tab === "Intraday" && (
            <>
              <Text style={styles.sideHeadingText}>Intraday Analysis</Text>
              <View style={styles.analysisCont}>
                <View style={styles.topTwo}>
                  <TextInput
                    style={styles.input}
                    placeholder="Stock name"
                    placeholderTextColor="#fff"
                    value={selectedStockName}
                    onChangeText={(text) =>
                      setSelectedStockName(text.toUpperCase())
                    }
                  />
                  <SelectDropdown
                    data={patternArr}
                    onSelect={(selectedItem, index) => {
                      setSelectedPattern(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    rowStyle={{
                      height: 35,
                      backgroundColor: "#999",
                    }}
                    rowTextStyle={{
                      color: "#333",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    buttonStyle={styles.input}
                    buttonTextStyle={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    defaultButtonText="Pattern"
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { width: "100%", marginTop: "3%", marginBottom: "10%" },
                  ]}
                  placeholder="Link"
                  placeholderTextColor="#fff"
                  value={analysisLink}
                  onChangeText={(text) => setAnalysisLink(text)}
                />

                <ButtonComponent text={"Post"} handler={analysisBtnHandler} />
              </View>

              <Text style={[styles.sideHeadingText, { marginTop: "10%" }]}>
                Intraday Result
              </Text>
              <View style={[styles.analysisCont, { height: 250 }]}>
                <ScrollView horizontal={true} style={styles.analysisSubScroll}>
                  <View style={styles.analysisSub}>
                    {lastFiveAnalysis.map(
                      (item, index) =>
                        !item.result.resultLink && (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.analysisSubBtns,
                              {
                                backgroundColor:
                                  item._id === selectedStockForResult
                                    ? Colors.clr4
                                    : Colors.clr3,
                              },
                            ]}
                            onPress={() => setSelectedStockForResult(item._id)}
                          >
                            <Text style={styles.analysisSubBtnsText}>
                              {item.analysis.stockName}
                            </Text>
                          </TouchableOpacity>
                        )
                    )}
                  </View>
                </ScrollView>
                <View style={[styles.topTwo, { marginTop: "5%" }]}>
                  <TextInput
                    style={[styles.input, { width: "45%" }]}
                    placeholder="Risk"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={risk?.toString()}
                    onChangeText={(text) => {
                      const riskValue = parseFloat(text);
                      setRisk(isNaN(riskValue) ? "" : riskValue);
                    }}
                  />
                  <TextInput
                    style={[styles.input, { width: "45%" }]}
                    placeholder="Reward"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={reward?.toString()}
                    onChangeText={(text) => {
                      const rewardValue = parseFloat(text);
                      setReward(isNaN(rewardValue) ? "" : rewardValue);
                    }}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { width: "100%", marginTop: "3%", marginBottom: "10%" },
                  ]}
                  placeholder="Link"
                  placeholderTextColor="#fff"
                  value={analysisResultLink}
                  onChangeText={(text) => setAnalysisResultLink(text)}
                />

                <ButtonComponent
                  text={"Post"}
                  handler={analysisResultBtnHandler}
                />
              </View>
            </>
          )}
          {tab === "Free" && (
            <>
              <Text style={styles.sideHeadingText}>Free Analysis</Text>
              <View style={styles.analysisCont}>
                <View style={styles.topTwo}>
                  <TextInput
                    style={styles.input}
                    placeholder="Stock name"
                    placeholderTextColor="#fff"
                    value={selectedStockName}
                    onChangeText={(text) =>
                      setSelectedStockName(text.toUpperCase())
                    }
                  />
                  <SelectDropdown
                    data={patternArr}
                    onSelect={(selectedItem, index) => {
                      setSelectedPattern(selectedItem);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      return item;
                    }}
                    rowStyle={{
                      height: 35,
                      backgroundColor: "#999",
                    }}
                    rowTextStyle={{
                      color: "#333",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    buttonStyle={styles.input}
                    buttonTextStyle={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    defaultButtonText="Pattern"
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { width: "100%", marginTop: "3%", marginBottom: "10%" },
                  ]}
                  placeholder="Link"
                  placeholderTextColor="#fff"
                  value={analysisLink}
                  onChangeText={(text) => setAnalysisLink(text)}
                />

                <ButtonComponent text={"Post"} handler={analysisBtnHandler} />
              </View>

              <Text style={[styles.sideHeadingText, { marginTop: "10%" }]}>
                Free Result
              </Text>
              <View style={[styles.analysisCont, { height: 250 }]}>
                <ScrollView horizontal={true} style={styles.analysisSubScroll}>
                  <View style={styles.analysisSub}>
                    {lastFiveAnalysis.map(
                      (item, index) =>
                        !item.result.resultLink && (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.analysisSubBtns,
                              {
                                backgroundColor:
                                  item._id === selectedStockForResult
                                    ? Colors.clr4
                                    : Colors.clr3,
                              },
                            ]}
                            onPress={() => setSelectedStockForResult(item._id)}
                          >
                            <Text style={styles.analysisSubBtnsText}>
                              {item.analysis.stockName}
                            </Text>
                          </TouchableOpacity>
                        )
                    )}
                  </View>
                </ScrollView>
                <View style={[styles.topTwo, { marginTop: "5%" }]}>
                  <TextInput
                    style={[styles.input, { width: "45%" }]}
                    placeholder="Risk"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={risk?.toString()}
                    onChangeText={(text) => {
                      const riskValue = parseFloat(text);
                      setRisk(isNaN(riskValue) ? "" : riskValue);
                    }}
                  />
                  <TextInput
                    style={[styles.input, { width: "45%" }]}
                    placeholder="Reward"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={reward?.toString()}
                    onChangeText={(text) => {
                      const rewardValue = parseFloat(text);
                      setReward(isNaN(rewardValue) ? "" : rewardValue);
                    }}
                  />
                </View>
                <TextInput
                  style={[
                    styles.input,
                    { width: "100%", marginTop: "3%", marginBottom: "10%" },
                  ]}
                  placeholder="Link"
                  placeholderTextColor="#fff"
                  value={analysisResultLink}
                  onChangeText={(text) => setAnalysisResultLink(text)}
                />

                <ButtonComponent
                  text={"Post"}
                  handler={analysisResultBtnHandler}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AdminAnalysisScreen;

const styles = StyleSheet.create({
  tabCont: {
    height: "6%",
    width: "90%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.clr2,
    borderRadius: 30,
    marginTop: "5%",
    marginBottom: "6%",
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
  sideHeadingText: {
    alignSelf: "flex-start",
    fontSize: CalculateFontSize(2.2),
    fontWeight: "500",
    color: "#c9c8c7",
    marginLeft: "1%",
    marginTop: "1%",
  },
  analysisCont: {
    height: 220,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: "4%",
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.clr3,
    backgroundColor: Colors.transparentBg,
  },
  topTwo: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    width: "45%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  analysisSubScroll: {
    flexGrow: 1,
    width: "100%",
  },
  analysisSub: {
    height: 30,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  analysisSubBtns: {
    height: "98%",
    width: "auto",
    paddingHorizontal: 10,
    marginRight: 15,
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
