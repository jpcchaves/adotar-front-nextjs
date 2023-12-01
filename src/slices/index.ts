import { combineReducers } from "redux";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import AuthReducer from "./auth/login/reducer";
import ProfileReducer from "./auth/profile/reducer";
import AccountReducer from "./auth/register/reducer";

const rootReducer = combineReducers({
  Layout: LayoutReducer,
  Auth: AuthReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
});

export default rootReducer;
