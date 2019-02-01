import React, { Component } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import MovieItem from '../MovieItem'

import { movie } from '../../actions'
import LoadingAnimation from '../LoadingAnimation'

import './Movies.scss'

class Movies extends Component {
  componentWillMount() {
    const { getMovies, type } = this.props
    getMovies(type)
  }

  render() {
    const { movieData } = this.props
    if (!movieData || Object.keys(movieData).length <= 0) {
      return (
        <LoadingAnimation />
      )
    }

    return (
      <div className="movies">
        <ul className="movie-list">
          {Object.keys(movieData).map(key => (
            <li key={movieData[key].id.toString()} className="movie-list__item">
              <MovieItem movie={movieData[key]} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

Movies.propTypes = {
  getMovies: PropTypes.func.isRequired,
  type: PropTypes.string,
  movieData: PropTypes.object,
}

Movies.defaultProps = {
  type: 'popular',
  movieData: {},
}

const mapStateToProps = state => ({
  movieData: state.get('movieData').toJS().movieData,
})

const mapDispatchToProps = {
  getMovies: movie.getMovies,
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies)

