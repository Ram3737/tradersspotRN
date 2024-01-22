import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

import CommonStyles from "../../../components/css/commonStyles";
import CommonTable from "../../../components/table/commonTable";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import Colors from "../../../components/colors/colors";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function UserAuthenticationScreen() {
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchedText, setSearchedText] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(1);
  const [allUsersLoader, setAllUsersLoader] = useState(false);
  const itemsPerPage = 10;

  function getAllUsers(page = 1) {
    if (searchedText) {
      CallGetApiServices(
        `/user/getAllUsers?search=${searchedText}&page=${page}`,
        (response) => {
          if (response.status === 200) {
            console.log(response.data);
            setUsersData(response.data.users);
            setTotalUsers(response.data.totalUsers);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      setAllUsersLoader(true);
      CallGetApiServices(
        `/user/getAllUsers?page=${page}`,
        (response) => {
          if (response.status === 200) {
            setAllUsersLoader(false);
            console.log(response.data);
            setUsersData(response.data.users);
            setTotalUsers(response.data.totalUsers);
          }
        },
        (err) => {
          setAllUsersLoader(false);
          console.log(err);
        }
      );
    }
  }

  useEffect(() => {
    getAllUsers(currentPage);
  }, [currentPage, searchedText]);

  const handlePageChangePrevious = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageChangeNext = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <View style={CommonStyles.mainContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="#fff"
        value={searchedText}
        onChangeText={(text) => setSearchedText(text.toLowerCase())}
      />
      {allUsersLoader ? (
        <ActivityIndicator
          size="small"
          color={Colors.clr4}
          style={{ marginTop: "20%" }}
        />
      ) : (
        <CommonTable
          currentPage={currentPage}
          usersData={usersData}
          getAllUsers={getAllUsers}
        />
      )}
      {usersData.length === 0 && (
        <View>
          <Text
            style={{
              fontSize: CalculateFontSize(1.8),
              marginTop: "50%",
              marginBottom: "20%",
              alignSelf: "center",
              color: "#fff",
            }}
          >
            No data
          </Text>
        </View>
      )}
      <View style={styles.paginationCont}>
        <ButtonComponent
          text={"<"}
          handler={() => handlePageChangePrevious(currentPage - 1)}
          disabled={currentPage === 1}
        />
        <View style={styles.pageNoCont}>
          <Text>{currentPage}</Text>
        </View>
        <ButtonComponent
          text={">"}
          handler={() => handlePageChangeNext(currentPage + 1)}
          disabled={currentPage * 10 >= totalUsers}
        />
      </View>
    </View>
  );
}

export default UserAuthenticationScreen;

const styles = StyleSheet.create({
  paginationCont: {
    width: 150,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
  },
  pageNoCont: {
    padding: 9,
    backgroundColor: "#999",
    borderRadius: 5,
  },
  input: {
    width: "60%",
    height: 40,
    alignSelf: "flex-start",
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 5,
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 10,
    marginLeft: "5%",
    marginBottom: "3%",
    marginTop: "5%",
  },
});
