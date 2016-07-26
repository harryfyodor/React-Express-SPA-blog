import {
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE
} from '../constants/actionTypes.js'

const initialState = {
  isRemoving: false,
  isRemoved: false
}

const remove = (state=initialState, action) => {
  switch(action.type) {
    case DELETE_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isRemoving: true,
        isRemoved: false
      })

    case DELETE_ARTICLE_SUCCESS: 
      return Object.assign({}, state, {
        isRemoving: false,
        isRemoved: true
      })

    case DELETE_ARTICLE_FAILURE:
      return Object.assign({}, state, {
        isRemoving: false,
        isRemoved: false
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default remove