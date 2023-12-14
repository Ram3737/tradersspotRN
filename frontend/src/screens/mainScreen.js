import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../components/colors/colors";

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
import AdminAnalysisScreen from "./adminLoggedInScreens/adminAnalysisScreen/adminAnalysis";
import UserAuthenticationScreen from "./adminLoggedInScreens/userAuthenticationScreens/userAuthenticationScreen";
import { AuthContext } from "../components/stores/context/authContextProvider";

const stack = createNativeStackNavigator();
const bottomTab = createBottomTabNavigator();

function BottomNavigatorAfterLoggedIn() {
  return (
    <bottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.mainBgClr,
          // borderColor: Colors.mainBgClr,
        },
      }}
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
    </bottomTab.Navigator>
  );
}

function BottomNavigatorBeforeLoggedIn() {
  return (
    <bottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.mainBgClr,
          // borderColor: Colors.mainBgClr,
        },
      }}
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
    </bottomTab.Navigator>
  );
}

function BottomNavigatorAdminLoggedIn() {
  return (
    <bottomTab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.mainBgClr,
          // borderColor: Colors.mainBgClr,
        },
      }}
    >
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
  return (
    <NavigationContainer>
      {authCtx.isAuthenticated && authCtx.courseType && authCtx.paid ? (
        <AfterLogin />
      ) : authCtx.userType === "admin" ? (
        <AdminLogin />
      ) : (
        <BeforeLogin />
      )}
    </NavigationContainer>
  );
}

export default MainScreen;
