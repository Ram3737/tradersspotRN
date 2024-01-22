import React, { useState } from "react";
import { View, ScrollView, Modal, StyleSheet } from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import { DataTable } from "react-native-paper";

import ButtonComponent from "../buttonComponent/buttonComponent";
import { CallPatchApiServices } from "../../webServices/apiCalls";
import Colors from "../colors/colors";
import BlinkingDot from "../blinkingDot/blinkingDot";

const CommonTable = ({ currentPage, usersData, getAllUsers }) => {
  const courses = ["basic", "standard", "premium", "none"];
  const ttUpdate = ["true", "false"];
  const [selectedCourseType, setSelectedCourseType] = useState("none");
  const [selectedTtUpdate, setSelectedTtUpdate] = useState(false);
  const [selectedPaid, setSelectedPaid] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaidModalVisible, setIsPaidModalVisible] = useState(false);
  const [isTtuModalVisible, setIsTtuModalVisible] = useState(false);
  const [updateBtnLoader, setUpdateBtnLoader] = useState(false);
  const [updateTtuBtnLoader, setUpdateTtuBtnLoader] = useState(false);
  const [paidBtnLoader, setPaidBtnLoader] = useState(false);

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
    CallPatchApiServices(
      `/user/updateUser/${selectedUser._id}`,
      {
        courseType: selectedCourseType,
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
      }
    );
  }

  function updateTtuBtnHandler() {
    setUpdateTtuBtnLoader(true);
    CallPatchApiServices(
      `/user/updateUser/${selectedUser._id}`,
      {
        triedToUpdate: selectedTtUpdate ? selectedTtUpdate : false,
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

  function updatePaidBtnHandler() {
    setPaidBtnLoader(true);
    CallPatchApiServices(
      `/user/updateUser/${selectedUser._id}`,
      {
        paid: selectedPaid,
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
      }
    );
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
                <DataTable.Cell style={{ minWidth: 45, paddingLeft: 15 }}>
                  {user.email}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 25 }}>
                  {user.courseType !== "none"
                    ? user?.courseType.toString()
                    : user?.courseType}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 25 }}>
                  {user.userType || "N/A"}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 30 }}>
                  {user?.paid.toString()}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 20 }}>
                  {user?.triedToUpdate.toString()}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 30 }}>
                  <View style={styles.btnUpdate}>
                    <View style={{ marginTop: 12, marginLeft: -10 }}>
                      <BlinkingDot
                        color={
                          user?.triedToUpdate
                            ? "blue"
                            : user?.courseType !== "none" && user?.paid
                            ? "green"
                            : user?.courseType !== "none" && !user?.paid
                            ? "orange"
                            : ""
                        }
                      />
                    </View>
                    <ButtonComponent
                      text={"ct"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }}
                      handler={() => openModal(user._id)}
                    />
                    <ButtonComponent
                      text={"ttu"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }}
                      handler={() => openTtuModal(user._id)}
                    />
                    <ButtonComponent
                      text={"paid"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }}
                      handler={() => openPaidModal(user._id)}
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
    </>
  );
};

export default CommonTable;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    width: 800,
    backgroundColor: Colors.clr3,
    borderBottomColor: Colors.clr3,
  },
  tableRow: {
    width: 800,
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
    backgroundColor: Colors.transparentBg,
  },

  btnUpdate: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
