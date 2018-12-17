import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import { elevateLines } from './surviveActions';

function* addLineSaga(action) {
  yield delay(25);
  yield put(elevateLines());
}

function* rootSaga() {
  yield takeEvery('APPEND_LINE', addLineSaga);
}

export default rootSaga;