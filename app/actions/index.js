import fetch from 'isomorphic-fetch'
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  CHECK_AUTHENTICATED_REQUEST,
  CHECK_AUTHENTICATED_MATCHED,
  TITLES_GET_REQUEST,
  TITLES_GET_SUCCESS,
  TITLES_GET_FAILURE,
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILURE,
  POST_ARTICLE_REQUEST,
  POST_ARTICLE_SUCCESS,
  POST_ARTICLE_FAILURE,
  SINGLE_REQUEST,
  SINGLE_SUCCESS,
  SINGLE_FAILURE,
  EDIT_ARTICLE_REQUEST,
  EDIT_ARTICLE_SUCCESS,
  EDIT_ARTICLE_FAILURE,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  HOME,
  ARCHIVE,
  TAGS,
  SEARCH
} from '../constants/actionTypes.js'
import { pushState } from 'redux-router'
import { checkHttpStatus } from '../utils.js'
import jwtDecode from 'jwt-decode'

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export const loginUserSuccess = (token) => {
  localStorage.setItem('token', token)
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export const loginUserFailure = (error) => {
  localStorage.removeItem('token')
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.res.state,
      statusText: error.res.statusText
    }
  }
}

export const logout = () => {
  localStorage.removeItem('token')
  return {
    type: LOGOUT_USER
  }
}

export const logoutAndRedirect = () => {
  return (dispatch, state) => {
    dispatch(logout())
  }
}

export const loginUser = (password) => {
  return dispatch => {
    dispatch(loginUserRequest())
    // the return here
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: password })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      try {
        // throw error if it is invalid
        let decoded = jwtDecode(res.token)
        dispatch(loginUserSuccess(res.token))
        // dispatch(pushState(null, '/'))
      } catch (e) {
        // get the token which is invalid
        dispatch(loginUserFailure({
          res: {
            status: 403,
            statusText: 'Invalid token'
          }
        }))
      }
    })
    .catch(error => {
      // fail to get the jwt token
      dispatch(loginUserFailure(error))
    })
  }
}

export const checkAuthenticatedRequest = () => {
  return {
    type: CHECK_AUTHENTICATED_REQUEST
  }
}

export const checkAuthenticatedMatched = (matched) => {
  return {
    type: CHECK_AUTHENTICATED_MATCHED,
    isAuthenticated: matched
  }
}

export const checkAuth = () => {
  return dispatch => {
    dispatch(checkAuthenticatedRequest())
    return fetch('/api/check', {
      method: "POST",
      headers : {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ token: localStorage.token })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.match) {
        dispatch(checkAuthenticatedMatched(true))
      } else {
        dispatch(checkAuthenticatedMatched(false))
      }
    })
  }
}

export const titlesGetRequest = () => {
  return {
    type: TITLES_GET_REQUEST
  }
}

export const titlesGetFailure = (err) => {
  return {
    type: TITLES_GET_FAILURE,
    err: err
  }
}

// Archive has title,id,date
// Home(need page) has id,title,tags,description,date
// Tags(need tagName) has id,title
// Search(need searchString) has id,title
export const titlesGetSuccess = (articles, count) => {
  return {
    type: TITLES_GET_SUCCESS,
    articles: articles,
    count: count
  }
}

export const getTitles = ({
  type: type,
  page: page,
  tagName: tagName,
  searchString: searchString
}) => {
  return dispatch => {
    dispatch(titlesGetRequest())
    return fetch('/api/titles', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"        
      },
      body: JSON.stringify({
        type: type,
        page: page,
        tagName: tagName,
        searchString: searchString
      })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(titlesGetSuccess(res.articles, res.count))
      } else {
        dispatch(titlesGetFailure(res.err))
      }
    })
  }
}

export const tagsRequest = () => {
  return {
    type: TAGS_REQUEST
  }
}

export const tagsSuccess = (tags) => {
  return {
    type: TAGS_SUCCESS,
    tags: tags
  }
}

export const tagsFailure = (err) => {
  return {
    type: TAGS_FAILURE,
    err: err
  }
}

