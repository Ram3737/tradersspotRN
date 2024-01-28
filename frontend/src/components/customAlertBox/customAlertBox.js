import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../colors/colors";

const CustomAlertBox = ({
  visible,
  onClose,
  message,
  needCancelBtn,
  btnText,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.alertBox}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.okButton}>
            <Text style={styles.okButtonText}>{btnText ? btnText : "OK"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlertBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 50,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: "#222",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "300",
    textAlign: "center",
    color: "#fff",
    lineHeight: 23,
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
