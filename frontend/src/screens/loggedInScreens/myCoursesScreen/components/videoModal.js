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
          <TouchableOpacity style={styles.topBtn} onPress={closeModal}>
            <Text style={styles.topBtnText}>Back</Text>
          </TouchableOpacity>

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
        {/* <TouchableHighlight
          onPress={() => {
            toggleModal();
          }}
        >
          <Text>Close Modal</Text>
        </TouchableHighlight> */}

        {/* <View style={styles.tabCont}>
          <TouchableOpacity
            style={[
              {
                backgroundColor: tab === "contents" ? Colors.clr3 : Colors.clr2,
              },
              styles.tab,
            ]}
            onPress={() => setTab("contents")}
          >
            <Text style={styles.tabText}>Contents</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                backgroundColor: tab === "discuss" ? Colors.clr3 : Colors.clr2,
              },
              styles.tab,
            ]}
            onPress={() => setTab("discuss")}
          >
            <Text style={styles.tabText}>Discuss</Text>
          </TouchableOpacity>
        </View> */}

        <View style={styles.belowCont}>
          <View style={styles.belowSubCont}>
            {/* <Image
              source={require("../../.././../images/pictures/descriptionTop.png")}
              style={styles.modalFloatImg}
            /> */}

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

              <ScrollView style={styles.descriptionContent}>
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

              <ScrollView style={styles.contentSubCont}>
                {content.map((content, index) => (
                  <View
                    key={index}
                    style={[
                      styles.contents,
                      {
                        backgroundColor:
                          selectedContent === index ? "#222" : Colors.clr5,
                      },
                    ]}
                  >
                    <View style={styles.contentsLeft}>
                      <Text style={styles.contentsLeftText}>{index + 1}</Text>
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
      </View>
    </Modal>
  );
}

export default VideoModal;

const styles = StyleSheet.create({
  topBtnCont: {
    height: "33%",
    width: "100%",
    // backgroundColor: Colors.clr2,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "3%",
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
    // height: "100%",
    flex: 1,
    marginTop: "4%",
    // borderColor: Colors.clr3,
    // borderWidth: 0.5,
    backgroundColor: Colors.btnClr,
    // borderRadius: 10,
    overflow: "hidden",
    // padding: 5,
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
    // backgroundColor: "red",
    marginTop: "3%",
    // padding: 10,
    overflow: "hidden",
  },

  belowSubCont: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.clr2,
    // borderColor: Colors.clr5,
    borderRadius: 15,
    // borderWidth: 0.5,
    position: "relative",
    // overflow: "hidden",
  },

  modalFloatImg: {
    width: 60,
    height: 60,
    position: "absolute",
    top: -0,
    right: -0,
    opacity: 1,
    zIndex: -10,
    transform: [{ rotate: "5deg" }],
  },

  descriptionBox: {
    position: "absolute",
    height: "100%",
    width: "100%",
    // top: "2%",
    // left: "18%",
    // backgroundColor: Colors.clr3,
    // borderColor: Colors.clr3,
    // borderWidth: 0.3,
    // borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 20,
    // display: "none",
  },

  descriptionHeadingCont: {
    width: "auto",
    height: "7%",
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
    fontSize: CalculateFontSize(1.8),
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

  descriptionContent: {
    // flex: 1,
    height: "5%",
    width: "100%",
    marginTop: "2.5%",
    paddingLeft: "2%",
    // backgroundColor: "blue",
  },

  descriptionContentText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "300",
    color: "#fff",
    marginBottom: "5%",
    lineHeight: 19.5,
  },

  contentSubCont: {
    flex: 1,
    width: "100%",
    marginTop: "5%",
    paddingVertical: 5,
    paddingHorizontal: 5,
    flexDirection: "column",
    // backgroundColor: "blue",
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
