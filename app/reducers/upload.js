import {
  POST_ARITCLE_REQUEST,
  POST_ARITCLE_SUCCESS,
  POST_ARITCLE_FAILURE
} from '../constants/actionTypes.js'

const initialState = {
  isPosting: false,
  isPosted: false,
  err: null
}

const upload = (state=initialState, action) => {
  switch(action.type) {
    case POST_ARITCLE_REQUEST:
      return Object.assign({}, state, {
        isPosting: true,
        isPosted: false
      })

    case POST_ARITCLE_SUCCESS:
      return Object.assign({}, state, {
        isPosting: false,
        isPosted: true
      })

    case POST_ARITCLE_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        isPosted: false,
        err: action.err
      })

    default:
      return Object.assign({}, state, {})
  }
}