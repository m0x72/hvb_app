import fetch from 'isomorphic-fetch';

//const BASE = 'http://crowdtv.test.hyve.net';
//const BASE = 'http://192.168.0.180:3000';
//const BASE = 'http://tinvest.my-ideanet.net';
const BASE = 'http://tinvest.dev.local';
export const API_BASE = BASE + '/api';
export const SERVER_BASE = BASE;

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function encodeParams(mapping) {
  return Object.keys(mapping).map( key => key + '=' + mapping[key] ).join('&');
}


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

function requestLogin(email, password) {
  return {
    type: LOGIN_REQUEST,
    email,
    password
  };
}

function receiveLoginSuccess(token) {
  return {
    type: LOGIN_SUCCESS,
    token
  };
}

function receiveLoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error
  };
}

export function fetchLogin(email, password) {
  return function (dispatch) {
    dispatch(requestLogin(email, password));
    return fetch(
      API_BASE + '/login', 
      {
        method: 'post',
        headers: {
          'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }, 
        body: 'email='+email+'&password='+password
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(
        response => dispatch(receiveLoginSuccess(response.token)),
        error => dispatch(receiveLoginFailure(error))
      );
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  };
}

function receiveLogoutSuccess(token) {
  return {
    type: LOGOUT_SUCCESS
  };
}

function receiveLogoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error
  };
}

export function fetchLogout(token) {
  return function (dispatch) {
    dispatch(requestLogout());
    return fetch(
      API_BASE + '/logout', 
      {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(
        response => dispatch(receiveLogoutSuccess()),
        error => dispatch(receiveLogoutFailure(error))
      );
  };
}

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';
function requestUser() {
  return {
    type: USER_REQUEST
  };
}
function receiveUserSuccess(user) {
  return {
    type: USER_SUCCESS,
    user
  };
}
function receiveUserFailure(error) {
  return {
    type: USER_FAILURE,
    error
  };
}
export function fetchUser(token) {
  return function (dispatch) {
    dispatch(requestUser());
    return fetch(
      API_BASE + '/users/self',
      {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(
          response => dispatch(receiveUserSuccess(response)),
          error => dispatch(receiveUserFailure(error))
      );
  };
}

export const VIDEOS_REQUEST = 'VIDEOS_REQUEST';
export const VIDEOS_SUCCESS = 'VIDEOS_SUCCESS';
export const VIDEOS_FAILURE = 'VIDEOS_FAILURE';

export function fetchVideos(category = null, query = '', limit = 25, page = 1) {
  
  let oParams = {
    search: query,
    amount: limit,
    page
  };
  if (category) oParams.category = category;
  const sParams = '?'+encodeParams(oParams);

  return {
    // Types of actions to emit before and after
    types: [VIDEOS_REQUEST, VIDEOS_SUCCESS, VIDEOS_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/videos'+sParams, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const VIDEOS_SELF_REQUEST = 'VIDEOS_SELF_REQUEST';
export const VIDEOS_SELF_SUCCESS = 'VIDEOS_SELF_SUCCESS';
export const VIDEOS_SELF_FAILURE = 'VIDEOS_SELF_FAILURE';

export function fetchVideosSelf(category = null, query = '', limit = 25, page = 1) {
  
  let oParams = {
    search: query,
    amount: limit,
    page
  };
  if (category) oParams.category = category;
  const sParams = '?'+encodeParams(oParams);

  return {
    // Types of actions to emit before and after
    types: [VIDEOS_SELF_REQUEST, VIDEOS_SELF_SUCCESS, VIDEOS_SELF_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/videos/self'+sParams, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const VIDEO_UPLOAD_REQUEST = 'VIDEO_UPLOAD_REQUEST';
export const VIDEO_UPLOAD_SUCCESS = 'VIDEO_UPLOAD_SUCCESS';
export const VIDEO_UPLOAD_FAILURE = 'VIDEO_UPLOAD_FAILURE';

export function uploadVideo(videoFormData) {
  return {
    // Types of actions to emit before and after
    types: [VIDEO_UPLOAD_REQUEST, VIDEO_UPLOAD_SUCCESS, VIDEO_UPLOAD_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/videos', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: videoFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_EDIT_REQUEST = 'USER_EDIT_REQUEST';
export const USER_EDIT_SUCCESS = 'USER_EDIT_SUCCESS';
export const USER_EDIT_FAILURE = 'USER_EDIT_FAILURE';

export function editUser(userFormData) {

  // Http method overwrite (larafk)
  userFormData.append('_method', 'PUT');

  return {
    // Types of actions to emit before and after
    types: [USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: userFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_EDIT_PASSWORD_REQUEST = 'USER_EDIT_PASSWORD_REQUEST';
export const USER_EDIT_PASSWORD_SUCCESS = 'USER_EDIT_PASSWORD_SUCCESS';
export const USER_EDIT_PASSWORD_FAILURE = 'USER_EDIT_PASSWORD_FAILURE';

export function editUserPassword(userPasswordFormData) {

  // Http method overwrite (larafk)
  userPasswordFormData.append('_method', 'PUT');

  return {
    // Types of actions to emit before and after
    types: [USER_EDIT_PASSWORD_REQUEST, USER_EDIT_PASSWORD_SUCCESS, USER_EDIT_PASSWORD_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self/password', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: userPasswordFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_EDIT_IMAGE_REQUEST = 'USER_EDIT_IMAGE_REQUEST';
export const USER_EDIT_IMAGE_SUCCESS = 'USER_EDIT_IMAGE_SUCCESS';
export const USER_EDIT_IMAGE_FAILURE = 'USER_EDIT_IMAGE_FAILURE';

export function editUserImage(userImageFormData) {

  // Http method overwrite (larafk)
  userImageFormData.append('_method', 'PUT');

  return {
    // Types of actions to emit before and after
    types: [USER_EDIT_IMAGE_REQUEST, USER_EDIT_IMAGE_SUCCESS, USER_EDIT_IMAGE_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/users/self/image', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      body: userImageFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';

export function registerUser(userFormData) {
  return {
    // Types of actions to emit before and after
    types: [USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: () => fetch(API_BASE+'/users', {
      method: 'post',
      body: userFormData
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const INVESTS_USER_REQUEST = 'INVESTS_USER_REQUEST';
export const INVESTS_USER_SUCCESS = 'INVESTS_USER_SUCCESS';
export const INVESTS_USER_FAILURE = 'INVESTS_USER_FAILURE';

export function investmentsUser() {
  return {
    // Types of actions to emit before and after
    types: [INVESTS_USER_REQUEST, INVESTS_USER_SUCCESS, INVESTS_USER_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/investments/self', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const INVESTS_REQUEST = 'INVESTS_REQUEST';
export const INVESTS_SUCCESS = 'INVESTS_SUCCESS';
export const INVESTS_FAILURE = 'INVESTS_FAILURE';

export function fetchInvestments(lat, lng) {

  let oParams = {
    lat,
    long: lng
  };
  const sParams = '?'+encodeParams(oParams);

  return {
    // Types of actions to emit before and after
    types: [INVESTS_REQUEST, INVESTS_SUCCESS, INVESTS_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/investments'+sParams, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}

export const INVEST_VIEWED = 'INVEST_VIEWED';
export function investViewed(investId) {
  return {
    type: INVEST_VIEWED,
    investId
  };
}

export const ACCOUNTS_USER_REQUEST = 'ACCOUNTS_USER_REQUEST';
export const ACCOUNTS_USER_SUCCESS = 'ACCOUNTS_USER_SUCCESS';
export const ACCOUNTS_USER_FAILURE = 'ACCOUNTS_USER_FAILURE';

export function fetchAccountsUser() {

  return {
    // Types of actions to emit before and after
    types: [ACCOUNTS_USER_REQUEST, ACCOUNTS_USER_SUCCESS, ACCOUNTS_USER_FAILURE],
    // Check the cache (optional):
    shouldCallAPI: (state) => true,//!state.users[userId],
    // Perform the fetching:
    callAPI: (token) => fetch(API_BASE+'/accounts/self', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }),
    // Arguments to inject in begin/end actions
    payload: { }
  };
}


