import { takeLatest, call, put, select } from 'redux-saga/effects';
import request from '../../utils/request';
import { fetchMessagesError, fetchMessagesSuccess } from './actions';
import homePage from './selectors';
import { FETCH_MESSAGES } from './constants';

// Individual exports for testing
export function* fetchMessages() {
  const { currentPage } = yield select(homePage());
  const requestURL = `/api/messages/${currentPage}`;
  try {
    const response = yield call(request, requestURL, {
      method: 'GET',
      credentials: 'same-origin',
    });
    return yield put(fetchMessagesSuccess(response));
  } catch (err) {
    return yield put(fetchMessagesError(err));
  }
}

export function* fetchMessagesData() {
  yield takeLatest(FETCH_MESSAGES, fetchMessages);
}

// All sagas to be loaded
export default [
  fetchMessagesData,
];
