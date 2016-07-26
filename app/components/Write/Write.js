import React from 'react'

import InputArea from '../InputArea/InputArea.js'

class Write extends React.Component {
  constructor(props) {
      super(props)
      this.displayName = 'Write'
  }
  render() {
    const date = new Date()
    const day = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    return (
      <div>
        <InputArea allowed={this.props.check.isAuthenticated || this.props.auth.isAuthenticated} 
                   type="WRITE" 
                   upload={this.props.actions.postArticle} 
                   history={this.props.history}
                   day={day} 
                   allTags={this.props.tags.tags} />
      </div>
    )
  }
}

export default Write
