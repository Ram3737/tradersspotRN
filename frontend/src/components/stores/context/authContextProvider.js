import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: "",
  paid: "",
  courseType: "",
  userType: "",
  userEmail: "",
  registerSignupToggle: "",
  buyingWithoutLogin: "",
  buyingWithoutLogin1: "",
  userSelectedCourse: "",
  authenticationHandler: () => {},
  setPaid: () => {},
  setCourseType: () => {},
  setUserType: () => {},
  setUserEmail: () => {},
  setRegisterSignupToggle: () => {},
  setBuyingWithoutLogin: () => {},
  setBuyingWithoutLogin1: () => {},
  setUserSelectedCourse: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paid, setPaid] = useState(false);
  const [courseType, setCourseType] = useState(null);
  const [userType, setUserType] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [registerSignupToggle, setRegisterSignupToggle] = useState(false);
  const [userSelectedCourse, setUserSelectedCourse] = useState(null);
  const [buyingWithoutLogin, setBuyingWithoutLogin] = useState(false);
  const [buyingWithoutLogin1, setBuyingWithoutLogin1] = useState(false);

  function authenticationHandler() {
    setIsAuthenticated(!isAuthenticated);
  }

  function logout() {
    setIsAuthenticated(false);
    setPaid(false);
    setCourseType(false);
    setUserType(false);
    setUserEmail(false);
  }

  const value = {
    isAuthenticated: isAuthenticated,
    paid: paid,
    authenticationHandler: authenticationHandler,
    courseType: courseType,
    userType: userType,
    userEmail: userEmail,
    registerSignupToggle: registerSignupToggle,
    buyingWithoutLogin: buyingWithoutLogin,
    buyingWithoutLogin1: buyingWithoutLogin1,
    userSelectedCourse: userSelectedCourse,
    setUserEmail: setUserEmail,
    setPaid: setPaid,
    setCourseType: setCourseType,
    setUserType: setUserType,
    setRegisterSignupToggle: setRegisterSignupToggle,
    setBuyingWithoutLogin: setBuyingWithoutLogin,
    setBuyingWithoutLogin1: setBuyingWithoutLogin1,
    setUserSelectedCourse: setUserSelectedCourse,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
