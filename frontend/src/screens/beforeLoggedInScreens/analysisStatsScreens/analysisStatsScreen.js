import { View, Text, Linking } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { config } from "../../../webServices/config";

import CommonStyles from "../../../components/css/commonStyles";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function AnalysisStatsScreen() {
  const downloadPdf = async () => {
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
  };

  return (
    <View style={CommonStyles.mainContainer}>
      <Text style={{ color: "#fff" }}>analysis stats screen</Text>
      <ButtonComponent text={"download"} handler={downloadPdf} />
    </View>
  );
}

export default AnalysisStatsScreen;
