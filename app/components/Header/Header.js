import React from 'react'
import { Link } from 'react-router'

// import css
import style from './Header.css'

import About from '../About/About.js'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Header'
    this.state = {
      text: "",
      isShown: false,
      show: {
        display: "none"
      },
      isAuthenticated: this.props.auth.isAuthenticated,
      shouldBeLogout: false,
      about: false
    }
  }

  // if there is token, check it before rendering
  componentDidMount() {
    if(!!localStorage.token) {
      this.props.checkAuth()
    }
  }

  componentWillReceiveProps(nextProps) {
    // when refresh or logout happen
    this.setState({
      isAuthenticated: nextProps.check.isAuthenticated
    }) 
    // login for the first time, change header btns immediately
    if(nextProps.auth.isAuthenticated) {
      this.setState({
        isAuthenticated: true
      })
    }
  }

  onLoginHandler(e) {
    e.preventDefault();
    if(this.state.isShown) {
      this.setState({
        isShown: false,
        show: {
          display: "none"
        }
      })
    } else {
      this.setState({
        isShown: true,
        show: {
          display: "flex"
        }
      })
    }
  }

  onChangeHandler(e) {
    this.setState({ text: e.target.value })
  }

  onPostHandler(e) {
    if(e.which === 13 && this.state.text != "") {
      const password = this.state.text
      this.props.login(password)
      this.setState({ 
        text: "",
        isShown: false,
        show: {
          display: "none"
        }
      })
    }
  }

  onLogoutHandler(e) {
    this.setState({
      isAuthenticated: false,
      shouldBeLogout: true
    })
    // important!!change the props!!
    this.props.checkAuthenticatedMatched(false)
    this.props.logoutAndRedirect()
  }

  onAbout() {
    document.getElementsByTagName("body")[0].style.overflow = "hidden"
    this.setState({
      about: true
    })
  }

  onAboutChild() {
    this.setState({
      about: false
    })
  }

  onBack() {
    if(this.props.location !== "/page/1") {
      /*
      this.props.actions.getTitles({
        type: "HOME",
        page: 1
      })
*/
    }
  }

  render() {
    return (
      <div className={style.heading}>
        {this.state.about ? 
        <About callback={this.onAboutChild.bind(this)} />
        : ""}
        <div className={style.header}>
          <h1><Link to="/page/1" onClick={this.onBack.bind(this)}>harryfyodor</Link></h1>
          <ul>
            <li><Link to="/page/1" onClick={this.onBack.bind(this)}>home</Link></li>
            <li><Link to="/archive">archive</Link></li>
            {this.state.isAuthenticated ? 
             <li><Link to="/write">write</Link></li> :
             <li onClick={this.onAbout.bind(this)}>about</li>
            }
            {this.state.isAuthenticated ? 
             <li onClick={this.onLogoutHandler.bind(this)}><a>logout</a></li> :
             <li onClick={this.onLoginHandler.bind(this)}><a>login</a></li>
            }
          </ul>
        </div>
        <div style={this.state.show} className={style.login}>
          <label>Input Password</label>
          <input ref="pass"
                 value={this.state.text}
                 placeholder={"Enter"}
                 onChange={this.onChangeHandler.bind(this)}
                 onKeyDown={this.onPostHandler.bind(this)}/>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  check: React.PropTypes.object.isRequired,
  login: React.PropTypes.func.isRequired,
  logoutAndRedirect: React.PropTypes.func.isRequired,
  checkAuth: React.PropTypes.func.isRequired,
  checkAuthenticatedMatched: React.PropTypes.func.isRequired,
  location: React.PropTypes.string.isRequired,
}

export default Header
