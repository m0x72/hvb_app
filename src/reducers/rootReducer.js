import * as ActionTypes from '../actions';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

var authState = {
  //isAuthenticated: false,
  bearerToken: localStorage.getItem('bearerToken'), //DEV
  email: null,
  password: null,
  isFetching: false,
  hasFetched: false,
  loginError: false, 
  logoutError: false
};

function auth(state = authState, action) {
  switch (action.type) { 
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.LOGIN_SUCCESS:
      localStorage.setItem('bearerToken', action.token);
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        bearerToken: action.token,
        loginError: null
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        bearerToken: null,
        loginError: action.error
      };
    case ActionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        bearerToken: null,
        logoutError: null
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

var userState = {
  isFetching: false,
  hasFetched: false,
  profile: null,
  profileEdit: {
    editProfileError: false,
    editPasswordError: false,
    editImageError: false
  },
  register: {
    registerError: false
  }
};

function user(state = userState, action) {
  switch (action.type) {
    case ActionTypes.USER_REQUEST:
      return {
        ...state,
        isFetching: true,
        hasFetched: false
      };
    case ActionTypes.USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        profile: action.user,
        error: null
      };
    case ActionTypes.USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        error: null
      };
    case ActionTypes.USER_EDIT_SUCCESS:
       return {
        ...state,
        profile: {
          ...state.profile,
          ...action.response
        },
        profileEdit: {
          ...state.profileEdit,
          editProfileError: false
        }
      };  
    case ActionTypes.USER_EDIT_FAILURE:
      return {
        ...state,
        profileedit: {
          ...state.profileedit,
          editProfileError: true
        }
      };
    case ActionTypes.USER_EDIT_IMAGE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.response
        },
        profileEdit: {
          ...state.profileEdit,
          editImageError: false
        }
      };
    case ActionTypes.USER_EDIT_IMAGE_FAILURE:
      return {
        ...state,
        profileedit: {
          ...state.profileedit,
          editImageError: true
        }
      };
    case ActionTypes.USER_EDIT_PASSWORD_SUCCESS:
      return {
        ...state,
        profileedit: {
          ...state.profileedit,
          editPasswordError: false
        }
      };
    case ActionTypes.USER_EDIT_PASSWORD_FAILURE:
      return {
        ...state,
        profileedit: {
          ...state.profileedit,
          editPasswordError: true
        }
      };
    case ActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        register: {
          ...state.register,
          registerError: false
        }
      };
    case ActionTypes.USER_REGISTER_FAILURE:
      return {
        ...state,
        register: {
          ...state.register,
          registerError: true
        }
      };    
    default: 
      return state;
  }
}

function arrayToMapById(a) {
  var r = {};
  a.forEach( (v) => r[v.id] = v );
  return r;
}

function mergeNew(source, target) {
  source = arrayToMapById(source);
  target = arrayToMapById(target);
  let merge = Object.assign({}, source, target);
  var ret =  Object.keys(merge).map( k => merge[k] );
  return ret;
}

var videoState = {
  isFetching: false,
  hasFetched: false,
  videos: [],
  videosSelf: [],
  videoUpload: {
    uploadError: false
  }
};
function video(state = videoState, action) {
  switch (action.type) {
    case ActionTypes.VIDEOS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.VIDEOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        error: null,
        videos: mergeNew(state.videos, action.response.videos)
      };
    case ActionTypes.VIDEOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        error: action.error
      };
    case ActionTypes.VIDEOS_SELF_SUCCESS:
      return {
        ...state,
        videosSelf: mergeNew(state.videosSelf, action.response.videos)
      };
    case ActionTypes.VIDEO_UPLOAD_SUCCESS:
      return {
        ...state,
        videos: [
          ...state.videos,
          action.response
        ],
        videoUpload: {
          ...state.videoUpload,
          uploadError: false
        }
      };
    case ActionTypes.VIDEO_UPLOAD_FAILURE:
      return {
        ...state, 
        videoUpload: {
          ...state.videoUpload,
          uploadError: true
        }
      };
    default:
      return state;
  }
}

function addItemUnique(arr, id) {
  if (arr.findIndex( i => i.id == id ) > -1)
    return arr;
  let ret = arr.slice(0);
  ret.push(id);
  return ret;
}

var investmentsState = {
  isFetching: false,
  hasFetched: false,
  investments: [],
  investmentsViewed: [],
  userInvestments: {}
};
function investments(state = investmentsState, action) {
  switch (action.type) {
    case ActionTypes.INVESTS_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.INVESTS_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        error: null,
        userInvestments: action.response
      };
    case ActionTypes.INVESTS_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        error: true
      };
    case ActionTypes.INVESTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.INVESTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        error: null,
        investments: action.response.investments
      };
    case ActionTypes.INVESTS_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        error: true
      };
    case ActionTypes.INVEST_VIEWED: 
      return {
        ...state,
        investmentsViewed: addItemUnique(state.investmentsViewed, action.investId)
      };
     default:
      return state;
  }
}

var accountsState = {
  isFetching: false,
  hasFetched: false,
  userAccounts: {}
};
function accounts(state = accountsState, action) {
  switch (action.type) {
    case ActionTypes.ACCOUNTS_USER_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case ActionTypes.ACCOUNTS_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        hasFetched: true,
        error: null,
        userAccounts: action.response
      };
    case ActionTypes.ACCOUNTS_USER_FAILURE:
      return {
        ...state,
        isFetching: false,
        hasFetched: false,
        error: true
      };
     default:
      return state;
  }
}


const rootReducer = combineReducers({
  auth,
  user,
  investments,
  accounts,
  router
});

export default rootReducer;
