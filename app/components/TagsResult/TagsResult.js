import React from 'react'
import style from './TagsResult.css'
import { Link } from 'react-router'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.displayName = 'List'
    this.state = {
      articles: [],
      tagName: this.props.params.tag
    }
  }

  componentDidMount() {
    this.props.actions.getTitles({
      type: "TAGS",
      tagName: this.props.params.tag
    })      
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: nextProps.getTitles.articles
    })
  }

  renderTitle() {
    return this.state.articles.map((a, i) => 
      <li key={i}>
        <Link to={`/article/${a.time.day}/${a.title}`}>{a.title}</Link>
        <time>{a.time.day}</time>
      </li>
    )
  }

  render() {
    return (
      <div className={style.tagResult}>
        <h2>TAGS: {this.props.params.tag}</h2>
        <ul>
          {this.renderTitle()}
        </ul>
      </div>
    )
  }
}

export default List;
