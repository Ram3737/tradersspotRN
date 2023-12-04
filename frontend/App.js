import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "./src/components/colors/colors";

import AuthContextProvider from "./src/components/stores/context/authContextProvider";
import MainScreen from "./src/screens/mainScreen";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.mainBgClr }}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.mainBgClr} />
      <AuthContextProvider>
        <MainScreen />
      </AuthContextProvider>
    </SafeAreaView>
  );
}
