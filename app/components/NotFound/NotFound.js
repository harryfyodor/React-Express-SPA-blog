import React from 'react'

import style from './NotFound.css'

class NotFound extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'NotFound'
    }
    render() {
        return (
          <div className={style.notFound}>
          <h1>404</h1>
          <p>Not Found</p>
          <iframe 
          src="http://music.163.com/outchain/player?type=2&id=22728969&auto=1&height=32"></iframe>
          <p>Only Music ... Was Left</p>
          </div>
        )
    }
}

export default NotFound
