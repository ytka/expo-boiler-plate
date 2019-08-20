import * as ApplicationModule from "./ApplicationModule";
import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";

export interface RootState {
  application: ApplicationModule.Application;
}

const sagas = [
  ApplicationModule.saga,
];

export function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)));
}

export default combineReducers<RootState>({
  application: ApplicationModule.reducer,
});
