import {
  EDIT_ARTICLE_REQUEST,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILURE
} from '../constants/actionTypes.js'

const initialState = {
  isPosting: false,
  isPosted: false
}

const edit = (state=initialState, action) => {
  switch(action.type) {
    case EDIT_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isPosting: true,
        isPosted: false
      })

    case EDIT_ARTICLE_SUCCESS: 
      return Object.assign({}, state, {
        isPosting: false,
        isPosted: true
      })

    case EDIT_ARTICLE_FAILURE:
      return Object.assign({}, state, {
        isPosting: false,
        isPosted: false
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default edit