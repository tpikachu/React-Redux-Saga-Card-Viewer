import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'
import { connect } from 'react-redux'
import { movie } from '../../actions'

const MovieItem = props => {
  const { movie, initMovieInfo } = props

  return (
    <Link to={`/movies/${movie.id.toString()}`} className="movie-list__item__link" onClick={() => initMovieInfo()}>
      <div className="movie-list__item__poster">
        <div className={`movie-list__item__rating movie-list__item__rating--${Math.round(movie.vote_average)}`}>
          { movie.vote_average }
        </div>
        {
          movie.poster_path !== null &&
          <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-list__item__poster__image" />
        }
      </div>
      <h3 className="movie-list__item__title">{ movie.title }</h3>
      <p className="movie-list__item__year">{ moment(movie.release_date).format('Y') }</p>
    </Link>
  )
}

MovieItem.propTypes = {
  movie: PropTypes.object,
  initMovieInfo: PropTypes.any.isRequired,
}

MovieItem.defaultProps = {
  movie: {},
}

const mapStateToProps = () => ({

})

const mapDispatchToProps = {
  initMovieInfo: movie.initMovieInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem)
