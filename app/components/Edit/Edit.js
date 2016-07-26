import React from 'react';

import InputArea from '../InputArea/InputArea.js'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Edit'
  }
  render() {
    if(this.props.single.article.time)
    return (
      <div>
        <InputArea allowed={this.props.check.isAuthenticated || this.props.auth.isAuthenticated} 
                   type="EDIT" 
                   editArticle={this.props.actions.editArticle} 
                   history={this.props.history} 
                   oldArticle={this.props.single.article} 
                   day={this.props.single.article.time.day}
                   allTags={this.props.tags.tags}
                   params={this.props.params} />
      </div>
    )
    return (
      <div>
        <h1>Error!</h1>
        <p>Please fetch the aritcle before edit it.</p>
      </div>
    )
  }
}

export default Edit