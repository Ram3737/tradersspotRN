import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../colors/colors";

const CustomAlertMsgBox = ({ visible, message }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlertMsgBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingVertical: 90,
    zIndex: 50,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  alertBox: {
    width: "85%",
    padding: 10,
    backgroundColor: "#303030",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: 15,
    fontWeight: "300",
    color: "#fff",
  },
  okButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: Colors.btnClr,
    borderRadius: 5,
  },
  okButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});
