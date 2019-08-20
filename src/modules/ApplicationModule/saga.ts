import { actions } from "./actions";
import { all, put, take, takeLeading } from "redux-saga/effects";

export function* saga() {
  yield takeLeading(actions.INITIALIZE, initializeWorker);
  yield takeLeading(
    actions.INITIALIZE_COMPLETE,
    initializeCompleteWorker
  );
}

const debug = false;
//const debug = true;

function* initializeWorker() {
  yield put(actions.INITIALIZE_COMPLETE());
}
function* initializeCompleteWorker() {
  if (debug) {
  }
}
