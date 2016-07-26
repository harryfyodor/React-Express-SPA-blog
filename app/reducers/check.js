import {
  CHECK_AUTHENTICATED_REQUEST,
  CHECK_AUTHENTICATED_MATCHED
} from '../constants/actionTypes.js'

const initialState = {
  isAuthenticating: false,
  isAuthenticated: false
}

const check = (state = initialState, action) => {
  switch(action.type) {
    case CHECK_AUTHENTICATED_REQUEST:
      return Object.assign({}, state, {
        isAuthenticating: true
      })

    case CHECK_AUTHENTICATED_MATCHED:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
        isAuthenticating: false
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default check