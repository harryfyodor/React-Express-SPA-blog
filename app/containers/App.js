import React from 'react'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import components
import Header from '../components/Header/Header.js'
import Body from '../components/Body/Body.js'
import Footer from '../components/Footer/Footer.js'
import Sidebar from '../components/Sidebar/Sidebar.js'

// import actions
import * as actions from '../actions/index.js'

// import css
import style from './App.css'

class App extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <Header auth={this.props.auth}
                check={this.props.check}
                login={this.props.actions.loginUser}
                logoutAndRedirect={this.props.actions.logoutAndRedirect}
                checkAuth={this.props.actions.checkAuth}
                checkAuthenticatedMatched={this.props.actions.checkAuthenticatedMatched}
                location={this.props.location.pathname}
                />
        <Body children={this.props.children} {...this.props} />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: {
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      isAuthenticating: state.auth.isAuthenticating,
      status: state.auth.status,
      statusText: state.auth.statusText,
    },
    check: {
      isAuthenticating: state.check.isAuthenticating,
      isAuthenticated: state.check.isAuthenticated
    },
    getTitles: {
      isFetched: state.getTitles.isFetched,
      isFetching: state.getTitles.isFetching,
      articles: state.getTitles.articles,
      fetchFailure: state.getTitles.fetchFailure,
      count: state.getTitles.count,
      err: state.getTitles.err
    },
    tags: {
      isFetching: state.tags.isFetching,
      isFetched: state.tags.isFetched,
      err: state.tags.err,
      tags: state.tags.tags
    },
    single: {
      isFetching: state.single.isFetching,
      isFetched: state.single.isFetched,
      article: state.single.article
    },
    edit: {
      isPosting: state.edit.isPosting,
      isPosted: state.edit.isPosted
    },
    remove: {
      isRemoving: state.remove.isRemoving,
      isRemoved: state.remove.isRemoved
    },
    comment: {
      isPosting: state.edit.isPosting,
      isPosted: state.edit.isPosted
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

//{React.cloneElement(this.props.children, this.props)}