import React from 'react'

import style from './Comments.css'

class Comment extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Comment'
    this.state = {
      comments: this.props.comments || []
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      comments: nextProps.comments || []
    })     
  }

  renderAComment() {
    const linethrough = {
      textDecoration : "line-through",
      fontSize: "0 0 3px black"
    }
    if(!this.state.comments) return <li>Loading...</li>
    if(this.state.comments.length === 0) return <li>No Comments</li>
    return this.state.comments.map((c, i) =>
      <li key={i}>
        {c.admin ? 
        <h4 style={{textDecoration:"line-through",
                    textShadow: "0 0 1px black",
                    fontSize: "1.4rem"}}>{c.name}</h4>
        : <h4><a href={`http://${c.website}`} target="_blank">{c.name}</a></h4>}
        <time>{c.minute}</time>
        <p>{c.comment}</p>
      </li>
    )
  }

  render() {
    return (
      <div className={style.comments}>
        <h3>Comments:</h3>
        <ul>
          {this.renderAComment()}
        </ul>
      </div>
    )
  }
}

Comment.propTypes = {
  comments: React.PropTypes.array.isRequired
}

export default Comment
