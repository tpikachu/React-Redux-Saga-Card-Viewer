import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'

import './Search.scss'

import { connect } from 'react-redux'
import { movie } from '../../actions'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
    this.searchItems = this.searchItems.bind(this)
    this.clearOption = this.clearOption.bind(this)
  }

  clearOption() {
    const { getSearchKeyword, initPersonalInfo } = this.props
    getSearchKeyword('')
    initPersonalInfo()
    this.setState({ value: '' })
  }

  searchItems(event) {
    const { getSearchKeyword } = this.props
    const currentValue = event.target.value
    this.setState({ value: currentValue })
    getSearchKeyword(currentValue)
  }

  render() {
    const { searchData } = this.props
    const { value } = this.state

    return (
      <div className="search">
        <input className="search__field" type="text" value={value} onChange={this.searchItems} placeholder="Search with keywords" />
        {
          searchData && Object.keys(searchData).length > 0 && (
            <ul className="search__list">
              {Object.keys(searchData.movies).map(key => (
                <li key={searchData.movies[key].id.toString()} className="search__list__item">
                  <Link to={`/movies/${searchData.movies[key].id.toString()}`} className="search__list__item__link" onClick={this.clearOption}>
                    <img src={`https://image.tmdb.org/t/p/w92${searchData.movies[key].poster_path}`} alt="{ movie.title }" className="search__list__item__image" />
                    <h4 className="search__list__item__title">{ searchData.movies[key].title }</h4>
                    <p className="search__list__item__year">{ moment(searchData.movies[key].release_date).format('Y') }</p>
                  </Link>
                </li>
              ))}
              {Object.keys(searchData.persons).map(key => (
                <li key={searchData.persons[key].id.toString()} className="search__list__item">
                  <Link to={`/person/${searchData.persons[key].id.toString()}`} className="search__list__item__link" onClick={this.clearOption}>
                    <img src={`https://image.tmdb.org/t/p/w92${searchData.persons[key].profile_path}`} alt="{ person.title }" className="search__list__item__image" />
                    <h4 className="search__list__item__title">{ searchData.persons[key].name }</h4>
                    <p className="search__list__item__year">
                      Popularity:
                      {' '}
                      { searchData.persons[key].popularity }
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )
        }
      </div>
    )
  }
}

Search.propTypes = {
  getSearchKeyword: PropTypes.func.isRequired,
  initPersonalInfo: PropTypes.func.isRequired,
  searchData: PropTypes.object,
}

Search.defaultProps = {
  searchData: {},
}
const mapStateToProps = state => ({
  searchData: state.get('movieData').toJS().searchData,
})

const mapDispatchToProps = {
  getSearchKeyword: movie.getSearchKeyword,
  initPersonalInfo: movie.initPersonalInfo,

}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
