import {
  View,
  Text,
  Modal,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Colors from "../../components/colors/colors";
import ButtonComponent from "../buttonComponent/buttonComponent";
import CalculateFontSize from "../calculateFontSize/calculateFontSize";
import BuyNow0 from "../../images/pictures/buyNow0.jpg";
import VideosLogo from "../../images/logo/videos.png";
import SheetsLogo from "../../images/logo/sheets.png";
import ValidityLogo from "../../images/logo/validityNeon.png";
import AnalysisLogo from "../../images/logo/analysisNeon.png";
import VideosNeonLogo from "../../images/logo/videosNeon.png";
import { useState } from "react";

function CourseDetailsModal({ closeModal, isModalVisible }) {
  const [contentTab, setContentTab] = useState("overview");

  function contentViewHandler(text) {
    setContentTab(text);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        closeModal;
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
          >
            {/* <Text style={styles.topBtnText}>Back</Text> */}
          </ButtonComponent>
        </View>
        <View style={styles.tabCont}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  contentTab === "overview" ? Colors.clr4 : "transparent",
              },
            ]}
            onPress={() => contentViewHandler("overview")}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: contentTab === "overview" ? "#000" : "#fff",
                  fontWeight: contentTab === "overview" ? "500" : "300",
                },
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor:
                  contentTab === "contents" ? Colors.clr4 : "transparent",
              },
            ]}
            onPress={() => contentViewHandler("contents")}
          >
            <Text
              style={[
                styles.tabText,
                {
                  color: contentTab === "contents" ? "#000" : "#fff",
                  fontWeight: contentTab === "contents" ? "500" : "300",
                },
              ]}
            >
              Content
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          style={styles.scrollCont}
        >
          {contentTab === "overview" && (
            <View style={styles.scrollContSub}>
              <View>
                <ImageBackground
                  source={BuyNow0}
                  style={styles.imgCont}
                  imageStyle={styles.imgContImg}
                />
                <Text style={styles.courseHeadingText}>
                  PRICE ACTION - THE COMPLETE COURSE
                </Text>
                <Text style={styles.courseHeadingTextSub}>Basics</Text>
              </View>
              <View style={styles.cardCont}>
                <View style={styles.card}>
                  <Image
                    source={VideosLogo}
                    style={{
                      width: 25,
                      height: 36,
                      marginLeft: -10,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.cardText}>VIDEOS</Text>
                </View>
                <View style={[styles.card, { marginLeft: 10 }]}>
                  <Image
                    source={SheetsLogo}
                    style={{
                      width: 25,
                      height: 36,
                      marginLeft: -10,
                      marginRight: 3,
                    }}
                  />
                  <Text style={styles.cardText}>ANALYSIS SHEETS</Text>
                </View>
              </View>
              {/* <View style={styles.line}></View> */}

              <View style={styles.aboutCourseCont}>
                <Text style={styles.sideHeadingText}>About This Course</Text>
                <Text style={styles.contentDescriptionText}>
                  Welcome to Trader's Spot Price Action - The complete course.
                  The essential knowledge that every trader should possess.
                </Text>
                <Text style={styles.contentDescriptionText}>
                  In this course, you'll gain insights into successful price
                  action trading...
                  {/* through the acquisition of effective and proven
              strategies. */}
                </Text>
              </View>

              <View style={styles.whatElseCont}>
                <Text
                  style={[
                    styles.sideHeadingText,
                    { fontSize: CalculateFontSize(2) },
                  ]}
                >
                  What else you will get ?
                </Text>
                <View style={styles.whatElseSubCont}>
                  <View style={styles.whatElseSubContItem}>
                    <Image
                      source={ValidityLogo}
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <View style={styles.whatElseSubContItemDescCont}>
                      <Text style={styles.whatElseSubContItemText}>
                        Validity
                      </Text>
                      <Text style={styles.whatElseSubContItemDescText}>
                        You will get 1 month validity
                      </Text>
                    </View>
                  </View>
                  <View style={styles.whatElseSubContItem}>
                    <Image
                      source={VideosNeonLogo}
                      style={{
                        width: 42,
                        height: 42,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <View style={styles.whatElseSubContItemDescCont}>
                      <Text style={styles.whatElseSubContItemText}>Videos</Text>
                      <Text style={styles.whatElseSubContItemDescText}>
                        Access to 15 hours of video contents
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.whatElseSubCont, { marginTop: 18 }]}>
                  <View style={styles.whatElseSubContItem}>
                    <Image
                      source={AnalysisLogo}
                      style={{
                        width: 50,
                        height: 50,
                        marginLeft: -10,
                        marginRight: 3,
                      }}
                    />
                    <View style={styles.whatElseSubContItemDescCont}>
                      <Text style={styles.whatElseSubContItemText}>
                        Analysis
                      </Text>
                      <Text style={styles.whatElseSubContItemDescText}>
                        You will get overall chart analyses
                      </Text>
                    </View>
                  </View>
                  <View style={styles.whatElseSubContItem}></View>
                </View>
              </View>
              <Text style={[styles.sideHeadingText, { marginTop: 20 }]}>
                Pricing Details
              </Text>
              <View style={styles.pricingCont}>
                <View style={styles.pricingContSub}>
                  <Text style={styles.pricingContSubText1}>You Pay</Text>
                  <View style={styles.pricingContSubCont}>
                    <Text style={styles.pricingContSubContText1}>₹ 4,499</Text>
                    <Text style={styles.pricingContSubContText2}>₹ 2,499</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {contentTab === "contents" && (
            <View style={styles.scrollContSub}></View>
          )}
        </ScrollView>
        <View style={styles.buyNowBelowCont}>
          <View style={styles.priceBelowCont}>
            <Text style={styles.priceBelowContActualPriceText}>₹ 2,499</Text>
            <View style={styles.priceBelowContSub}>
              <Text style={styles.priceBelowContSubText1}>₹ 4,499</Text>
              <Text style={styles.priceBelowContSubText2}>20% OFF</Text>
            </View>
          </View>
          <View style={styles.buyNowBtnCont}>
            <ButtonComponent
              text={"Buy now"}
              fontStyle={{
                fontSize: CalculateFontSize(2.3),
                fontWeight: "600",
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CourseDetailsModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.mainBgClr,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "red",
  },
  topBtnCont: {
    height: "auto",
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  tabCont: {
    height: 35,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    marginTop: 15,
  },
  tab: {
    width: "25%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: Colors.clr5,
    borderWidth: 0.8,
    marginRight: 10,
  },

  tabText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "300",
    color: "#fff",
  },
  line: {
    width: "100%",
    height: 0.2,
    alignSelf: "center",
    backgroundColor: Colors.midWhite,
  },
  scrollCont: {
    width: "100%",
    paddingHorizontal: 14,
    marginTop: 20,
  },
  scrollContSub: {
    width: "100%",
    height: "auto",
    paddingBottom: 25,
  },
  imgCont: {
    width: "100%",
    height: 160,
    alignItems: "center",
    marginBottom: 10,
  },
  imgContImg: {
    height: "100%",
    opacity: 0.8,
    objectFit: "fill",
  },
  courseHeadingText: {
    fontSize: CalculateFontSize(2.5),
    fontWeight: "600",
    color: "#fff",
    lineHeight: 30,
  },
  courseHeadingTextSub: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    color: Colors.midWhite,
    marginTop: 10,
  },
  cardCont: {
    height: 23,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 25,
  },
  card: {
    width: "auto",
    height: "95%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: "#222",
  },
  cardText: {
    fontSize: CalculateFontSize(1.4),
    fontWeight: "300",
    color: "#fff",
  },
  aboutCourseCont: {
    width: "100%",
    // marginTop: 20,
  },
  sideHeadingText: {
    fontSize: CalculateFontSize(2.4),
    fontWeight: "500",
    color: Colors.clr4,
  },
  contentDescriptionText: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "300",
    color: Colors.midWhite,
    marginTop: 12,
  },
  whatElseCont: {
    width: "100%",
    height: 180,
    marginTop: 30,
    padding: 10,
    backgroundColor: Colors.transparentBg,
  },
  whatElseSubCont: {
    width: "100%",
    height: 53,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    // backgroundColor: "red",
  },
  whatElseSubContItem: {
    width: "45%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  whatElseSubContItemDescCont: {
    width: "65%",
    height: "100%",
    flexDirection: "column",
    // backgroundColor: "#999",
  },
  whatElseSubContItemText: {
    fontSize: CalculateFontSize(1.7),
    fontWeight: "500",
    color: "#fff",
    marginBottom: 5,
  },
  whatElseSubContItemDescText: {
    fontSize: CalculateFontSize(1.3),
    fontWeight: "300",
    color: Colors.midWhite,
    marginLeft: 1,
  },
  buyNowBelowCont: {
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.clr2,
  },
  priceBelowCont: {
    width: "auto",
    height: "100%",
    paddingHorizontal: 35,
    paddingLeft: 25,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  buyNowBtnCont: {
    width: "auto",
    height: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  priceBelowContActualPriceText: {
    fontSize: CalculateFontSize(2.6),
    fontWeight: "500",
    color: "#fff",
  },
  priceBelowContSub: {
    width: "100%",
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 10,
  },
  priceBelowContSubText1: {
    fontSize: CalculateFontSize(2),
    fontWeight: "500",
    color: "#fff",
    textDecorationLine: "line-through",
    marginRight: 10,
  },
  priceBelowContSubText2: {
    fontSize: CalculateFontSize(1.5),
    fontWeight: "300",
    color: "yellow",
    alignSelf: "center",
  },
  pricingCont: {
    width: "100%",
    height: 80,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  pricingContSub: {
    width: "90%",
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: Colors.clr3,
    borderWidth: 0.8,
    borderRadius: 5,
  },
  pricingContSubText1: {
    fontSize: CalculateFontSize(2),
    fontWeight: "500",
    color: Colors.midWhite,
  },
  pricingContSubCont: {
    width: "auto",
    height: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  pricingContSubContText1: {
    fontSize: CalculateFontSize(1.8),
    fontWeight: "400",
    marginRight: 10,
    color: Colors.midWhite,
    textDecorationLine: "line-through",
  },
  pricingContSubContText2: {
    fontSize: CalculateFontSize(2.4),
    fontWeight: "400",
    color: "#fff",
  },
});
