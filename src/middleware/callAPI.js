
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(res) {
  return res.json();
}

export default function callAPI({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      const {
        types,
        callAPI,
        shouldCallAPI = () => true,
        payload = {}
      } = action;

      if (!types) {
        // Normal action: pass it on
        return next(action);
      }

      if (
        !Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')
      ) {
        throw new Error('Expected an array of three string types.');
      }

      if (typeof callAPI !== 'function') {
        throw new Error('Expected fetch to be a function.');
      }

      if (!shouldCallAPI(getState())) {
        return;
      }

      const [ requestType, successType, failureType ] = types;

      dispatch(Object.assign({}, payload, {
        type: requestType
      }));

      const token = getState().auth.bearerToken;
      
      return callAPI(token)
      .then(checkStatus)
      .then(parseJSON)
      .then(
        response => dispatch(Object.assign({}, payload, {
          response: response,
          type: successType
        })),
        error => dispatch(Object.assign({}, payload, {
          error: error,
          type: failureType
        }))
      );
    };
  };
}
