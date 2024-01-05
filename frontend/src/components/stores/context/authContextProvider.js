import { createContext, useEffect, useState } from "react";
import { CallGetApiServices } from "../../../webServices/apiCalls";

export const AuthContext = createContext({
  isAuthenticated: "",
  token: "",
  paid: "",
  courseType: "",
  userType: "",
  userEmail: "",
  triedToUpdate: "",
  registerSignupToggle: "",
  userSelectedCourse: "",
  swingAnalysisStats: "",
  freeSwingAnalysisStats: "",
  allBreakoutAnalyses: "",
  swingAnalysisLoader: "",
  freeSwingAnalysisLoader: "",
  authenticationHandler: () => {},
  setToken: () => {},
  setPaid: () => {},
  setCourseType: () => {},
  setUserType: () => {},
  setUserEmail: () => {},
  setTriedToUpdate: () => {},
  setRegisterSignupToggle: () => {},
  setUserSelectedCourse: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [paid, setPaid] = useState(false);
  const [courseType, setCourseType] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [registerSignupToggle, setRegisterSignupToggle] = useState(false);
  const [userSelectedCourse, setUserSelectedCourse] = useState(null);
  const [triedToUpdate, setTriedToUpdate] = useState(false);
  const [swingAnalysisStats, setSwingAnalysisStats] = useState({});
  const [freeSwingAnalysisStats, setFreeSwingAnalysisStats] = useState({});
  const [allBreakoutAnalyses, setAllBreakoutAnalyses] = useState([]);
  const [swingAnalysisLoader, setSwingAnalysisLoader] = useState(false);
  const [freeSwingAnalysisLoader, setFreeSwingAnalysisLoader] = useState(false);

  function authenticationHandler() {
    setIsAuthenticated(!isAuthenticated);
  }

  function swingAnalysisStatsFn() {
    setSwingAnalysisLoader(true);
    CallGetApiServices(
      `/analysis/sumRiskRewardSwing`,
      (response) => {
        if (response.status === 200) {
          setSwingAnalysisStats(response.data);
          setSwingAnalysisLoader(false);
        }
      },
      (err) => {
        setSwingAnalysisLoader(false);
        console.log("fetching intraday analysis stats err", err);
      }
    );
  }

  function freeSwingAnalysisStatsFn() {
    setFreeSwingAnalysisLoader(true);
    CallGetApiServices(
      `/analysis/sumRiskRewardFreeSwing`,
      (response) => {
        if (response.status === 200) {
          setFreeSwingAnalysisStats(response.data);
          setFreeSwingAnalysisLoader(false);
        }
      },
      (err) => {
        setFreeSwingAnalysisLoader(false);
        console.log("fetching free analysis stats err", err);
      }
    );
  }

  useEffect(() => {
    swingAnalysisStatsFn();
    freeSwingAnalysisStatsFn();
  }, []);

  useEffect(() => {
    if (swingAnalysisStats.onlyBreakoutAnalyses && freeSwingAnalysisStats) {
      const mergeAllBreakoutAnalyses =
        swingAnalysisStats.onlyBreakoutAnalyses.concat(
          freeSwingAnalysisStats.onlyBreakoutAnalyses
        );
      setAllBreakoutAnalyses(mergeAllBreakoutAnalyses);
    }
  }, [swingAnalysisStats, freeSwingAnalysisStats]);

  function logout() {
    setIsAuthenticated(false);
    setPaid(false);
    setCourseType(false);
    setUserType(false);
    setUserEmail(false);
    setUserSelectedCourse(null);
    setToken(null);
    setTriedToUpdate(false);
  }

  const value = {
    isAuthenticated: isAuthenticated,
    token: token,
    paid: paid,
    authenticationHandler: authenticationHandler,
    courseType: courseType,
    userType: userType,
    userEmail: userEmail,
    triedToUpdate: triedToUpdate,
    registerSignupToggle: registerSignupToggle,
    userSelectedCourse: userSelectedCourse,
    swingAnalysisStats: swingAnalysisStats,
    freeSwingAnalysisStats: freeSwingAnalysisStats,
    allBreakoutAnalyses: allBreakoutAnalyses,
    swingAnalysisLoader: swingAnalysisLoader,
    freeSwingAnalysisLoader: freeSwingAnalysisLoader,
    setUserEmail: setUserEmail,
    setToken: setToken,
    setPaid: setPaid,
    setCourseType: setCourseType,
    setUserType: setUserType,
    setRegisterSignupToggle: setRegisterSignupToggle,
    setUserSelectedCourse: setUserSelectedCourse,
    setTriedToUpdate: setTriedToUpdate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
