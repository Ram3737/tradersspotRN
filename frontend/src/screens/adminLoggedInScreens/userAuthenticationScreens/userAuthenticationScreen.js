import { View, Text, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import CommonStyles from "../../../components/css/commonStyles";
import CommonTable from "../../../components/table/commonTable";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function UserAuthenticationScreen() {
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchedText, setSearchedText] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(1);
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
      CallGetApiServices(
        `/user/getAllUsers?page=${page}`,
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
      <CommonTable usersData={usersData} getAllUsers={getAllUsers} />
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
