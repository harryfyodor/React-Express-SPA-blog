import React from 'react';
import { Link } from 'react-router'
import md from 'marked'

import style from './Single.css'

import Comment from '../Comments/Comments.js'
import AddComment from '../AddComment/AddComment.js'

class Single extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Single'
    this.state = {
      article: {},
      comments: [],
      firstTime: true
    }
  }

  componentDidMount() {
    this.props.actions.getSingle(this.props.params.day, this.props.params.title)
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.firstTime && nextProps.single.isFetched) {
      this.setState({
        article: nextProps.single.article,
        comments: nextProps.single.article.comments,
        firstTime: false
      })
    }
  }

  onDeleteHandler() {
    if(window.confirm("Are you sure to delete this post?")) {
      this.props.actions.deleteArticle(this.props.params.day, this.props.params.title)
    }
  }

  onChildComment(nextState) {
    this.setState({
      comments: [ ...nextState ]
    })
  }

  render() {
    const {
      title,
      time,
      content,
      tags
    } = this.state.article
    const comments = this.state.comments
    const allowed = (this.props.check.isAuthenticated || this.props.auth.isAuthenticated)
    return (
      <div className={style.single}>  
        {this.state.article.content ?
        <div>
        <h1>{title}</h1>
        <time>{time.day}</time>
        <ul>
          {this.state.article.tags.map((t, i) => 
           <li key={i}><Link to={`/tagsResult/${t}`}>{t}</Link></li>)}
        </ul>
        <div className={style.md}>
          <div dangerouslySetInnerHTML={{__html:md.parse(content || "")}} />
        </div>
        {allowed? 
        <button><Link to={`/edit/${time.day}/${title}`}>Edit</Link></button>
        : ""}
        {allowed?
        <button><Link to="/page/1" onClick={this.onDeleteHandler.bind(this)}>Delete</Link></button>
        : ""}
        </div>
        : <div>Error</div>}
        <Comment comments={comments}/>
        <AddComment location={this.props.location}
                    postComment={this.props.actions.addComment}
                    params={this.props.params}
                    posted={this.props.comment.isPosted} 
                    getSingle={this.props.actions.getSingle} 
                    allowed={allowed} 
                    callback={this.onChildComment.bind(this)} 
                    comments={comments} />
      </div>
    );
  }
}

export default Single;
