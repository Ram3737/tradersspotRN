import { View, StyleSheet } from "react-native";

import { useContext } from "react";

import CommonStyles from "../../../components/css/commonStyles";
import { AuthContext } from "../../../components/stores/context/authContextProvider";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function AdminHomeScreen() {
  const authCtx = useContext(AuthContext);

  return (
    <View style={CommonStyles.mainContainer}>
      <ButtonComponent
        text={"Logout"}
        handler={() => {
          authCtx.logout();
        }}
      />
    </View>
  );
}

export default AdminHomeScreen;
