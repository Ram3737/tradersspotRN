import { View, Text } from "react-native";

import { CallGetApiServices } from "../../../webServices/apiCalls";
import CommonStyles from "../../../components/css/commonStyles";
import { useEffect, useState } from "react";

function AnalysisStatsScreen() {
  const [data, setData] = useState("");
  useEffect(() => {
    CallGetApiServices(
      `https://first-mern-y32l.onrender.com/feed/posts`,
      (response) => {
        if (response.status == 200) {
          console.log(response.data.posts[0].price);
          setData(response.data.posts[0].price);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <View style={CommonStyles.mainContainer}>
      <Text style={{ color: "#fff" }}>analysis stats screen</Text>
      <Text style={{ color: "#fff" }}>{data}</Text>
    </View>
  );
}

export default AnalysisStatsScreen;
