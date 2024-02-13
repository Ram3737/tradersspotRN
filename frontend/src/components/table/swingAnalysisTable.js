import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import { DataTable } from "react-native-paper";

import ButtonComponent from "../buttonComponent/buttonComponent";
import {
  CallPatchApiServices,
  CallGetApiServices,
  CallDeleteApiServices,
} from "../../webServices/apiCalls";
import Colors from "../colors/colors";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";

const SwingAnalysisTable = ({
  swingAnalysisData,
  getAllAnalysis,
  currentPage,
  tab,
}) => {
  const [risk, setRisk] = useState(null);
  const [reward, setReward] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [breakout, setBreakout] = useState(null);
  const [shareToAll, setSharetoAll] = useState(null);
  const [analysisResultLink, setAnalysisResultLink] = useState(null);
  const [updateStockName, setUpdateStockName] = useState(null);
  const [updatePattern, setUpdatePattern] = useState(null);
  const [updateAnalysisLink, setUpdateAnalysisLink] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isBreakoutModalVisible, setIsBreakoutModalVisible] = useState(false);
  const [isAnalysisUpdateModalVisible, setIsAnalysisUpdateModalVisible] =
    useState(false);
  const [resultUpdateLoader, setResultUpdateLoader] = useState(false);
  const [deleteAnalysisLoader, setDeleteAnalysisLoader] = useState(false);
  const [analysisUpdateLoader, setAnalysisUpdateLoader] = useState(false);
  const [breakoutLoader, setBreakoutLoader] = useState(false);

  const arr = ["true", "false"];
  const breakoutOptions = ["green", "orange", "none"];
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

  const openModal = (id) => {
    const analysis = swingAnalysisData.find((item) => item._id === id);
    setRisk(analysis.result.risk);
    setReward(analysis.result.reward);
    setAnalysisResultLink(analysis.result.resultLink);
    setPercentage(analysis.result.percentage);
    setBreakout(analysis.result.breakout);
    setSharetoAll(analysis.result.canSharetoAll);
    setSelectedAnalysis(analysis);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedAnalysis(null);
    setRisk(null);
    setReward(null);
    setPercentage(null);
    setBreakout(null);
    setSharetoAll(null);
    setAnalysisResultLink(null);
  };

  const openBreakoutModal = (id) => {
    const analysis = swingAnalysisData.find((item) => item._id === id);
    setSelectedAnalysis(analysis);
    setRisk(analysis.result.risk);
    setReward(analysis.result.reward);
    setAnalysisResultLink(analysis.result.resultLink);
    setPercentage(analysis.result.percentage);
    setBreakout(analysis.result.breakout);
    setSharetoAll(analysis.result.canSharetoAll);
    setIsBreakoutModalVisible(true);
  };

  const closeBreakoutModal = () => {
    setIsBreakoutModalVisible(false);
    setSelectedAnalysis(null);
    setRisk(null);
    setReward(null);
    setPercentage(null);
    setBreakout(null);
    setSharetoAll(null);
    setAnalysisResultLink(null);
  };

  function breakoutBtnHandler() {
    if (breakout !== null) {
      setBreakoutLoader(true);
      CallPatchApiServices(
        `/analysis/${
          tab === "Free"
            ? "free-swing-analysis/update-free-swing-analysis"
            : "swing-analysis/update-swing-analysis"
        }/${selectedAnalysis._id}`,
        {
          result: {
            risk: risk || null,
            reward: reward || null,
            percentage: percentage || null,
            breakout: breakout,
            canSharetoAll: shareToAll || null,
            resultLink: analysisResultLink || null,
          },
        },
        (response) => {
          if (response.status === 201) {
            // console.log(response.data);
            setBreakoutLoader(false);
            console.log("analysis updated");
            closeBreakoutModal();
            getAllAnalysis(currentPage);
          }
        },
        (err) => {
          setBreakoutLoader(false);
          console.log("result update err", err);
        }
      );
    }
  }

  function analysisResultBtnHandler() {
    if (
      !selectedAnalysis ||
      (!risk === 0 && !risk) ||
      (!reward === 0 && !reward) ||
      !analysisResultLink ||
      (!percentage === 0 && !percentage) ||
      !breakout === null ||
      !shareToAll === null
    ) {
      return;
    }
    setResultUpdateLoader(true);
    CallPatchApiServices(
      `/analysis/${
        tab === "Free"
          ? "free-swing-analysis/update-free-swing-analysis"
          : "swing-analysis/update-swing-analysis"
      }/${selectedAnalysis._id}`,
      {
        result: {
          risk: risk || null,
          reward: reward >= 0 ? reward : null,
          percentage: percentage || null,
          breakout: breakout,
          canSharetoAll: shareToAll || null,
          resultLink: analysisResultLink || null,
        },
      },
      (response) => {
        if (response.status === 201) {
          // console.log(response.data);
          setResultUpdateLoader(false);
          console.log("analysis updated");
          closeModal();
          getAllAnalysis(currentPage);
        }
      },
      (err) => {
        setResultUpdateLoader(false);
        console.log("result update err", err);
      }
    );
  }

  const openDeleteModal = (id) => {
    const analysis = swingAnalysisData.find((item) => item._id === id);
    setSelectedAnalysis(analysis);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedAnalysis(null);
    setIsDeleteModalVisible(false);
  };

  function deleteAnalysisHandler(id) {
    if (id) {
      setDeleteAnalysisLoader(true);
      CallDeleteApiServices(
        `/analysis/${
          tab === "Free"
            ? "free-swing-analysis/delete-free-swing-analysis"
            : "swing-analysis/delete-swing-analysis"
        }/${id}`,
        (response) => {
          if (response.status === 200) {
            setDeleteAnalysisLoader(false);
            getAllAnalysis(currentPage);
            closeDeleteModal();
          }
        },
        (err) => {
          setDeleteAnalysisLoader(false);
          console.log("deletion err", err);
          closeDeleteModal();
          Alert.alert("Deletion error", err.response.data.message);
        }
      );
    } else {
      closeDeleteModal();
      Alert.alert("Deletion error", "No prior id found");
    }
  }

  const openAnalysisUpdateModal = (id) => {
    const analysis = swingAnalysisData.find((item) => item._id === id);
    setSelectedAnalysis(analysis);
    setUpdateStockName(analysis.analysis.stockName);
    setUpdatePattern(analysis.analysis.pattern);
    setUpdateAnalysisLink(analysis.analysis.analysisLink);
    setIsAnalysisUpdateModalVisible(true);
  };

  const closeAnalysisUpdateModal = () => {
    setSelectedAnalysis(null);
    setUpdateStockName(null);
    setUpdatePattern(null);
    setUpdateAnalysisLink(null);
    setIsAnalysisUpdateModalVisible(false);
  };

  function analysisUpdateHandler(id) {
    if (id) {
      setAnalysisUpdateLoader(true);
      CallPatchApiServices(
        `/analysis/${
          tab === "Free"
            ? "free-swing-analysis/update-free-swing-analysis"
            : "swing-analysis/update-swing-analysis"
        }/${selectedAnalysis._id}`,
        {
          analysis: {
            stockName:
              updateStockName || selectedAnalysis.analysis.stockName || null,
            pattern: updatePattern || selectedAnalysis.analysis.pattern || null,
            analysisLink:
              updateAnalysisLink ||
              selectedAnalysis.analysis.analysisLink ||
              null,
          },
        },
        (response) => {
          if (response.status === 201) {
            setAnalysisUpdateLoader(false);
            getAllAnalysis(currentPage);
            closeAnalysisUpdateModal();
            console.log("analysis updated");
          }
        },
        (err) => {
          setAnalysisUpdateLoader(false);
          closeAnalysisUpdateModal();
          console.log(err);
          Alert.alert("Updation error", "No prior id found");
        }
      );
    } else {
      Alert.alert("Updation error", "No prior id found");
    }
  }

  return (
    <>
      <ScrollView horizontal={true}>
        <ScrollView>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title>Id</DataTable.Title>
              <DataTable.Title>Stock name</DataTable.Title>
              <DataTable.Title>Pattern</DataTable.Title>
              <DataTable.Title>Risk/Reward</DataTable.Title>
              <DataTable.Title>Percentage</DataTable.Title>
              <DataTable.Title>breakout</DataTable.Title>
              <DataTable.Title>Share to all</DataTable.Title>
              <DataTable.Title>...</DataTable.Title>
            </DataTable.Header>

            {swingAnalysisData?.length > 0 &&
              swingAnalysisData.map((analysis, index) => (
                <DataTable.Row key={index} style={styles.tableRow}>
                  <DataTable.Cell style={{ minWidth: 38, paddingLeft: 15 }}>
                    {analysis._id}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      minWidth: 25,
                      paddingLeft: 3,
                    }}
                  >
                    {analysis.analysis.stockName || "N/A"}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      minWidth: 25,
                      paddingLeft: 3,
                    }}
                  >
                    {analysis.analysis.pattern || "N/A"}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      minWidth: 30,
                      paddingLeft: 10,
                    }}
                  >
                    {`${
                      analysis.result?.risk >= 0
                        ? analysis.result?.risk
                        : "null"
                    }:${
                      analysis.result?.reward >= 0
                        ? analysis.result?.reward
                        : "null"
                    }`}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ minWidth: 30, paddingLeft: 6 }}>
                    {analysis.result?.risk === 0 &&
                    analysis.result?.reward === 0
                      ? analysis.result?.percentage
                      : analysis.result?.risk > 0 &&
                        analysis.result?.reward === 0
                      ? -analysis.result?.percentage
                      : analysis.result.percentage || "null"}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ minWidth: 30, paddingLeft: 2 }}>
                    {analysis.result.breakout === null
                      ? "null"
                      : analysis.result?.breakout?.toString()}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ minWidth: 20 }}>
                    {analysis.result.canSharetoAll === null
                      ? "null"
                      : analysis.result?.canSharetoAll?.toString()}
                  </DataTable.Cell>
                  <DataTable.Cell style={{ minWidth: 30 }}>
                    <View style={styles.btnUpdate}>
                      <ButtonComponent
                        text={"update"}
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginRight: 15,
                        }}
                        handler={() => openModal(analysis._id)}
                      />
                      <ButtonComponent
                        text={"bo"}
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginRight: 15,
                        }}
                        handler={() => openBreakoutModal(analysis._id)}
                      />
                      <ButtonComponent
                        text={"Del"}
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginRight: 8,
                          backgroundColor: "red",
                        }}
                        handler={() => openDeleteModal(analysis._id)}
                      />
                      <ButtonComponent
                        text={"Upd"}
                        style={{
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          marginRight: 8,
                          backgroundColor: "orange",
                        }}
                        handler={() => openAnalysisUpdateModal(analysis._id)}
                      />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </ScrollView>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => closeModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.stockNameText}>
            {selectedAnalysis?.analysis.stockName || "none"}
          </Text>
          <ScrollView style={styles.scrollWholeUpdateCont}>
            <View style={styles.scrollWholeUpdateContSub}>
              <View style={[styles.analysisCont, { height: 320 }]}>
                <View style={[styles.topTwo, { marginTop: "5%" }]}>
                  <TextInput
                    style={[styles.input, { width: "30%" }]}
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
                    style={[styles.input, { width: "30%" }]}
                    placeholder="Reward"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={reward?.toString()}
                    onChangeText={(text) => {
                      const rewardValue = parseFloat(text);
                      setReward(isNaN(rewardValue) ? "" : rewardValue);
                    }}
                  />
                  <TextInput
                    style={[styles.input, { width: "32%" }]}
                    placeholder="Percentage"
                    placeholderTextColor="#fff"
                    keyboardType="numeric"
                    value={percentage?.toString()}
                    onChangeText={(text) => {
                      const percentageValue = parseFloat(text);
                      setPercentage(
                        isNaN(percentageValue) ? "" : percentageValue
                      );
                    }}
                  />
                </View>
                <View style={[styles.topTwo, { marginTop: "5%" }]}>
                  <SelectDropdown
                    data={breakoutOptions}
                    onSelect={(selectedItem, index) => {
                      setBreakout(selectedItem || breakout);
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
                    buttonStyle={[styles.input, { width: "45%" }]}
                    buttonTextStyle={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    defaultButtonText="Breakout"
                    defaultValueByIndex={
                      breakout === null
                        ? "none"
                        : breakout === "orange"
                        ? 1
                        : breakout === "green"
                        ? 0
                        : "none"
                    }
                  />
                  <SelectDropdown
                    data={arr}
                    onSelect={(selectedItem, index) => {
                      setSharetoAll(selectedItem);
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
                    buttonStyle={[styles.input, { width: "45%" }]}
                    buttonTextStyle={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "400",
                    }}
                    defaultButtonText="Share to all"
                    defaultValueByIndex={
                      shareToAll === null
                        ? "none"
                        : shareToAll === false
                        ? 1
                        : shareToAll === true
                        ? 0
                        : "none"
                    }
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
                  indicator={resultUpdateLoader}
                  disabled={resultUpdateLoader}
                  text={"Update"}
                  handler={analysisResultBtnHandler}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isBreakoutModalVisible}
        onRequestClose={() => closeBreakoutModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.stockNameText}>
            {selectedAnalysis?.analysis.stockName || "none"}
          </Text>
          <View style={[styles.analysisCont, { height: 160 }]}>
            <View
              style={[
                styles.topTwo,
                { marginTop: "5%", justifyContent: "center" },
              ]}
            >
              <SelectDropdown
                data={breakoutOptions}
                onSelect={(selectedItem, index) => {
                  setBreakout(selectedItem || breakout);
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
                buttonStyle={[styles.input, { width: "45%" }]}
                buttonTextStyle={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "400",
                }}
                defaultButtonText="Breakout"
                defaultValueByIndex={
                  breakout === null
                    ? "none"
                    : breakout === "orange"
                    ? 1
                    : breakout === "green"
                    ? 0
                    : "none"
                }
              />
            </View>
            <ButtonComponent
              indicator={breakoutLoader}
              disabled={breakoutLoader}
              text={"Update"}
              handler={breakoutBtnHandler}
            />
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => closeDeleteModal()}
      >
        <View style={styles.modalContainer2}>
          <Text style={styles.confirmationText}>
            Are you sure, want to delete
          </Text>
          <Text style={styles.analysisNameText}>
            {selectedAnalysis?.analysis?.stockName || "none"}
          </Text>
          <ButtonComponent
            indicator={deleteAnalysisLoader}
            disabled={deleteAnalysisLoader}
            style={{ backgroundColor: "red" }}
            text={"delete"}
            handler={() => deleteAnalysisHandler(selectedAnalysis?._id || null)}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAnalysisUpdateModalVisible}
        onRequestClose={() => closeAnalysisUpdateModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.analysisNameText}>
            {selectedAnalysis?.analysis?.stockName || "none"}
          </Text>

          <ScrollView style={styles.scrollWholeUpdateCont}>
            <View style={styles.scrollWholeUpdateContSub}>
              <View style={styles.analysisContUpdate}>
                <View style={styles.topTwoUpdate}>
                  <TextInput
                    style={styles.input}
                    placeholder="Stock name"
                    placeholderTextColor="#fff"
                    value={updateStockName}
                    onChangeText={(text) =>
                      setUpdateStockName(text.toUpperCase())
                    }
                  />
                  <SelectDropdown
                    data={patternArr}
                    onSelect={(selectedItem, index) => {
                      setUpdatePattern(selectedItem);
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
                  value={updateAnalysisLink}
                  onChangeText={(text) => setUpdateAnalysisLink(text)}
                />
              </View>
              <ButtonComponent
                indicator={analysisUpdateLoader}
                disabled={analysisUpdateLoader}
                style={{ backgroundColor: "orange", marginTop: "10%" }}
                text={"update"}
                handler={() =>
                  analysisUpdateHandler(selectedAnalysis?._id || null)
                }
              />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default SwingAnalysisTable;

const styles = StyleSheet.create({
  container: {
    // padding: 15,
  },
  tableHeader: {
    width: 1890,
    backgroundColor: Colors.clr3,
    borderBottomColor: Colors.clr3,
  },
  tableRow: {
    width: 1890,
    paddingLeft: 0,
    backgroundColor: "#999",
    borderBottomColor: "#000",
  },
  modalContainer: {
    height: "100%",
    paddingHorizontal: "3%",
    paddingVertical: "10%",
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  modalContainer2: {
    height: 200,
    paddingHorizontal: "15%",
    marginTop: "70%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.clr2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },

  stockNameText: {
    fontSize: CalculateFontSize(2.5),
    fontWeight: "500",
    color: Colors.clr4,
    alignSelf: "center",
    marginTop: "10%",
  },

  analysisCont: {
    height: 280,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: "10%",
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
  analysisContUpdate: {
    height: "auto",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: "5%",
    borderRadius: 10,
    borderWidth: 0.2,
    borderColor: Colors.clr3,
    backgroundColor: Colors.transparentBg,
  },
  topTwoUpdate: {
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

  btnUpdate: {
    width: "100%",
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  analysisNameText: {
    fontSize: CalculateFontSize(2.2),
    fontWeight: "500",
    color: Colors.clr4,
    alignSelf: "center",
    marginBottom: "13%",
  },
  confirmationText: {
    color: Colors.midWhite,
    fontSize: CalculateFontSize(2),
    fontWeight: "500",
    marginBottom: 10,
  },
  scrollWholeUpdateCont: {
    width: "100%",
    flex: 1,
  },
  scrollWholeUpdateContSub: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
