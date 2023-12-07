import { createContext, useState } from "react";

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

  function authenticationHandler() {
    setIsAuthenticated(!isAuthenticated);
  }

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
