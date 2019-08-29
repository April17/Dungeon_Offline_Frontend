export default {
  addChat: chatData => ({ type: "ADD_CHAT", payload: chatData }),
  addLog: logData => ({ type: "ADD_LOG", payload: logData }),
};
