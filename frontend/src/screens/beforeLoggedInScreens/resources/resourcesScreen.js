import {
  View,
  Text,
  Linking,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from "react-native";
import { useState, useContext, useEffect, useLayoutEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { config } from "../../../webServices/config";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import CustomAlertMsgBox from "../../../components/customAlertBox/customAlertMsgBox";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import calculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../components/stores/context/authContextProvider";

function ResourcesScreen() {
  const authCtx = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [btnLoader, setBtnLoader] = useState(false);
  const [register, setRegister] = useState(false);
  const [selectedBook, setSelectedBook] = useState(0);
  const [msg, setMsg] = useState("");
  const [mobileNo, setMobileNo] = useState("8248189924");
  const phoneNumber = "8248189924";
  const [phoneAlertMsg, setPhoneAlertMsg] = useState(false);
  const [whatsappAlertMsgBox, setWhatsappAlertMsgBox] = useState(false);
  const [whatsappAlertMsg, setWhatsappAlertMsg] = useState("");
  const [selectedBookLink, setSelectedBookLink] = useState(
    "download-trading-in-the-zone-pdf"
  );
  const bookData = [
    {
      name: "Trading in the zone",
      author: "Mark Douglas",
      link: "/download-trading-in-the-zone-pdf",
    },
    {
      name: "Day trade for living",
      author: "Andrew Aziz",
      link: "download-day-trade-for-a-living-pdf",
    },
    {
      name: "The candlestick",
      author: "Steve Nison",
      link: "download-ultimate-candlesticks-pdf",
    },
    {
      name: "Trading guide",
      author: "Ashwin-Sriram",
      link: "download-trading-guide-pdf",
    },
  ];

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

  useEffect(() => {
    if (register) {
      setTimeout(() => {
        setRegister(false);
      }, 3000);
    }
  }, [register]);

  const bookHandler = (index, link) => {
    setSelectedBook(index);
    setSelectedBookLink(link);
  };

  const downloadPdf = async () => {
    if (!token) {
      setRegister(true);
      return;
    }
    setBtnLoader(true);
    const url = `${config.apiurl}/book/${selectedBookLink}`;
    // const url = `http://192.168.1.8:3000/api/book/download-trading-guide-pdf`;
    Linking.openURL(url);
    setBtnLoader(false);
  };

  const handleCallClick = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          setPhoneAlertMsg(true);
          setTimeout(() => {
            setPhoneAlertMsg(false);
          }, 3000);
          console.error("Phone number is not supported");
        }
      })
      .catch((err) => {
        setPhoneAlertMsg(true);
        setTimeout(() => {
          setPhoneAlertMsg(false);
        }, 3000);
        console.error("An error occurred", err);
      });
  };

  const sendOnWhatsApp = () => {
    if (msg) {
      let url = "whatsapp://send?phone=91" + mobileNo + "&text=" + msg;
      Linking.openURL(url)
        .then(() => {
          setTimeout(() => {
            setMsg("");
          }, 3000);
        })
        .catch(() => {
          setWhatsappAlertMsgBox(true);
          setWhatsappAlertMsg("Make sure WhatsApp is installed on your device");
          setTimeout(() => {
            setWhatsappAlertMsgBox(false);
            setWhatsappAlertMsg("");
          }, 3000);
        });
    } else {
      setWhatsappAlertMsgBox(true);
      setWhatsappAlertMsg("Please enter a message");
      setTimeout(() => {
        setWhatsappAlertMsgBox(false);
        setWhatsappAlertMsg("");
      }, 3000);
    }
  };

  return (
    <ScrollView
      style={styles.scrollMainContainer}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.mainBookCont}>
        <View style={styles.mainBookContLeft}>
          {selectedBook === 0 ? (
            <Image
              source={require("../../../images/pictures/bookCover0.png")}
              style={styles.bookImg}
            />
          ) : selectedBook === 1 ? (
            <Image
              source={require("../../../images/pictures/bookCover1.png")}
              style={styles.bookImg}
            />
          ) : selectedBook === 2 ? (
            <Image
              source={require("../../../images/pictures/bookCover2.png")}
              style={styles.bookImg}
            />
          ) : selectedBook === 3 ? (
            <Image
              source={require("../../../images/pictures/bookCover3.png")}
              style={styles.bookImg}
            />
          ) : (
            ""
          )}
          <ButtonComponent
            style={{
              height: "auto",
              alignSelf: "center",
              justifyContent: "center",
              marginTop: "10%",
              paddingHorizontal: 15,
              paddingVertical: 6,
            }}
            indicator={btnLoader}
            text={"download"}
            handler={downloadPdf}
          />
        </View>
        <View style={{ width: "50%", paddingVertical: 10 }}>
          {/* <Text style={styles.contentHeadingText}>Resources</Text> */}
          <ScrollView style={styles.contentSubCont}>
            {bookData.map((book, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.contents,
                  {
                    backgroundColor:
                      selectedBook === index ? "#333" : Colors.clr2,
                  },
                ]}
                onPress={() => {
                  bookHandler(index, book.link);
                }}
              >
                <View style={styles.contentsCenter}>
                  <Text style={styles.contentsCenterText1}>{book.name}</Text>
                  <Text style={styles.contentsCenterText2}>{book.author}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <View style={styles.doubtsCont}>
        <Text style={styles.contentHeadingText}>
          Ask us any trading related doubts, we'll clear your doubts
        </Text>
        <View style={styles.doubtsContSub}>
          {/* <Text style={styles.contentsCenterText1}>
            Ask us any trading related doubts, we'll clear your doubts
          </Text> */}
          <View style={styles.callCont}>
            <Text style={[styles.contentsCenterText1, { width: "65%" }]}>
              Feel free to call us...
            </Text>
            <ButtonComponent
              text={"Call"}
              style={{
                paddingVertical: 5,
                paddingHorizontal: 15,
              }}
              fontStyle={{ fontSize: calculateFontSize(1.8) }}
              handler={handleCallClick}
            />
          </View>
          <Text
            style={[
              styles.contentsCenterText1,
              { marginTop: "5%", marginBottom: "4%" },
            ]}
          >
            or send your doubts here,
          </Text>

          <View style={styles.loginSubCont2}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              placeholder="Enter your doubts"
              placeholderTextColor="#999"
              textAlignVertical="top"
              multiline={true}
              numberOfLines={4} // You can adjust the number of lines displayed
              value={msg}
              onChangeText={(text) => setMsg(text)}
            />
            <ButtonComponent
              style={{ paddingVertical: 5, paddingHorizontal: 15 }}
              text={"Send"}
              handler={sendOnWhatsApp}
            />
          </View>
        </View>
      </View>

      <CustomAlertMsgBox
        visible={register}
        message="please register for free to download"
      />

      <CustomAlertMsgBox
        visible={phoneAlertMsg}
        message="Unable to make a call; please try again later"
      />

      <CustomAlertMsgBox
        visible={whatsappAlertMsgBox}
        message={whatsappAlertMsg}
      />
    </ScrollView>
  );
}

