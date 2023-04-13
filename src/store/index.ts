import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from './account/slice'

const rootReducer = combineReducers({
	account: accountReducer
})

const store = configureStore({
	reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
