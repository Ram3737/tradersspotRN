import React from "react";
import { WebView } from "react-native-webview";
import { View, Text } from "react-native";

const TradingViewFullChart = () => {
  const uri =
    "https://www.tradingview.com/chart/?symbol=NIFTY&theme=dark&toolbar_bg=333333&enable_publishing=0";

  const renderError = (error) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Error loading chart: {error}</Text>
    </View>
  );

  return (
    <WebView
      source={{ uri }}
      style={{ flex: 1, backgroundColor: "#fff" }}
      renderError={(error) => renderError(error)}
    />
  );
};

export default TradingViewFullChart;
