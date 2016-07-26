import {
  SINGLE_REQUEST,
  SINGLE_SUCCESS,
  SINGLE_FAILURE
} from '../constants/actionTypes.js'

const initialState = {
  article: {},
  isFetching: false,
  isFetched: false
}

const single = (state=initialState, action) => {
  switch(action.type) {
    case SINGLE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false
      })

    case SINGLE_SUCCESS: 
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        article: action.article
      })

    case SINGLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default single