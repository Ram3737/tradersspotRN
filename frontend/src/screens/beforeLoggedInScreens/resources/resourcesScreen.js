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
  const [categories, setCategories] = useState([1, 2, 3, 4, 5, 6]);
  const [btnLoader, setBtnLoader] = useState(false);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    if (register) {
      setTimeout(() => {
        setRegister(false);
      }, 3000);
    }
  }, [register]);

  const downloadPdf = async () => {
    if (!authCtx.isAuthenticated) {
      setRegister(true);
      return;
    }
    setBtnLoader(true);
    const url = `${config.apiurl}/book/downloadPdf`;
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
        <Image
          source={require("../../../images/pictures/ebook.png")}
          style={styles.bookImg}
        />
        <ButtonComponent
          style={{ height: "13%", alignSelf: "center" }}
          indicator={btnLoader}
          text={"download"}
          handler={downloadPdf}
        />
      </View>

      <View style={styles.contentCont}>
        <Text style={styles.contentHeadingText}>Resources</Text>
        <ScrollView style={styles.contentSubCont}>
          {categories.map((category, index) => (
            <View
              key={index}
              style={[
                styles.contents,
                {
                  backgroundColor:
                    index === 0 ? Colors.transparentBg : Colors.clr2,
                },
              ]}
            >
              <View style={styles.contentsLeft}>
                <Text style={styles.contentsLeftText}>1</Text>
              </View>
              <View style={styles.contentsCenter}>
                <Text style={styles.contentsCenterText1}>
                  Trading in the zone
                </Text>
                <Text style={styles.contentsCenterText2}>Mark Douglas</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default ResourcesScreen;

const styles = StyleSheet.create({
  mainBookCont: {
    height: 300,
    width: "95%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.clr3,
    backgroundColor: Colors.transparentBg,
  },
  bookImg: {
    width: "70%",
    height: "95%",
    marginLeft: "-13%",
    marginTop: "3.5%",
  },

  contentCont: {
    flex: 1,
    width: "100%",
    marginTop: "7%",
    paddingBottom: 10,
    // backgroundColor: "red",
  },
  contentHeadingText: {
    fontSize: calculateFontSize(3),
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
    fontSize: calculateFontSize(2.2),
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
    fontSize: calculateFontSize(2),
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
