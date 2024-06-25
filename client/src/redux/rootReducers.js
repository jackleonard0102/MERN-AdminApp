import { combineReducers } from "@reduxjs/toolkit";

import app from "./app/appSlice";
import auth from "./auth/authSlice";
import user from "./user/userSlice";
//Include all the reducer to combine and provide to configure store.

const rootReducer = {
    app,
    auth,
    user,
};

export default combineReducers(rootReducer);
