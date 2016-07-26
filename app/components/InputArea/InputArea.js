import React from 'react'
import md from 'marked'
import { Link } from 'react-router'

import style from './InputArea.css'

import AddTags from '../AddTags/AddTags.js'

class InputArea extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'InputArea'
    this.state = {
      currentTags: this.props.type === "EDIT" ? this.props.oldArticle.tags : [],
      title: this.props.type === "EDIT" ? this.props.oldArticle.title : "",
      description: this.props.type === "EDIT" ? this.props.oldArticle.description : "",
      content: this.props.type === "EDIT" ? this.props.oldArticle.content : "",
      day: this.props.day,
      allowed: this.props.allowed,
      type: this.props.type, // new build or edit
      allTags: this.props.allTags,
      popup: false // popup when true
    }
  }

  onContentChange(e) {
    this.setState({ content: e.target.value })
  }

  onAddTags() {
    this.setState({
      popup: true
    })
  }

  onChildChange(nextState) {
    this.setState({
      currentTags: nextState,
      popup: false
    })
  }

  componentDidMount() {
    if(this.state.allowed) {
      this.refs.title.value = this.state.title
      this.refs.content.value = this.state.content
      this.refs.description.value = this.state.description
    }
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      allowed: nextProps.allowed,
      allTags: nextProps.allTags
    })     
  }

  onFinishHandler() {
    const newArticle = {
      title: this.refs.title.value.trim(),
      description: this.refs.description.value.trim(),
      content: this.refs.content.value.trim(),
      tags: this.state.currentTags
    }
    if(newArticle.title !== "" &&
       newArticle.description !== "" &&
       newArticle.content !== "" &&
       newArticle.tags.length != 0) {
       // not empty
      if(this.state.type === "WRITE") {
        this.props.upload(this.state.type, newArticle)
        alert("SUCCESS!")
        this.props.history.pushState(null, '/')
      } else if (this.state.type === "EDIT") {
        this.props.editArticle(this.props.params.day, this.props.params.title, newArticle)
        alert("SUCCESS!")
        this.props.history.pushState(null, '/')
      }
    } else {
      // empty
      alert("FAIL TO POST! POSSIBLY THERE IS A BLANK!")
    }
  }

  onShowInput() {
    const tags = this.state.currentTags
    if(this.state.allowed) {
      return (
        <div className={style.inputArea}>
        <p>
          <label>title</label>
          <input ref="title" />
        </p>
        <span>2016-7-14</span>
        <div className={style.addTags}>
          <ul>
            {tags.length === 0 ? "" :
             tags.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
          <button onClick={this.onAddTags.bind(this)}>Add tags</button>
        </div>
        <AddTags popup={this.state.popup} 
                 currentTags={tags} 
                 callbackParent={this.onChildChange.bind(this)}
                 allTags={this.state.allTags}/>
        <p>
          <label>description</label>
          <input ref="description" />
        </p>
        <div>
          <label>content</label>
          <textarea ref="content"
                    onChange={this.onContentChange.bind(this)}></textarea>
        </div>
        <div className={style.md}>
          <label>view</label>
          <div dangerouslySetInnerHTML={{__html:md.parse(this.state.content)}} />
        </div>
        <button onClick={this.onFinishHandler.bind(this)}>Finish</button>
        </div>
      )
    } else {
      return <h2>You are now allowed to write!<br />Login first.</h2>
    }
  }

  render() {
    return (
      <div>
        {this.onShowInput()}
      </div>
    )
  }
}

InputArea.propTypes = {
  allowed: React.PropTypes.bool.isRequired,
  type: React.PropTypes.string.isRequired,
  history: React.PropTypes.object.isRequired,
  day: React.PropTypes.string.isRequired,
  allTags: React.PropTypes.array.isRequired
}

export default InputArea
