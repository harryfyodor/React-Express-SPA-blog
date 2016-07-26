import {
  TAGS_SUCCESS,
  TAGS_FAILURE,
  TAGS_REQUEST
} from '../constants/actionTypes.js'

const initialState = {
  tags: [],
  isFetching: false,
  isFetched: false,
  err: null
}

const tags = (state=initialState, action) => {
  switch(action.type) {
    case TAGS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false
      })

    case TAGS_SUCCESS: 
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        tags: action.tags
      })

    case TAGS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        err: action.err
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default tags