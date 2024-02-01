import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { MaterialIcons } from "@expo/vector-icons";

import {
  CallPostApiServices,
  CallGetApiServices,
  CallPatchApiServices,
} from "../../../webServices/apiCalls";
import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import SwingAnalysisTable from "../../../components/table/swingAnalysisTable";
import Colors from "../../../components/colors/colors";

function AdminAnalysisScreen() {
  const tabsArray = ["All", "Breakout", "Trailing", "Reward", "Stoploss"];
  const [selectedStockName, setSelectedStockName] = useState(null);
  const [analysisLink, setAnalysisLink] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [analysisData, setAnalysisData] = useState([]);
  const [searchedText, setSearchedText] = useState(null);
  const [tab, setTab] = useState("Swing");
  const [totalAnalysis, setTotalAnalysis] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [analysisLoader, setAnalysisLoader] = useState(false);
  const [allAnalysisLoader, setAllAnalysisLoader] = useState(false);
  const [viewFilterCont, setViewFilterCont] = useState(false);
  const [filterTab, setFilterTab] = useState("All");
  const [breakout, setBreakOut] = useState(null);
  const [reward, setReward] = useState(null);

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

  function getAllAnalysis(page = 1) {
    if (searchedText) {
      CallGetApiServices(
        `/analysis/getAll${
          tab === "Swing" ? tab : tab + "Swing"
        }Analysis?search=${searchedText}&page=${page}`,
        (response) => {
          if (response.status === 200) {
            setAnalysisData(response.data.allSwingAnalyses);
            setTotalAnalysis(response.data.totalSwingAnalysis);
          }
        },
        (err) => {
          console.log("err getting getallanalysis", err.response.data.message);
          Alert.alert(
            "Error getting analysis",
            "Error getting analysis with given id"
          );
        }
      );
    } else {
      setAllAnalysisLoader(true);
      CallGetApiServices(
        `/analysis/getAll${
          tab === "Swing" ? tab : tab + "Swing"
        }Analysis?page=${page}&breakout=${breakout}&reward=${reward}`,
        (response) => {
          if (response.status === 200) {
            setAllAnalysisLoader(false);
            setAnalysisData(response.data.allSwingAnalyses);
            setTotalAnalysis(response.data.totalSwingAnalysis);
          }
        },
        (err) => {
          setAllAnalysisLoader(false);
          console.log("err getting getallanalysis", err);
          Alert.alert("Error getting", "Error getting analysis");
        }
      );
    }
  }

  function analysisBtnHandler() {
    if (!selectedStockName || !selectedPattern || !analysisLink) {
      return;
    }
    setAnalysisLoader(true);
    CallPostApiServices(
      `/analysis/create${tab === "Swing" ? tab : tab + "Swing"}Analysis`,
      {
        analysis: {
          stockName: selectedStockName,
          pattern: selectedPattern,
          analysisLink: analysisLink,
        },
        result: {
          risk: null,
          reward: null,
          percentage: null,
          breakout: "none",
          canSharetoAll: null,
          resultLink: null,
        },
      },
      (response) => {
        if (response.status === 201) {
          setAnalysisLoader(false);
          setSelectedStockName(null);
          setSelectedPattern(null);
          setAnalysisLink(null);
          getAllAnalysis();
          console.log("analysis created");
        }
      },
      (err) => {
        setAnalysisLoader(false);
        console.log(err);
      }
    );
  }

  const handlePageChangePrevious = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageChangeNext = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setAnalysisData([]);
    setSearchedText(null);
    setCurrentPage(1);
    getAllAnalysis();
  }, [tab, breakout, reward]);

  useEffect(() => {
    if (!searchedText) {
      getAllAnalysis(currentPage);
    }
    if (searchedText?.length >= 22) {
      getAllAnalysis(currentPage);
    }
  }, [currentPage, searchedText]);

  function viewFilterTabHandler() {
    setViewFilterCont(!viewFilterCont);
    setBreakOut(null);
    setReward(null);
    setFilterTab("All");
  }

  function tabPressHandler(pressedTab) {
    setFilterTab(pressedTab);
    if (pressedTab === "All") {
      setBreakOut(null);
      setReward(null);
    } else if (pressedTab === "Breakout") {
      setBreakOut("green");
      setReward(null);
    } else if (pressedTab === "Trailing") {
      setBreakOut("orange");
      setReward(null);
    } else if (pressedTab === "Reward") {
      setBreakOut(null);
      setReward(1);
    } else if (pressedTab === "Stoploss") {
      setBreakOut(null);
      setReward(0);
    }
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
                  backgroundColor: tab === "Swing" ? Colors.clr3 : Colors.clr2,
                },
                styles.tab,
              ]}
              onPress={() => {
                setTab("Swing");
                setViewFilterCont(false);
                setBreakOut(null);
                setReward(null);
                setFilterTab("All");
              }}
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
              onPress={() => {
                setTab("Free");
                setViewFilterCont(false);
                setBreakOut(null);
                setReward(null);
                setFilterTab("All");
              }}
            >
              <Text style={styles.tabText}>Free</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                {
                  backgroundColor:
                    tab === "Intraday" ? Colors.clr3 : Colors.clr2,
                },
                styles.tab,
              ]}
              onPress={() => {
                setTab("Intraday");
                setViewFilterCont(false);
                setBreakOut(null);
                setReward(null);
                setFilterTab("All");
              }}
            >
              <Text style={styles.tabText}>Intraday</Text>
            </TouchableOpacity>
          </View>
          {/* {tab === "Intraday" && (
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
          )} */}
          {tab === "Swing" && (
            <>
              <Text style={styles.sideHeadingText}>Swing Analysis</Text>

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

                <ButtonComponent
                  indicator={analysisLoader}
                  disabled={analysisLoader}
                  text={"Post"}
                  handler={analysisBtnHandler}
                />
              </View>

              <Text
                style={[
                  styles.sideHeadingText,
                  { marginTop: "10%", marginBottom: "5%" },
                ]}
              >
                Swing Analyses
              </Text>
              <View
                style={[
                  styles.searchCont,
                  { marginBottom: viewFilterCont ? 10 : 25 },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="#fff"
                  value={searchedText}
                  onChangeText={(text) => {
                    setSearchedText(text.toLowerCase());
                    if (viewFilterCont) {
                      setViewFilterCont(false);
                    }
                  }}
                />
                <MaterialIcons
                  name={"filter-list"}
                  size={25}
                  color={Colors.btnClr}
                  onPress={viewFilterTabHandler}
                />
              </View>
              {viewFilterCont && (
                <View style={styles.tabContFilt}>
                  <ScrollView style={styles.tabSubContFilt} horizontal={true}>
                    {tabsArray.map((tab, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.tabFilt,
                          {
                            backgroundColor:
                              filterTab === tab ? Colors.clr4 : "transparent",
                          },
                        ]}
                        onPress={() => tabPressHandler(tab)}
                      >
                        <Text
                          style={[
                            styles.tabTextFilt,
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
              {allAnalysisLoader ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "20%" }}
                />
              ) : (
                <SwingAnalysisTable
                  swingAnalysisData={analysisData}
                  getAllAnalysis={getAllAnalysis}
                  currentPage={currentPage}
                />
              )}
              {analysisData.length === 0 && (
                <View>
                  <Text
                    style={[
                      styles.labelContText,
                      {
                        fontSize: CalculateFontSize(1.8),
                        marginTop: "50%",
                        marginBottom: "20%",
                        alignSelf: "center",
                        color: "#fff",
                      },
                    ]}
                  >
                    No data
                  </Text>
                </View>
              )}
              <View style={styles.paginationCont}>
                <ButtonComponent
                  text={"<"}
                  handler={() => handlePageChangePrevious(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                <View style={styles.pageNoCont}>
                  <Text>{currentPage}</Text>
                </View>
                <ButtonComponent
                  text={">"}
                  handler={() => handlePageChangeNext(currentPage + 1)}
                  disabled={currentPage * 10 >= totalAnalysis}
                />
              </View>
            </>
          )}
          {tab === "Free" && (
            <>
              <Text style={styles.sideHeadingText}>Free Swing Analysis</Text>

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

                <ButtonComponent
                  indicator={analysisLoader}
                  disabled={analysisLoader}
                  text={"Post"}
                  handler={analysisBtnHandler}
                />
              </View>

              <Text
                style={[
                  styles.sideHeadingText,
                  { marginTop: "10%", marginBottom: "5%" },
                ]}
              >
                Free Swing Analyses
              </Text>
              <View
                style={[
                  styles.searchCont,
                  { marginBottom: viewFilterCont ? 10 : 25 },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="#fff"
                  value={searchedText}
                  onChangeText={(text) => {
                    setSearchedText(text.toLowerCase());
                    if (viewFilterCont) {
                      setViewFilterCont(false);
                    }
                  }}
                />
                <MaterialIcons
                  name={"filter-list"}
                  size={25}
                  color={Colors.btnClr}
                  onPress={viewFilterTabHandler}
                />
              </View>
              {viewFilterCont && (
                <View style={styles.tabContFilt}>
                  <ScrollView style={styles.tabSubContFilt} horizontal={true}>
                    {tabsArray.map((tab, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.tabFilt,
                          {
                            backgroundColor:
                              filterTab === tab ? Colors.clr4 : "transparent",
                          },
                        ]}
                        onPress={() => tabPressHandler(tab)}
                      >
                        <Text
                          style={[
                            styles.tabTextFilt,
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
              {allAnalysisLoader ? (
                <ActivityIndicator
                  size="small"
                  color={Colors.clr4}
                  style={{ marginTop: "20%" }}
                />
              ) : (
                <SwingAnalysisTable
                  swingAnalysisData={analysisData}
                  getAllAnalysis={getAllAnalysis}
                  tab={tab}
                />
              )}
              {analysisData.length === 0 && (
                <View>
                  <Text
                    style={[
                      styles.labelContText,
                      {
                        fontSize: CalculateFontSize(1.8),
                        marginTop: "50%",
                        marginBottom: "20%",
                        alignSelf: "center",
                        color: "#fff",
                      },
                    ]}
                  >
                    No data
                  </Text>
                </View>
              )}
              <View style={styles.paginationCont}>
                <ButtonComponent
                  text={"<"}
                  handler={() => handlePageChangePrevious(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                <View style={styles.pageNoCont}>
                  <Text>{currentPage}</Text>
                </View>
                <ButtonComponent
                  text={">"}
                  handler={() => handlePageChangeNext(currentPage + 1)}
                  disabled={currentPage * 10 >= totalAnalysis}
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
    height: 42,
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
  searchCont: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    // backgroundColor: "red",
  },
  input: {
    width: "45%",
    height: 40,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 10,
  },

  tabContFilt: {
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 3,
    marginBottom: 10,
    // backgroundColor: "blue",
  },
  tabSubContFilt: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "red",
  },
  tabFilt: {
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

  tabTextFilt: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "300",
    color: "#fff",
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

  paginationCont: {
    width: 150,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
  },
  pageNoCont: {
    padding: 9,
    backgroundColor: "#999",
    borderRadius: 5,
  },
});