export const getTags = () => {
  //setTimeout(() => {
    return dispatch => {
      dispatch(tagsRequest())
      return fetch('/api/tags', {
        method: "POST",
        header: {
          "dataType": "json"
        }
      })
      .then(checkHttpStatus)
      .then(res => res.json())
      .then(res => {
        if(res.ok) {
          dispatch(tagsSuccess(res.tags))
        } else {
          dispatch(tagsFailure(res.err))
        }
      })
    }
  // }, 1000)
}

export const postArticleRequest = () => {
  return {
    type: POST_ARTICLE_REQUEST
  }
}

export const postArticleSuccess = () => {
  return {
    type: POST_ARTICLE_SUCCESS
  }
}

export const postArticleFailure = (err) => {
  return {
    type: POST_ARTICLE_FAILURE,
    err: err
  }
}

export const postArticle = (type, article) => {
  const token = localStorage.token
  return dispatch => {
    dispatch(postArticleRequest())
    return fetch('/api/upload', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({type: type, article: article})
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(postArticleSuccess())
      } else {
        dispatch(postArticleFailure(res.err))
      }
    })
  }
}

export const singleRequest = () => {
  return {
    type: SINGLE_REQUEST
  }
}

export const singleSuccess = (article) => {
  return {
    type: SINGLE_SUCCESS,
    article: article
  }
}

export const singleFailure = () => {
  return {
    type: SINGLE_FAILURE
  }
}

export const getSingle = (day, title) => {
  return dispatch => {
    dispatch(singleRequest())
    return fetch('/api/single', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json" 
      },
      body: JSON.stringify({
        day: day,
        title: title
      })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(singleSuccess(res.article))
      } else {
        dispatch(singleFailure())
      }
    })
  }
}

export const editArticleRequest = () => {
  return {
    type: EDIT_ARTICLE_REQUEST
  }
}

export const editArticleSuccess = () => {
  return {
    type: EDIT_ARTICLE_SUCCESS
  }
}

export const editArticleFailure = () => {
  return {
    type: EDIT_ARTICLE_FAILURE
  }
}

export const editArticle = (oldDay, oldTitle, article) => {
  var token = localStorage.token
  return dispatch => {
    dispatch(editArticleRequest())
    return fetch('/api/edit', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`       
      },
      body: JSON.stringify({
        oldDay: oldDay,
        oldTitle: oldTitle,
        article: article
      })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(editArticleSuccess())
      } else {
        dispatch(editArticleFailure())
      }
    })    
  }
}

export const deleteArticleRequest = () => {
  return {
    type: DELETE_ARTICLE_REQUEST
  }
}

export const deleteArticleSuccess = () => {
  return {
    type: DELETE_ARTICLE_SUCCESS
  }
}

export const deleteArticleFailure = () => {
  return {
    type: DELETE_ARTICLE_FAILURE
  }
}

export const deleteArticle = (day, title) => {
  var token = localStorage.token
  return dispatch => {
    dispatch(deleteArticleRequest())
    return fetch('/api/remove', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`       
      },
      body: JSON.stringify({
        day: day,
        title: title
      })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(deleteArticleSuccess())
      } else {
        dispatch(deleteArticleFailure())
      }
    })    
  }
}

export const addCommentRequest = () => {
  return {
    type: ADD_COMMENT_REQUEST
  }
}

export const addCommentSuccess = () => {
  return {
    type: ADD_COMMENT_SUCCESS
  }
}

export const addCommentFailure = (err) => {
  return {
    type: ADD_COMMENT_FAILURE
  }
}

export const addComment = (articleTitle, articleDay, comment) => {
  return dispatch => {
    dispatch(addCommentRequest())
    return fetch('/api/comment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        articleDay: articleDay,
        articleTitle: articleTitle,
        comment: comment
      })
    })
    .then(checkHttpStatus)
    .then(res => res.json())
    .then(res => {
      if(res.ok) {
        dispatch(addCommentSuccess())
      } else {
        dispatch(addCommentFailure())
      }
    })
  }
}