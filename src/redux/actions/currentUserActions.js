export default {
  loginSuccess: () => ({ type: "LOGIN_SUCCESS" }),
  gotUserInfo: userData => ({ type: "GOT_USER_INFO", payload: userData }),
  loginFail: error => ({type: "LOGIN_FAIL"}),
  logOut: () => ({type: "LOGOUT"})
};
