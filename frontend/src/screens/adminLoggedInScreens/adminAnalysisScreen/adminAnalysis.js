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
import { useState } from "react";

import CommonStyles from "../../../components/css/commonStyles";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import Colors from "../../../components/colors/colors";

function AdminAnalysisScreen() {
  const [searchedText, setSearchedText] = useState(null);
  const arr = [1, 1, 1, 1, 1];
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
        <View>
          <Text style={styles.sideHeadingText}>Analysis</Text>
          <View style={styles.analysisCont}>
            <View style={styles.topTwo}>
              <TextInput
                style={styles.input}
                placeholder="Stock name"
                placeholderTextColor="#fff"
                value={searchedText}
                onChangeText={(text) => setSearchedText(text.toLowerCase())}
              />
              <TextInput
                style={styles.input}
                placeholder="Pattern"
                placeholderTextColor="#fff"
                value={searchedText}
                onChangeText={(text) => setSearchedText(text.toLowerCase())}
              />
            </View>
            <TextInput
              style={[
                styles.input,
                { width: "100%", marginTop: "3%", marginBottom: "10%" },
              ]}
              placeholder="Link"
              placeholderTextColor="#fff"
              value={searchedText}
              onChangeText={(text) => setSearchedText(text.toLowerCase())}
            />

            <ButtonComponent text={"Post"} />
          </View>

          <Text style={[styles.sideHeadingText, { marginTop: "10%" }]}>
            Analysis Result
          </Text>
          <View style={[styles.analysisCont, { height: 250 }]}>
            <ScrollView horizontal={true} style={styles.analysisSubScroll}>
              <View style={styles.analysisSub}>
                {arr.map((item) => (
                  <TouchableOpacity style={styles.analysisSubBtns}>
                    <Text style={styles.analysisSubBtnsText}>JWSENERGY</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={[styles.topTwo, { marginTop: "5%" }]}>
              <TextInput
                style={[styles.input, { width: "100%" }]}
                placeholder="Risk / Reward"
                placeholderTextColor="#fff"
                value={searchedText}
                onChangeText={(text) => setSearchedText(text.toLowerCase())}
              />
            </View>
            <TextInput
              style={[
                styles.input,
                { width: "100%", marginTop: "3%", marginBottom: "10%" },
              ]}
              placeholder="Link"
              placeholderTextColor="#fff"
              value={searchedText}
              onChangeText={(text) => setSearchedText(text.toLowerCase())}
            />

            <ButtonComponent text={"Post"} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AdminAnalysisScreen;

const styles = StyleSheet.create({
  sideHeadingText: {
    alignSelf: "flex-start",
    fontSize: CalculateFontSize(2.5),
    fontWeight: "600",
    color: "#fff",
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
