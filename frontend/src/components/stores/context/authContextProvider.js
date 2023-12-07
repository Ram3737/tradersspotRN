import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: "",
  paid: "",
  courseType: "",
  userType: "",
  userEmail: "",
  registerSignupToggle: "",
  userSelectedCourse: "",
  authenticationHandler: () => {},
  setPaid: () => {},
  setCourseType: () => {},
  setUserType: () => {},
  setUserEmail: () => {},
  setRegisterSignupToggle: () => {},
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
    userSelectedCourse: userSelectedCourse,
    setUserEmail: setUserEmail,
    setPaid: setPaid,
    setCourseType: setCourseType,
    setUserType: setUserType,
    setRegisterSignupToggle: setRegisterSignupToggle,
    setUserSelectedCourse: setUserSelectedCourse,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