export default ResourcesScreen;

const styles = StyleSheet.create({
  scrollMainContainer: {
    width: "100%",
    height: "100%",
    flexGrow: 1,
    backgroundColor: Colors.mainBgClr,
  },
  mainBookCont: {
    height: 330,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    backgroundColor: Colors.transparentBg,
  },
  mainBookContLeft: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  bookImg: {
    width: "80%",
    height: "70%",
  },

  contentHeadingText: {
    width: "100%",
    alignSelf: "flex-end",
    fontSize: calculateFontSize(2),
    fontWeight: "500",
    color: Colors.clr4,
    marginBottom: "2%",
  },

  contentSubCont: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "column",
    // backgroundColor: "blue",
  },

  contents: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: Colors.clr2,
    borderRadius: 10,
    // borderColor: Colors.clr3,
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
    fontSize: calculateFontSize(2),
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
    fontSize: calculateFontSize(1.8),
    fontWeight: "400",
    color: "#fff",
    marginBottom: 5,
  },
  contentsCenterText2: {
    fontSize: calculateFontSize(1.4),
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

  doubtsCont: {
    height: "auto",
    width: "95%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "10%",
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: Colors.transparentBg,
  },
  doubtsContSub: {
    width: "100%",
    height: "auto",
    // backgroundColor: "blue",
  },
  callCont: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "5%",
    // backgroundColor: "red",
  },

  loginSubCont2: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },

  input: {
    width: "65%",
    height: 100,
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
