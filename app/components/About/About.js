import React from 'react'

import style from './About.css'

class About extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'About'
  }

  onQuit() {
    document.getElementsByTagName("body")[0].style.overflow = ""
    this.props.callback();
  }

  render() {
    return (
      <div className={style.about}>
        <div>
          <h2>harryfyodor</h2>
          <p>weibo: <a href="/">harryfyodor</a></p>
          <p>github: <a href="https://github.com/harryfyodor" target="_blank">harryfyodor</a></p>
          <p>email: wuhaiweideyouxiang@163.com</p>
          <p>This is a SPA blog built by express and react. 
             For more detail, view the code <a href="/">here</a>.
             <br />(Do not forget to star if you like it~ ) </p>
          <button onClick={this.onQuit.bind(this)}>BACK</button>
        </div>
      </div>
    )
  }
}

About.propTypes = {
  callback: React.PropTypes.func.isRequired
}

export default About
