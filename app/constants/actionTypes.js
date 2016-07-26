/*
import {createConstants} from '../utils.js'

export createConstants(
  'LOGIN_USER_REQUEST',
  'LOGIN_USER_FAILURE',
  'LOGIN_USER_SUCCESS',
  'LOGOUT_USER'
)
*/

// authenticate
export const LOGIN_USER_REQUEST = "LOGIN_USER_REQUEST"
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS"
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE"
export const LOGOUT_USER = "LOGOUT_USER"

// check whether it is authenticated
export const CHECK_AUTHENTICATED_REQUEST = "CHECK_AUTHENTICATED_REQUEST"
export const CHECK_AUTHENTICATED_MATCHED = "CHECK_AUTHENTICATED_MATCHED"
export const CHECK_AUTHENTICATED_FAILURE = "CHECK_AUTHENTICATED_FAILURE"

// fetch articles from be
export const TITLES_GET_REQUEST = "TITLES_GET_REQUEST"
export const TITLES_GET_SUCCESS = "TITLES_GET_SUCCESS"
export const TITLES_GET_FAILURE = "TITLES_GET_FAILURE"

// fetch tags
export const TAGS_REQUEST = "TAGS_REQUEST"
export const TAGS_SUCCESS = "TAGS_SUCCESS"
export const TAGS_FAILURE = "TAGS_FAILURE"

// upload post
export const POST_ARTICLE_REQUEST = "POST_ARTICLE_REQUEST"
export const POST_ARTICLE_SUCCESS = "POST_ARTICLE_SUCCESS"
export const POST_ARTICLE_FAILURE = "POST_ARTICLE_FAILURE"

// single
export const SINGLE_REQUEST = "SINGLE_REQUEST"
export const SINGLE_SUCCESS = "SINGLE_SUCCESS"
export const SINGLE_FAILURE = "SINGLE_FAILURE"

// edit article
export const EDIT_ARTICLE_REQUEST = "EDIT_ARTICLE_REQUEST"
export const EDIT_ARTICLE_SUCCESS = "EDIT_ARTICLE_SUCCESS"
export const EDIT_ARTICLE_FAILURE = "EDIT_ARTICLE_FAILURE"

// delete article
export const DELETE_ARTICLE_REQUEST = "DELETE_ARTICLE_REQUEST"
export const DELETE_ARTICLE_SUCCESS = "DELETE_ARTICLE_SUCCESS"
export const DELETE_ARTICLE_FAILURE = "DELETE_ARTICLE_FAILURE"

// add comment
export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"

// different types of request
export const HOME = "HOME" // req page
export const ARCHIVE = "ARCHIVE" // res date
export const TAGS = "TAGS" // res string
export const SEARCH = "SEARCH" // req string