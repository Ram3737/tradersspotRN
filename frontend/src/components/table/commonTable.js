import React, { useState, useLayoutEffect } from "react";
import { View, Text, ScrollView, Modal, Alert, StyleSheet } from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import { DataTable } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ButtonComponent from "../buttonComponent/buttonComponent";
import {
  CallPatchApiServices,
  CallPatchApiServicesWithTkn,
} from "../../webServices/apiCalls";
import {
  CallPostApiServices,
  CallPostApiServicesWithTkn,
} from "../../webServices/apiCalls";
import {
  CallDeleteApiServices,
  CallDeleteApiServicesWithTkn,
} from "../../webServices/apiCalls";
import Colors from "../colors/colors";
import BlinkingDot from "../blinkingDot/blinkingDot";
import CustomAlertMsgBox from "../customAlertBox/customAlertMsgBox";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";

const CommonTable = ({ currentPage, usersData, getAllUsers }) => {
  const courses = ["basic", "standard", "pro", "none"];
  const ttUpdate = ["true", "false"];
  const [selectedCourseType, setSelectedCourseType] = useState("none");
  const [selectedTtUpdate, setSelectedTtUpdate] = useState(false);
  const [selectedPaid, setSelectedPaid] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaidModalVisible, setIsPaidModalVisible] = useState(false);
  const [isTtuModalVisible, setIsTtuModalVisible] = useState(false);
  const [isConfirmMailModalVisible, setIsConfirmMailModalVisible] =
    useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [updateBtnLoader, setUpdateBtnLoader] = useState(false);
  const [updateTtuBtnLoader, setUpdateTtuBtnLoader] = useState(false);
  const [paidBtnLoader, setPaidBtnLoader] = useState(false);
  const [mailBtnLoader, setMailBtnLoader] = useState(false);
  const [deleteUserLoader, setDeleteUserLoader] = useState(false);
  const [mailSentAlert, setMailSentAlert] = useState(false);
  const [token, setToken] = useState(null);

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");

      setToken(tkn);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  const openModal = (id) => {
    const user = usersData.find((item) => item._id === id);
    setIsModalVisible(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCourseType("none");
    setSelectedUser(null);
  };

  function updateBtnHandler() {
    setUpdateBtnLoader(true);
    CallPatchApiServicesWithTkn(
      `/user/update-user/${selectedUser._id}`,
      {
        courseType: selectedCourseType,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 201) {
          setUpdateBtnLoader(false);
          // console.log("res from update user", response.data.message);
          getAllUsers(currentPage);
          closeModal();
        }
      },
      (err) => {
        setUpdateBtnLoader(false);
        console.log("err", err);
        Alert.alert("CT update error", err.response.data.message);
      }
    );
  }

  function updateTtuBtnHandler() {
    setUpdateTtuBtnLoader(true);
    CallPatchApiServicesWithTkn(
      `/user/update-user/${selectedUser._id}`,
      {
        triedToUpdate: selectedTtUpdate ? selectedTtUpdate : false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 201) {
          setUpdateTtuBtnLoader(false);
          // console.log("res from update user", response.data.message);
          getAllUsers(currentPage);
          closeModal();
        }
      },
      (err) => {
        setUpdateTtuBtnLoader(false);
        console.log("err", err);
        Alert.alert("TTU update error", err.response.data.message);
      }
    );
  }

  const openPaidModal = (id) => {
    const user = usersData.find((item) => item._id === id);
    setSelectedUser(user);
    setIsPaidModalVisible(true);
  };

  const closePaidModal = () => {
    setSelectedUser(null);
    setSelectedPaid(false);
    setIsPaidModalVisible(false);
  };

  const openConfirmMailModal = (id) => {
    const user = usersData.find((item) => item._id === id);
    setSelectedUser(user);
    setIsConfirmMailModalVisible(true);
  };

  const closeConfirmMailModal = () => {
    setSelectedUser(null);
    setIsConfirmMailModalVisible(false);
  };

  const openTtuModal = (id) => {
    const user = usersData.find((item) => item._id === id);
    setSelectedUser(user);
    setIsTtuModalVisible(true);
  };

  const closeTtuModal = () => {
    setSelectedUser(null);
    setSelectedTtUpdate(false);
    setIsTtuModalVisible(false);
  };

  const openDeleteModal = (id) => {
    const user = usersData.find((item) => item._id === id);
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedUser(null);
    setIsDeleteModalVisible(false);
  };

  function updatePaidBtnHandler() {
    setPaidBtnLoader(true);
    CallPatchApiServicesWithTkn(
      `/user/update-user/${selectedUser._id}`,
      {
        paid: selectedPaid,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (response) => {
        if (response.status === 201) {
          setPaidBtnLoader(false);
          console.log("res from update user", response.data.message);
          getAllUsers(currentPage);
          closePaidModal();
        }
      },
      (err) => {
        setPaidBtnLoader(false);
        console.log("err", err);
        Alert.alert("Paid update error", err.response.data.message);
      }
    );
  }

  function confirmMailHandler(mail) {
    if (mail) {
      setMailBtnLoader(true);
      CallPostApiServicesWithTkn(
        `/user/purchase-confirmation-email`,
        {
          email: mail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          if (response.status === 200) {
            setMailBtnLoader(false);
            setMailSentAlert(true);
            closeConfirmMailModal();
            setTimeout(() => {
              setMailSentAlert(false);
            }, 3000);
          }
        },
        (err) => {
          setMailBtnLoader(false);
          console.log("err", err);
          closeConfirmMailModal();
          Alert.alert("Mailing error", err.response.data.message);
        }
      );
    } else {
      closeConfirmMailModal();
      Alert.alert("Mailing error", "No prior email found");
    }
  }

  function deleteUserHandler(id) {
    if (id) {
      setDeleteUserLoader(true);
      CallDeleteApiServicesWithTkn(
        `/user/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        (response) => {
          if (response.status === 200) {
            setDeleteUserLoader(false);
            getAllUsers(currentPage);
            closeDeleteModal();
          }
        },
        (err) => {
          setDeleteUserLoader(false);
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

  // console.log(selectedUser);

  return (
    <>
      <ScrollView horizontal={true}>
        <ScrollView>
          <DataTable style={styles.container}>
            <DataTable.Header style={styles.tableHeader}>
              <DataTable.Title style={styles.tableHeaderText}>
                Email
              </DataTable.Title>
              <DataTable.Title>CourseType</DataTable.Title>
              <DataTable.Title>User Type</DataTable.Title>
              <DataTable.Title>Paid Status</DataTable.Title>
              <DataTable.Title>TT Update</DataTable.Title>
              <DataTable.Title>...</DataTable.Title>
            </DataTable.Header>

            {usersData.map((user, index) => (
              <DataTable.Row key={index} style={styles.tableRow}>
                <DataTable.Cell style={{ minWidth: "6%", paddingLeft: 15 }}>
                  {user.email}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: "5%" }}>
                  {user.courseType !== "none"
                    ? user?.courseType.toString()
                    : user?.courseType}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: "5%" }}>
                  {user.userType || "N/A"}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: "5%" }}>
                  {user?.paid.toString()}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: "1%" }}>
                  {user?.triedToUpdate.toString()}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 120 }}>
                  <View style={styles.btnUpdate}>
                    <View
                      style={{ marginTop: 12, marginLeft: -10, marginRight: 8 }}
                    >
                      {/* <BlinkingDot
                        color={
                          user?.triedToUpdate
                            ? "blue"
                            : user?.courseType !== "none" && user?.paid
                            ? "green"
                            : user?.courseType !== "none" && !user?.paid
                            ? "orange"
                            : ""
                        }
                      /> */}
                    </View>
                    <ButtonComponent
                      text={"ct"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 8,
                      }}
                      handler={() => openModal(user._id)}
                    />
                    <ButtonComponent
                      text={"ttu"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 8,
                      }}
                      handler={() => openTtuModal(user._id)}
                    />
                    <ButtonComponent
                      text={"paid"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 8,
                      }}
                      handler={() => openPaidModal(user._id)}
                    />
                    <ButtonComponent
                      text={"mail"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 8,
                      }}
                      handler={() => openConfirmMailModal(user._id)}
                    />
                    <ButtonComponent
                      text={"Del"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        marginRight: 8,
                        backgroundColor: "red",
                      }}
                      disabled={user?.userType == "admin"}
                      handler={() => openDeleteModal(user._id)}
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
          <Text style={styles.userNameText}>
            {selectedUser?.email || "none"}
          </Text>
          <SelectDropdown
            data={courses}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setSelectedCourseType(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            rowStyle={{
              height: 39,
              backgroundColor: "#999",
            }}
            buttonStyle={{
              height: 29,
              marginBottom: 20,
              backgroundColor: "#999",
            }}
            defaultButtonText="Course Type"
          />
          <ButtonComponent
            indicator={updateBtnLoader}
            disabled={updateBtnLoader}
            text={"Update"}
            handler={updateBtnHandler}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isTtuModalVisible}
        onRequestClose={() => closeTtuModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.userNameText}>
            {selectedUser?.email || "none"}
          </Text>
          <SelectDropdown
            data={ttUpdate}
            onSelect={(selectedItem, index) => {
              setSelectedTtUpdate(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            rowStyle={{
              height: 39,
              backgroundColor: "#999",
            }}
            buttonStyle={{
              height: 29,
              marginBottom: 30,
              backgroundColor: "#999",
            }}
            defaultButtonText="Tt update"
          />
          <ButtonComponent
            indicator={updateTtuBtnLoader}
            disabled={updateTtuBtnLoader}
            text={"Update"}
            handler={updateTtuBtnHandler}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPaidModalVisible}
        onRequestClose={() => closePaidModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.userNameText}>
            {selectedUser?.email || "none"}
          </Text>
          <SelectDropdown
            data={ttUpdate}
            onSelect={(selectedItem, index) => {
              setSelectedPaid(selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            rowStyle={{
              height: 39,
              backgroundColor: "#999",
            }}
            buttonStyle={{
              height: 29,
              marginBottom: 30,
              backgroundColor: "#999",
            }}
            defaultButtonText="Paid status"
          />
          <ButtonComponent
            indicator={paidBtnLoader}
            disabled={paidBtnLoader}
            text={"Update"}
            handler={updatePaidBtnHandler}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmMailModalVisible}
        onRequestClose={() => closeConfirmMailModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.userNameText}>
            {selectedUser?.email || "none"}
          </Text>
          <ButtonComponent
            indicator={mailBtnLoader}
            disabled={mailBtnLoader}
            text={"Send mail ?"}
            handler={() => confirmMailHandler(selectedUser?.email || null)}
          />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isDeleteModalVisible}
        onRequestClose={() => closeDeleteModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.confirmationText}>
            Are you sure, want to delete
          </Text>
          <Text style={styles.userNameText}>
            {selectedUser?.email || "none"}
          </Text>
          <ButtonComponent
            indicator={deleteUserLoader}
            disabled={deleteUserLoader}
            style={{ backgroundColor: "red" }}
            text={"delete"}
            handler={() => deleteUserHandler(selectedUser?._id || null)}
          />
        </View>
      </Modal>

      <CustomAlertMsgBox
        visible={mailSentAlert}
        message={"Mail sent successfully"}
      />
    </>
  );
};

export default CommonTable;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    width: 1420,
    backgroundColor: Colors.clr3,
    borderBottomColor: Colors.clr3,
  },
  tableRow: {
    width: 1420,
    paddingLeft: 0,
    backgroundColor: "#999",
    borderBottomColor: "#000",
  },
  modalContainer: {
    height: 200,
    paddingHorizontal: "15%",
    marginTop: "70%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.clr2,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  btnUpdate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userNameText: {
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
});
