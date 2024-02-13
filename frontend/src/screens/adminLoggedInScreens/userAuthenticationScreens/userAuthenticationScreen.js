import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";

import { MaterialIcons } from "@expo/vector-icons";

import CommonStyles from "../../../components/css/commonStyles";
import CommonTable from "../../../components/table/commonTable";
import { CallGetApiServices } from "../../../webServices/apiCalls";
import Colors from "../../../components/colors/colors";
import CalculateFontSize from "../../../components/calculateFontSize/calculateFontSize";
import ButtonComponent from "../../../components/buttonComponent/buttonComponent";

function UserAuthenticationScreen() {
  const tabsArray = ["All", "Lead", "LeadUpdate", "Paid", "JustRegister"];
  const [usersData, setUsersData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchedText, setSearchedText] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(1);
  const [allUsersLoader, setAllUsersLoader] = useState(false);
  const [viewFilterCont, setViewFilterCont] = useState(false);
  const [filterTab, setFilterTab] = useState("All");
  const [courseType, setCourseType] = useState(null);
  const [ttu, setTtu] = useState(null);
  const [paid, setPaid] = useState(null);
  const itemsPerPage = 10;

  function getAllUsers(page = 1) {
    if (searchedText) {
      CallGetApiServices(
        `/user/get-all-users?search=${searchedText}&page=${page}`,
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
        `/user/get-all-users?page=${page}&courseType=${courseType}&ttu=${ttu}&paid=${paid}`,
        (response) => {
          if (response.status === 200) {
            setAllUsersLoader(false);
            // console.log(response.data);
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

  useEffect(() => {
    getAllUsers();
  }, [courseType, ttu, paid]);

  function tabPressHandler(pressedTab) {
    setFilterTab(pressedTab);
    if (pressedTab === "All") {
      setCourseType(null);
      setTtu(null);
      setPaid(null);
    } else if (pressedTab === "Lead") {
      setCourseType(`basic,standard,pro`);
      setPaid(false);
      setTtu(null);
    } else if (pressedTab === "LeadUpdate") {
      setCourseType(`basic,standard,pro`);
      setPaid(true);
      setTtu(true);
    } else if (pressedTab === "Paid") {
      setCourseType(`basic,standard,pro`);
      setPaid(true);
      setTtu(false);
    } else if (pressedTab === "JustRegister") {
      setCourseType(`none`);
      setPaid(false);
      setTtu(false);
    }
  }

  function viewFilterTabHandler() {
    setViewFilterCont(!viewFilterCont);
    setCourseType(null);
    setTtu(null);
    setPaid(null);
    setFilterTab("All");
  }

  const handlePageChangePrevious = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageChangeNext = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <View style={CommonStyles.mainContainer}>
      <ScrollView nestedScrollEnabled={true} style={styles.scrollUserCont}>
        <View style={styles.searchCont}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#fff"
            value={searchedText}
            onChangeText={(text) => {
              setSearchedText(text.toLowerCase());
              if (viewFilterCont) {
                setViewFilterCont(false);
              }
            }}
          />
          <MaterialIcons
            name={"filter-list"}
            size={25}
            color={Colors.btnClr}
            onPress={viewFilterTabHandler}
          />
        </View>
        {viewFilterCont && (
          <View style={styles.tabContFilt}>
            <ScrollView style={styles.tabSubContFilt} horizontal={true}>
              {tabsArray.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tabFilt,
                    {
                      backgroundColor:
                        filterTab === tab ? Colors.clr4 : "transparent",
                    },
                  ]}
                  onPress={() => tabPressHandler(tab)}
                >
                  <Text
                    style={[
                      styles.tabTextFilt,
                      {
                        color: filterTab === tab ? "#000" : "#fff",
                        fontWeight: filterTab === tab ? "500" : "300",
                      },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
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
        {usersData.length === 0 && !allUsersLoader && (
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
      </ScrollView>
    </View>
  );
}

export default UserAuthenticationScreen;

const styles = StyleSheet.create({
  scrollUserCont: {
    flex: 1,
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  paginationCont: {
    width: 150,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: "10%",
    marginBottom: 10,
  },
  pageNoCont: {
    padding: 9,
    backgroundColor: "#999",
    borderRadius: 5,
  },
  searchCont: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    // backgroundColor: "red",
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
    // marginLeft: "5%",
    marginBottom: "3%",
    marginTop: "5%",
  },
  tabContFilt: {
    height: 30,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // backgroundColor: "blue",
  },
  tabSubContFilt: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    // backgroundColor: "red",
  },
  tabFilt: {
    width: "auto",
    height: "80%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 30,
    borderColor: Colors.clr5,
    borderWidth: 0.8,
    marginRight: 10,
  },

  tabTextFilt: {
    fontSize: CalculateFontSize(1.6),
    fontWeight: "300",
    color: "#fff",
  },
});
