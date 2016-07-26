import React from 'react'

import Sidebar from '../Sidebar/Sidebar.js'

import style from './Body.css';

class Body extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Body'
  }
  
  render() {
    return (
      <div className={style.main}>
        <div className={style.content}>
          {React.cloneElement(this.props.children, this.props)}
        </div>
        <Sidebar getTags={this.props.actions.getTags}
                 tags={this.props.tags.tags}
                 isFetched={this.props.tags.isFetched}
                 isFetching={this.props.tags.isFetching}
                 titlesFetched={this.props.getTitles.isFetched || this.props.single.isFetched || (this.props.location.pathname==="/write")}
                 history={this.props.history}
                 getTitles={this.props.actions.getTitles}
                 />
      </div>
    )
  }
}

export default Body
