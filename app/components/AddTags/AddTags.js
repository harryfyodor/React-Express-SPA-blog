import React from 'react'

import style from './AddTags.css'

const notInArray = (array, item) => {
  for(let i = 0; i < array.length; i++)
    if(item === array[i]) return false
  return true
}

const findIndex = (array, item) => {
  for(let i = 0; i < array.length; i++)
    if(item === array[i]) return i
  return -1
}

class AddTags extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'AddTags'
    this.state = {
      left : "0px",
      top : "0px",
      display : "none", // flex
      overflow: "hidden",
      marginTop: "0px",
      tags: this.props.currentTags || [],
      text: "",
      allTags: this.props.allTags || []
    }
  }

  componentWillReceiveProps(nextProps) {
    // important!!!
    if(nextProps.popup) {
      this.setState({
        display: "flex",
        tags: nextProps.currentTags,
        allTags: nextProps.allTags,
        marginTop: document.documentElement.offsetTop || document.body.scrollTop + "px"
      })
      document.getElementsByTagName("body")[0].style.overflow = "hidden"
    }     
  }

  onQuitClick() {
    this.setState({
      tags: [],
      display: "none",
      text: ""
    })
    document.getElementsByTagName("body")[0].style.overflow = ""
  }

  onFinishClick() {
    document.getElementsByTagName("body")[0].style.overflow = ""
    this.setState({
      display: "none"
    })
    this.props.callbackParent([ ...this.state.tags ]) 
  }

  onSubmitHandler(e) {
    // press Enter
    if(e.which === 13) {
      e.preventDefault()
      let tags = [ ...this.state.tags]
      const text = this.state.text
      if (tags.length === 5) {
        alert("At most 5 tags!")
        return
      } else if (text.trim() != "" && 
                 notInArray(tags, text) &&
                 text.trim().length <= 8) {
        tags.push(text)
        this.setState({
          tags: tags,
          text: ""
        })       
      } else {
        alert('Not allow to repeat, leave blank and be too long!');
      }
    }    
  }

  onChangeHandler(e) {
    this.setState({ text: e.target.value })
  }

  // delete tags
  onDeleteHandler(e) {
    // very important!!!
    let tags = [ ...this.state.tags]
    const item = e.target.innerHTML
    const index = findIndex(tags, item)
    tags.splice(index, 1)
    this.setState({
      tags: tags
    })
  }

  // copy the old tags
  onRepeat(e) {
    const item = e.target.innerHTML
    // very important!!!
    let tags = [ ...this.state.tags]
    if (notInArray(tags, item) && tags.length < 5) {
      tags.push(item)
      this.setState({
        tags: tags
      })
    }
  }

  render() {
    const inStyle = {
      left: this.state.left,
      top: this.state.top,
      display: this.state.display,
      overflow: this.state.overflow,
      marginTop: this.state.marginTop
    }
    let tags = this.state.tags
    let allTags = this.state.allTags
    return (
      <div style={inStyle} className={style.addTagsPop}>
        <div>
          <label>Tags have been added (click to delete) :</label>
          <ul className={style.isAdded}>
          {tags.length === 0 ? "(EMPTY)":
           tags.map((t, i) => 
           <li key={i} onClick={this.onDeleteHandler.bind(this)}>{t}</li>)}
          </ul>
          <label>Press Enter to add new tag:</label>
          <input onChange={this.onChangeHandler.bind(this)}
                 onKeyDown={this.onSubmitHandler.bind(this)}
                 value={this.state.text}/>
          <label>All tags (click to add) :</label>
          <ul>
            {allTags.length === 0 ? "(EMPTY)" :
             allTags.map((e, i) => 
              <li key={i} onClick={this.onRepeat.bind(this)}>{e}</li>)}
          </ul>
          <div>
            <button onClick={this.onQuitClick.bind(this)}>Quit</button>
            <button onClick={this.onFinishClick.bind(this)}>Finish</button>
          </div>
        </div>
      </div>
    )
  }
}

AddTags.propTypes = {
  popup: React.PropTypes.bool.isRequired,
  currentTags: React.PropTypes.array.isRequired,
  callbackParent: React.PropTypes.func.isRequired,
  allTags: React.PropTypes.array.isRequired
}

export default AddTags