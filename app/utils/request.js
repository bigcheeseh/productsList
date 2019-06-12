import { call, put } from 'redux-saga/effects';
import { callLogout } from 'containers/LoginPage/saga';
import { errorNotification } from 'containers/Notifications/actions';
const { localStorage } = global.window;

function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, type, pool, json) {
  const { token } = localStorage;
  /* eslint-disable*/
  const options = pool
    ? {
      method: type,
      headers: token ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      } : {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(pool),
    } :  {
      method: type,
      headers: token ? {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      } : {
        'Content-Type': 'application/json',
      }
  };
  /* eslint-enable */
  return !json
    ? fetch(url, options).then(checkStatus).then(parseJSON) // eslint-disable-line
    : fetch(url, options).then(checkStatus);
}

export function* showError(error) {
  if (
    error.message === 'invalid token' ||
    error.message === 'jwt expired' ||
    error.message === 'No Authorization was found'
  ) {
    yield call(callLogout);
    yield put(
      errorNotification({
        message:
          error.message === 'No Authorization was found'
            ? 'Вы не авторизованы'
            : 'Истёк срок токена',
      }),
    );
  } else {
    yield put(
      errorNotification({
        message: error.message,
      }),
    );
  }
}
