import React from 'react'
import { Link } from "react-router"

import style from './AddComment.css'

class AddComment extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'AddComment'
  }

  componentWillReceiveProps(nextProps) {
    // when the comment posted, refresh comment
    if(nextProps.posted) {
      const { title, day } = this.props.params
      this.props.actions.getSingle(title, day)
    }     
  }

  onPostComment(e) {
    if(window.confirm("Are you sure to post this comment?")) {
      const { title, day } = this.props.params
      const comment = {
        name: this.refs.name.value,
        email: this.refs.email.value,
        website: this.refs.website.value,
        comment: this.refs.comment.value,
        admin: !!this.props.allowed
      }
      if(comment.name != "" &&
         this.onEamil(comment.email) &&
         comment.website != "" &&
         comment.comment != "") {
        this.refs.name.value = ""
        this.refs.email.value = ""
        this.refs.website.value = ""
        this.refs.comment.value = ""
        // pass new comments to parent component
        this.props.postComment(title, day, comment)
        comment.minute = "just now"
        this.props.callback([ ...this.props.comments, comment])
      } else {
        alert("Do not leave blank! Email must be in correct form.")
      }
    }
  }

  onEamil(email) {
    if(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(email)) {
      return true
    }
  }

  render() {
    return (
      <div className={style.addComment}>
        <input placeholder="your name" 
               ref="name" />
        <input placeholder="your email" 
               type="email"
               ref="email" />
        <input placeholder="your website, for example: harryfyodor.tk" 
               ref="website" />
        <textarea placeholder="your comment"
               ref="comment" ></textarea>
        <button onClick={this.onPostComment.bind(this)}>
        <Link to={this.props.location.pathname}>comment</Link>
        </button>
      </div>
    )
  }
}

AddComment.propTypes = {
  postComment: React.PropTypes.func.isRequired,
  comments: React.PropTypes.array.isRequired,
  allowed: React.PropTypes.bool.isRequired,
  callback: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  posted: React.PropTypes.bool.isRequired,
  getSingle: React.PropTypes.func.isRequired
}

export default AddComment
