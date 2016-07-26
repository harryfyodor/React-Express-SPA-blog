import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from '../constants/actionTypes.js'

const initialState = {
  isPosting: false,
  isPosted: false
}

const comment = (state=initialState, action) => {
  switch(action.type) {
    case ADD_COMMENT_REQUEST:
      return Object.assign({}, state, {
        isPosting: true,
        isPosted: false
      })

    case ADD_COMMENT_SUCCESS: 
      return Object.assign({}, state, {
        isPosting: false,
        isPosted: true
      })

    case ADD_COMMENT_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        isPosted: false
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default comment