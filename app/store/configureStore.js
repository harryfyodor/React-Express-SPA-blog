import rootReducer from '../reducers/index.js'
import routes from '../routes'
import {reduxReactRouter} from 'redux-router'
import {applyMiddleware, compose, createStore} from 'redux'
import createHistory from 'history/lib/createBrowserHistory'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const configureStore = (initialState) => {

  const createStoreWithMiddleware = compose(
      applyMiddleware(thunk, createLogger()),
      reduxReactRouter({routes, createHistory})      
    )

  if (module.hot) {
    module.hot
      .accept('../reducers/index.js', () => {
        const nextRootReducer = require('../reducers/index.js')
        store.replaceReducer(nextRootReducer)
      })
  }

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState)

  return store
}

export default configureStore