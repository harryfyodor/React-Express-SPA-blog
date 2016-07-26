import {
  TITLES_GET_REQUEST,
  TITLES_GET_SUCCESS,
  TITLES_GET_FAILURE
} from '../constants/actionTypes.js'

const initialState = {
  isFetching: false,
  isFetched: false,
  fetchFailure: false,
  articles: [],
  count: 1,
  err: null
}

const getTitles = (state = initialState, action) => {
  switch(action.type){
    case TITLES_GET_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isFetched: false,
        fetchFailure: false
      })

    case TITLES_GET_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: false,
        fetchFailure: false,
        err: action.err
      })

    case TITLES_GET_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isFetched: true,
        fetchFailure: false,
        articles: action.articles,
        count: action.count
      })

    default:
      return Object.assign({}, state, {})
  }
}

export default getTitles