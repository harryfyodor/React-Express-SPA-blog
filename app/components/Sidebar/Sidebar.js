import React from 'react'
import { Link } from 'react-router'

import style from './Sidebar.css'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'Sidebar'
    this.state = {
      text: "",
      tags: [],
      titlesFetched: false
    }
    this.titlesFetched = false
  }

  componentDidMount() {
    // this.props.getTags()       
  }
  
  componentWillReceiveProps(nextProps) {
    // the first time
    if(nextProps.titlesFetched && !this.titlesFetched) {
      this.titlesFetched = true
      this.props.getTags()
    }
    // got tags by ajax 
    if(this.titlesFetched) {
      // this.titlesFetched = false      
      this.setState({
        tags: nextProps.tags
      })
    }   
  }
 
  // when click a tag
  onTagsHandler(e) {
    this.props.getTitles({
      type: "TAGS",
      tagName: e.target.innerHTML
    })
  }

  onRenderTags(tags) {
    if(tags.length !== 0) {
      return (
        <ul>
          {tags.map((t, i) => 
            <li key={i}><Link to={`/tagsResult/${t}`}
              onClick={this.onTagsHandler.bind(this)}>{t}</Link></li>
          )}
        </ul>
      )
    }
  }

  onChangeHandler(e) {
    this.setState({
      text: e.target.value
    })
  }

  onSearch(e) {
    const text = this.state.text
    if(e.which === 13 && text !== "") {
    
      this.props.getTitles({
        type: "SEARCH",
        searchString: text
      })

      this.props.history.pushState(null, "/searchResult/" + text)
    }
  }

  render() {
    const tags = this.state.tags
    return (
      <div className={style.sidebar}>
        <span>TAGS:</span>
        <ul>
          {this.onRenderTags(tags)}
        </ul>
        <input placeholder="search" 
               ref="search" 
               onKeyDown={this.onSearch.bind(this)}
               onChange={this.onChangeHandler.bind(this)}/>
        <iframe 
          src="http://music.163.com/outchain/player?type=2&id=26140679&auto=0&height=32">
        </iframe>
      </div>
    )
  }
}

Sidebar.propTypes = {
  getTags: React.PropTypes.func.isRequired,
  tags: React.PropTypes.array.isRequired,
  isFetched: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  titlesFetched: React.PropTypes.bool.isRequired,
  history: React.PropTypes.object.isRequired,
  getTitles: React.PropTypes.func.isRequired
}

export default Sidebar
