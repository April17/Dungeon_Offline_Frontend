import { combineReducers } from "redux";
import heroStatusReducer from "./heroStatusReducer"
import monsterStatusReducer from "./monsterStatusReducer"
import currentUserReducer from "./currentUserReducer"
import logInReducer from "./logInReducer"
import utilityReducer from "./utilityReducer"
import feedReducer from "./feedReducer"
import worldReducer from "./worldReducer"




export default combineReducers({
  status: heroStatusReducer,
  worldInfo: worldReducer,
  monsterStatus: monsterStatusReducer,
  currentUser: currentUserReducer,
  utilityReducer: utilityReducer,
  feed: feedReducer,
  logIn: logInReducer
});
