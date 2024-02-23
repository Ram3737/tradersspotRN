import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../components/colors/colors";

import AsyncStorage from "@react-native-async-storage/async-storage";

import loginAndSignupScreen from "./loginAndSignupScreen/loginAndSignupScreen";
import StarterScreen from "./starterScreen/starterScreen";
import MyCoursesScreen from "./loggedInScreens/myCoursesScreen/myCoursesScreen";
import MarketScreen from "./loggedInScreens/marketScreen/marketScreen";
import AnalysisScreen from "./loggedInScreens/analysisScreen/analysisScreen";
import DiscussScreen from "./loggedInScreens/discussScreen/discussScreen";
import DashboardScreen from "./beforeLoggedInScreens/dashboardScreens/dashboardScreen";
import AnalysisStatsScreen from "./beforeLoggedInScreens/analysisStatsScreens/analysisStatsScreen";
import OurCoursesScreen from "./beforeLoggedInScreens/ourCoursesScreens/ourCoursesScreen";
import ResourcesScreen from "./beforeLoggedInScreens/resources/resourcesScreen";
import AdminHomeScreen from "./adminLoggedInScreens/adminHome/adminHomeScreen";
import AdminAnalysisScreen from "./adminLoggedInScreens/adminAnalysisScreen/adminAnalysis";
import UserAuthenticationScreen from "./adminLoggedInScreens/userAuthenticationScreens/userAuthenticationScreen";
import LearningsScreen from "./beforeLoggedInScreens/learningsScreen/learningsScreen";
import { AuthContext } from "../components/stores/context/authContextProvider";

const stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

function BottomNavigatorAfterLoggedIn() {
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors.mainBgClr,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "myCourses") {
            iconName = focused ? "book-open" : "book-outline";
          } else if (route.name === "Analysis") {
            iconName = focused ? "chart-line" : "chart-line-variant";
          } else if (route.name === "Market") {
            iconName = focused ? "store" : "store-outline";
          } else if (route.name === "Discuss") {
            iconName = focused ? "comment" : "comment-outline";
          } else if (route.name === "Upgrade") {
            iconName = focused ? "arrow-up-bold" : "arrow-up-bold-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Colors.btnClr,
      })}
    >
      <bottomTab.Screen
        name="myCourses"
        component={MyCoursesScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="Analysis"
        component={AnalysisScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="Market"
        component={MarketScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="Discuss"
        component={DiscussScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="Upgrade"
        component={OurCoursesScreen}
        options={{ headerShown: false }}
      />
    </bottomTab.Navigator>
  );
}

function BottomNavigatorBeforeLoggedIn() {
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors.mainBgClr,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "analysis Stats") {
            iconName = focused ? "chart-bar" : "chart-line-variant";
          } else if (route.name === "resources") {
            iconName = focused ? "book-open" : "book-open-outline";
          } else if (route.name === "courses") {
            iconName = focused ? "school" : "school-outline";
          } else if (route.name === "learnings") {
            iconName = focused ? "book-open-variant" : "book-open-variant";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Colors.btnClr,
      })}
    >
      <bottomTab.Screen
        name="dashboard"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="analysis Stats"
        component={AnalysisStatsScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="resources"
        component={ResourcesScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="courses"
        component={OurCoursesScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="learnings"
        component={LearningsScreen}
        options={{ headerShown: false }}
      />
    </bottomTab.Navigator>
  );
}

function BottomNavigatorAdminLoggedIn() {
  return (
    <bottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: Colors.mainBgClr,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "admin home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "admin analysis") {
            iconName = focused ? "briefcase" : "briefcase-outline";
          } else if (route.name === "user authentication") {
            iconName = focused ? "account" : "account-outline";
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Colors.btnClr,
      })}
    >
      <bottomTab.Screen
        name="admin home"
        component={AdminHomeScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="admin analysis"
        component={AdminAnalysisScreen}
        options={{ headerShown: false }}
      />
      <bottomTab.Screen
        name="user authentication"
        component={UserAuthenticationScreen}
        options={{ headerShown: false }}
      />
    </bottomTab.Navigator>
  );
}

function BeforeLogin() {
  return (
    <stack.Navigator>
      {/* <stack.Screen
        name="starter"
        component={StarterScreen}
        options={{ headerShown: false }}
      /> */}
      <stack.Screen
        name="beforeLoggedIn"
        component={BottomNavigatorBeforeLoggedIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
      <stack.Screen
        name="loginSignup"
        component={loginAndSignupScreen}
        options={{
          headerTitle: "",
          headerTransparent: true,
          headerLeft: null,
          headerBackVisible: false,
        }}
      />
    </stack.Navigator>
  );
}

function AfterLogin() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="afterLoggedIn"
        component={BottomNavigatorAfterLoggedIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </stack.Navigator>
  );
}

function AdminLogin() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="adminLoggedIn"
        component={BottomNavigatorAdminLoggedIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </stack.Navigator>
  );
}

function MainScreen() {
  const authCtx = useContext(AuthContext);
  const [token, setToken] = useState(null);
  const [paid, setPaid] = useState(null);
  const [courseType, setCourseType] = useState(null);
  const [userType, setUserType] = useState(null);

  const fetchData = async () => {
    try {
      const tkn = await AsyncStorage.getItem("token");
      const pid = await AsyncStorage.getItem("paid");
      const cType = await AsyncStorage.getItem("courseType");
      const uType = await AsyncStorage.getItem("userType");
      const convertedPaid = JSON.parse(pid);

      setToken(tkn);
      setPaid(convertedPaid);
      setCourseType(cType);
      setUserType(uType);
    } catch (error) {
      console.error("Error fetching data from AsyncStorage:", error);
    }
  };

  useLayoutEffect(() => {
    fetchData();
  });

  // console.log("tkn", token);
  // console.log("paid", paid);
  // console.log("ct", courseType);
  // console.log("ut", userType);

  return (
    <NavigationContainer>
      {token && courseType !== "none" && paid ? (
        <AfterLogin />
      ) : token && userType === "admin" ? (
        <AdminLogin />
      ) : (
        <BeforeLogin />
      )}
    </NavigationContainer>
  );
}

export default MainScreen;
