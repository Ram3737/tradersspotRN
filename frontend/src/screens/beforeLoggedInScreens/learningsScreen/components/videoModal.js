import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import WebView from "react-native-webview";

import { useState } from "react";

import Colors from "../../../../components/colors/colors";
import ButtonComponent from "../../../../components/buttonComponent/buttonComponent";
import CalculateFontSize from "../../../../components/calculateFontSize/calculateFontSize";

function VideoModal({
  content,
  modalVideoContent,
  selectedContent,
  selectedCategory,
  modalVideoHandler,
  closeModal,
  isModalVisible,
}) {
  const [tab, setTab] = useState("contents");
  const [categories, setCategories] = useState([1, 2, 3]);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeModal();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.topBtnCont}>
          <ButtonComponent
            text={"Back"}
            style={{
              alignSelf: "flex-end",
              paddingVertical: 3,
              paddingHorizontal: 15,
            }}
            handler={closeModal}
          />

          <View style={styles.videoCont}>
            <WebView
              source={{
                html: `${modalVideoContent?.link}`,
              }}
              allowsFullscreenVideo={true}
              style={styles.webV}
            />
          </View>
        </View>

        <View style={styles.belowCont}>
          <View style={styles.belowSubCont}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              style={styles.scrollBelowCont}
            >
              <View style={styles.scrollBelowContSub}>
                <View style={styles.descriptionBox}>
                  <View style={styles.descriptionHeadingCont}>
                    <Text style={styles.descriptionHeadingText}>
                      {selectedCategory || ""}
                    </Text>
                  </View>

                  <View style={styles.contentHeading}>
                    <Text style={styles.contentHeadingText}>
                      {modalVideoContent?.name}
                    </Text>
                  </View>
                  <View style={styles.descriptionContentMain}>
                    <ScrollView
                      nestedScrollEnabled={true}
                      style={styles.descriptionContentScroll}
                    >
                      <Text style={styles.descriptionContentText}>
                        {modalVideoContent?.pointOne}
                      </Text>

                      <Text style={styles.descriptionContentText}>
                        {modalVideoContent?.pointTwo}
                      </Text>

                      <Text style={styles.descriptionContentText}>
                        {modalVideoContent?.pointThree}
                      </Text>
                    </ScrollView>
                  </View>
                  <View style={styles.contentContMain}>
                    <ScrollView
                      nestedScrollEnabled={true}
                      style={styles.scrollContentCont}
                    >
                      {content.map((content, index) => (
                        <View
                          key={index}
                          style={[
                            styles.contents,
                            {
                              backgroundColor:
                                selectedContent === index
                                  ? "#222"
                                  : Colors.clr5,
                            },
                          ]}
                        >
                          <View style={styles.contentsLeft}>
                            <Text style={styles.contentsLeftText}>
                              {index + 1}
                            </Text>
                          </View>
                          <View style={styles.contentsCenter}>
                            <Text
                              style={styles.contentsCenterText1}
                              numberOfLines={1}
                              ellipsizeMode="tail"
                            >
                              {content.name}
                            </Text>
                            <Text style={styles.contentsCenterText2}>
                              {content.duration}
                            </Text>
                          </View>
                          <View style={styles.contentsRight}>
                            <TouchableOpacity
                              style={styles.playBtn}
                              onPress={() => modalVideoHandler(content, index)}
                            >
                              <Image
                                source={require("../../../../images/icons/play.png")}
                                style={styles.playBtnImg}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default VideoModal;

const styles = StyleSheet.create({
  topBtnCont: {
    height: "auto",
    width: "100%",
    // backgroundColor: Colors.clr2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },

  topBtn: {
    height: "12%",
    width: "16%",
    backgroundColor: Colors.btnClr,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },

  topBtnText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.mainBgClr,
    justifyContent: "flex-start",
    alignItems: "center",
    // position: "relative",
  },

  modalFloatImgMain: {
    width: 210,
    height: 210,
    position: "absolute",
    top: 160,
    right: 20,
    opacity: 1,
    zIndex: -10,
    transform: [{ rotate: "90deg" }],
  },

  videoCont: {
    width: "100%",
    height: 180,
    marginTop: "5%",
    backgroundColor: Colors.btnClr,
    overflow: "hidden",
    marginBottom: "2%",
    zIndex: 10,
  },

  webV: {
    backgroundColor: Colors.mainBgClr,
  },

  tabCont: {
    height: "6%",
    width: "90%",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.clr2,
    borderRadius: 30,
    marginTop: "8%",
    paddingHorizontal: 8,
  },
  tab: {
    width: "48%",
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

  belowCont: {
    flex: 1,
    width: "100%",
    marginTop: "3%",
    overflow: "hidden",
  },

  belowSubCont: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    position: "relative",
    paddingVertical: 10,
    backgroundColor: Colors.clr2,
    overflow: "hidden",
  },

  scrollBelowCont: {
    width: "100%",
    flex: 1,
  },

  scrollBelowContSub: {
    width: "100%",
    flex: 1,
  },

  descriptionBox: {
    height: "auto",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 20,
  },

  descriptionHeadingCont: {
    width: "auto",
    height: 25,
    backgroundColor: Colors.clr3,
    padding: 4,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: "5%",
  },

  descriptionHeadingText: {
    fontSize: CalculateFontSize(1.5),
    color: "#000",
    fontWeight: "600",
  },

  contentHeading: {
    width: "100%",
    height: "auto",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  contentHeadingText: {
    fontSize: CalculateFontSize(2.3),
    fontWeight: "500",
    color: Colors.clr4,
  },

  descriptionContentMain: {
    width: "100%",
    height: 200,
  },

  descriptionContentScroll: {
    flex: 1,
    width: "100%",
    marginTop: "2.5%",
    paddingLeft: "2%",
  },

  descriptionContentText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "300",
    color: "#fff",
    marginBottom: "5%",
    lineHeight: 19.5,
  },

  contentContMain: {
    width: "100%",
    height: 230,
    marginTop: 5,
  },

  scrollContentCont: {
    flex: 1,
    width: "100%",
    marginTop: "5%",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },

  contents: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: Colors.clr5,
    borderRadius: 10,
    borderColor: Colors.clr2,
    borderWidth: 0.5,
    overflow: "hidden",
  },
  contentsLeft: {
    flex: 0.8,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },

  contentsLeftText: {
    fontSize: CalculateFontSize(2.2),
    fontWeight: "300",
    color: "#fff",
  },

  contentsCenter: {
    flex: 5,
    height: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    // backgroundColor: "cyan",
  },
  contentsCenterText1: {
    fontSize: CalculateFontSize(2),
    fontWeight: "400",
    color: "#fff",
    marginBottom: 5,
  },
  contentsCenterText2: {
    fontSize: CalculateFontSize(1.4),
    fontWeight: "500",
    color: Colors.btnClr,
  },
  contentsRight: {
    flex: 1.2,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "blue",
  },

  playBtn: {
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.clr4,
    borderRadius: 50,
    // padding: 15,
  },

  playBtnImg: {
    width: 10,
    height: 10,
  },
});
