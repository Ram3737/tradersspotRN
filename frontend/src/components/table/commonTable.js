import React, { useState } from "react";
import { View, ScrollView, Modal, StyleSheet } from "react-native";

import SelectDropdown from "react-native-select-dropdown";
import { DataTable } from "react-native-paper";

import ButtonComponent from "../buttonComponent/buttonComponent";
import { CallPatchApiServices } from "../../webServices/apiCalls";
import Colors from "../colors/colors";

const CommonTable = ({ usersData, getAllUsers }) => {
  const courses = ["basic", "standard", "premium"];
  const ttUpdate = ["true", "false"];
  const [selectedCourseType, setSelectedCourseType] = useState(null);
  const [selectedTtUpdate, setSelectedTtUpdate] = useState(null);
  const [selectedPaid, setSelectedPaid] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPaidModalVisible, setIsPaidModalVisible] = useState(false);

  const openModal = (id) => {
    const user = usersData.find((item) => item._id === id);
    setIsModalVisible(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCourseType(null);
    setSelectedTtUpdate(null);
    setSelectedUser(null);
  };

  function updateBtnHandler() {
    CallPatchApiServices(
      `/user/updateUser/${selectedUser._id}`,
      {
        courseType: selectedCourseType,
        triedToUpdate: selectedTtUpdate,
      },
      (response) => {
        if (response.status === 201) {
          // console.log("res from update user", response.data.message);
          getAllUsers();
          closeModal();
        }
      },
      (err) => {
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

  function updatePaidBtnHandler() {
    CallPatchApiServices(
      `/user/updateUser/${selectedUser._id}`,
      {
        paid: selectedPaid,
      },
      (response) => {
        if (response.status === 201) {
          console.log("res from update user", response.data.message);
          getAllUsers();
          closePaidModal();
        }
      },
      (err) => {
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
                  {user.courseType || "N/A"}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 25 }}>
                  {user.userType || "N/A"}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 30 }}>
                  {user.paid !== null ? user.paid.toString() : "null"}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 20 }}>
                  {user.triedToUpdate !== false
                    ? user.triedToUpdate.toString()
                    : "false"}
                </DataTable.Cell>
                <DataTable.Cell style={{ minWidth: 30 }}>
                  <View style={styles.btnUpdate}>
                    <ButtonComponent
                      text={"status"}
                      style={{
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                      }}
                      handler={() => openModal(user._id)}
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
          <ButtonComponent text={"Update"} handler={updateBtnHandler} />
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
          <ButtonComponent text={"Update"} handler={updatePaidBtnHandler} />
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
