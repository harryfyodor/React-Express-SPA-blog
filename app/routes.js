// import 'babel-polyfill'
import React from 'react'
import { Redirect, Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'

// import components
import App from './containers/App.js'
import About from './components/About/About.js'
import Archive from './components/Archive/Archive.js'
import Edit from './components/Edit/Edit.js'
import Home from './components/Home/Home.js'
import TagsResult from './components/TagsResult/TagsResult.js'
import Single from './components/Single/Single.js'
import SearchResult from './components/SearchResult/SearchResult.js'
import Write from './components/Write/Write.js'
import NotFound from './components/NotFound/NotFound.js'

import rootReducer from './reducers/index.js'
import configureStore from './store/configureStore.js'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// route
const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/page/:pageId"component={App}>
        <IndexRoute component={Home} />
        <Route path="/archive" component={Archive} />
        <Route path="/tagsResult/:tag" component={TagsResult} />
        <Route path="/write" component={Write} />
        <Route path="/edit/:day/:title" component={Edit} />
        <Route path="/article/:day/:title" component={Single} />
        <Route path="/searchResult/:word" component={SearchResult} />
        <Redirect from="/" to="/page/1" />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>
)

export default router

