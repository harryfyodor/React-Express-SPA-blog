import React from 'react';

import style from './Footer.css'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Footer';
    }
    render() {
      return (
        <div className={style.footer}>
          <p>© 2016 harryfyodor</p>
          <p>Hosted on DigitalOcean</p>
          <p>Powered by <a href="http://expressjs.com/" target="_blank">Express</a> and 
          <a href="https://facebook.github.io/react/" target="_blank"> React</a></p>
        </div>
      );
    }
}

export default Footer;
