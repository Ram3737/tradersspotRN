import {
  View,
  Text,
  Linking,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { config } from "../../../webServices/config";

import CommonStyles from "../../../components/css/commonStyles";
import Colors from "../../../components/colors/colors";
import CustomAlertMsgBox from "../../../components/customAlertBox/customAlertMsgBox";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";
import calculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import { AuthContext } from "../../../components/stores/context/authContextProvider";

function ResourcesScreen() {
  const authCtx = useContext(AuthContext);
  const [btnLoader, setBtnLoader] = useState(false);
  const [register, setRegister] = useState(false);
  const [selectedBook, setSelectedBook] = useState(0);
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
    if (!authCtx.token) {
      setRegister(true);
      return;
    }
    setBtnLoader(true);
    const url = `${config.apiurl}/book/${selectedBookLink}`;
    Linking.openURL(url);
    // const url = "http://192.168.1.8:3000/api/book/downloadPdf";
    // const fileUri = FileSystem.documentDirectory + "Trading-guide.pdf";

    // try {
    //   const { uri } = await FileSystem.downloadAsync(url, fileUri);

    //   // Open the downloaded PDF file
    //   await Sharing.shareAsync(uri, {
    //     mimeType: "application/pdf",
    //     dialogTitle: "Share PDF",
    //   });
    // } catch (error) {
    //   console.error("Error downloading PDF:", error);
    // }
    setBtnLoader(false);
  };

  return (
    <View
      style={[
        CommonStyles.mainContainer,
        { justifyContent: "flex-start", paddingHorizontal: 0 },
      ]}
    >
      <CustomAlertMsgBox
        visible={register}
        message="please register for free to download"
      />

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

      <View style={styles.contentCont}>
        <Text style={styles.contentHeadingText}>Resources</Text>
      </View>
    </View>
  );
}

export default ResourcesScreen;

const styles = StyleSheet.create({
  mainBookCont: {
    height: 330,
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
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

  contentCont: {
    flex: 1,
    width: "100%",
    marginTop: "7%",
    paddingBottom: 10,
    // backgroundColor: "red",
  },
  contentHeadingText: {
    alignSelf: "center",
    fontSize: calculateFontSize(2.2),
    fontWeight: "500",
    color: Colors.clr4,
    paddingLeft: 10,
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
