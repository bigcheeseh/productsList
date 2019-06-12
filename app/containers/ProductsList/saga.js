import { call, put, fork, takeLatest } from 'redux-saga/effects';
import { GET_ITEMS, GET_ITEM } from './constants';
import {
  getItemsFailed,
  getItemsStart,
  getItemsSucceeded,
  getItemStart,
  getItemFailed,
  getItemSucceeded,
} from './actions';
import { DEV_URL } from '../../config';
import request from '../../utils/request';

export function* getItemsAsync(action) {
  const { limit, page } = action.payload;
  const skip = limit * page;
  yield put(getItemsStart());
  try {
    const pool = { limit, skip };
    const routeName = `${DEV_URL}/public/items`;
    const response = yield call(request, routeName, 'POST', { pool });
    const responseError = response.error || response.err;
    if (responseError) {
      return yield put(getItemsFailed(responseError));
    }
    return yield put(
      getItemsSucceeded({
        items: response.result,
        count: response.count,
        page,
      }),
    );
  } catch (error) {
    return yield put(getItemsFailed(error));
  }
}

export function* getItemAsync(action) {
  const id = action.payload;
  yield put(getItemStart());
  try {
    const pool = { id };
    const routeName = `${DEV_URL}/public/item`;
    const response = yield call(request, routeName, 'POST', { pool });
    const responseError = response.error || response.err;
    if (responseError) {
      return yield put(getItemFailed(responseError));
    }
    return yield put(getItemSucceeded(response.result));
  } catch (error) {
    return yield put(getItemFailed(error));
  }
}

export function* currentItemSaga() {
  yield fork(takeLatest, GET_ITEM, getItemAsync);
}

export default function* goodsSaga() {
  yield fork(takeLatest, GET_ITEMS, getItemsAsync);
}
