import { browserHistory } from 'react-router';
import request from './request';
import { URL } from '../config';
const { localStorage } = global.window;

const auth = {
  login(email, password) {
    if (auth.loggedIn()) {
      return Promise.resolve(true);
    }
    return request(`${URL}/public/login`, 'POST', {
      pool: { email, password },
    }).then(response => {
      if (response.error) {
        throw new Error(response.message);
      } else {
        localStorage.token = response.token;
        localStorage.user = JSON.stringify(response.user);
        return Promise.resolve(true);
      }
    });
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  loggedIn() {
    return !!localStorage.token;
  },

  signup(email, password) {
    // Post a fake request
    return request('/signup', { email, password }).then(() => {
      forwardTo('/login?success');
      // auth.login(username, password); // reroute
    });
  },
  onChange() {},
};

function forwardTo(location) {
  browserHistory.push(location);
}

export default auth;
