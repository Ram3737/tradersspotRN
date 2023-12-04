import { StyleSheet } from "react-native";

import WebView from "react-native-webview";
import Colors from "../colors/colors";

function TradingViewChartWidget() {
  const tradingViewWidget = `
  <div class="tradingview-widget-container" style="height:100%;width:100%">
    <div id="tradingview_2799b" style="height:calc(100% - 32px);width:100%"></div>
    <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
    <script type="text/javascript">
    new TradingView.widget(
    {
    "width": "100%",
    "height": "100%",
    "symbol": "FX:EURUSD",
    "interval": "1",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "locale": "in",
    "enable_publishing": false,
    "backgroundColor": "rgba(0, 0, 0, 0.3)",
    "gridColor": "rgba(0, 0, 0, 0.03)",
    "allow_symbol_change": true,
    "hide_top_toolbar": true,
    "container_id": "tradingview_2799b"
  }
    );
    </script>
  </div>
`;

  return <WebView style={styles.webV} source={{ html: tradingViewWidget }} />;
}

export default TradingViewChartWidget;

const styles = StyleSheet.create({
  webV: {
    backgroundColor: Colors.clr2,
    borderWidth: 0.5,
    borderRadius: 0.5,
    borderColor: Colors.clr2,
  },
});
