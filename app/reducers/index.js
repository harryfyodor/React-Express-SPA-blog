import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import auth from './auth.js'
import check from './check.js'
import getTitles from './getTitles.js'
import tags from './tags.js'
import single from './single.js'
import edit from './edit.js'
import remove from './remove.js'

export default combineReducers({
  auth,
  check,
  getTitles,
  tags,
  single,
  edit,
  remove,
  routing: routerReducer
})