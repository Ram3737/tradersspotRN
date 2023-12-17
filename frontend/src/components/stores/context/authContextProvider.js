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
  intradayAnalysisStats: "",
  freeAnalysisStats: "",
  intradayAnalysisLoader: "",
  freeAnalysisLoader: "",
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
  const [intradayAnalysisStats, setIntradayAnalysisStats] = useState({});
  const [freeAnalysisStats, setFreeAnalysisStats] = useState({});
  const [intradayAnalysisLoader, setIntradayAnalysisLoader] = useState(false);
  const [freeAnalysisLoader, setFreeAnalysisLoader] = useState(false);

  function authenticationHandler() {
    setIsAuthenticated(!isAuthenticated);
  }

  function intradayAnalysisStatsFn() {
    setIntradayAnalysisLoader(true);
    CallGetApiServices(
      `/analysis/sumRiskRewardIntraday`,
      (response) => {
        if (response.status === 200) {
          setIntradayAnalysisStats(response.data);
          setIntradayAnalysisLoader(false);
        }
      },
      (err) => {
        setIntradayAnalysisLoader(false);
        console.log("fetching intraday analysis stats err", err);
      }
    );
  }

  function freeAnalysisStatsFn() {
    setFreeAnalysisLoader(true);
    CallGetApiServices(
      `/analysis/sumRiskRewardFree`,
      (response) => {
        if (response.status === 200) {
          setFreeAnalysisStats(response.data);
          setFreeAnalysisLoader(false);
        }
      },
      (err) => {
        setFreeAnalysisLoader(false);
        console.log("fetching free analysis stats err", err);
      }
    );
  }

  useEffect(() => {
    intradayAnalysisStatsFn();
    freeAnalysisStatsFn();
  }, []);

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
    intradayAnalysisStats: intradayAnalysisStats,
    freeAnalysisStats: freeAnalysisStats,
    intradayAnalysisLoader: intradayAnalysisLoader,
    freeAnalysisLoader: freeAnalysisLoader,
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
