import React, { Component } from 'react'
import './Movie.scss'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import MovieItem from '../MovieItem'
import { movie } from '../../actions'
import LoadingAnimation from '../LoadingAnimation'

class Movie extends Component {
  componentDidMount() {
    const { id, getMovie } = this.props
    getMovie(id)

    document.body.classList.add('single')
  }

  componentWillReceiveProps(nextProps) {
    const { id, getMovie } = this.props
    if (id !== nextProps.id) {
      getMovie(nextProps.id)
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('single')
  }

  render() {
    const { movie: movieObject, initPersonalInfo } = this.props
    const {
      movie, similar, credits, images,
    } = movieObject

    let movieHtml = <LoadingAnimation />
    if (Object.keys(movieObject).length > 0 && Object.keys(movie).length > 0) {
      movieHtml = (
        <div className="movie">
          <section className="movie__bg" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` }} />
          <header className="movie__header">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="{ movie.title }" />
            <h1>{ movie.title }</h1>
            <div className="movie__sidebar__section">
              <h3>Release date</h3>
              <p className="movie-list__item__year">{ moment(movie.release_date).format('MMMM Do YYYY') }</p>
            </div>
            <div className="movie__sidebar__section">
              <h3>Genre</h3>
              <ul className="genre-list">
                {movie.genres.map(genre => (
                  <li key={genre.id.toString()} className="genre-list__item">
                    { genre.name }
                  </li>
                ))}
              </ul>
            </div>
            <div className="movie__sidebar__section">
              <h3>Runtime</h3>
              <p>{ moment.duration(movie.runtime, 'minutes').humanize() }</p>
            </div>

          </header>
          <section className="movie__main single__main__content">
            <section className="section">
              <div className="row">
                <div className="medium-12 columns">
                  <ul className="stats">
                    <li className="stats__item">
                      <span className="stats__item__count">{ movie.vote_average }</span>
                      <span className="stats__item__label">
                        { movie.vote_count }
                        {' '}
                        ratings
                      </span>
                    </li>
                    <li className="stats__item">
                      <span className="stats__item__count">{ movie.revenue.toLocaleString('en-EN', { style: 'currency', currency: 'USD', maximumSignificantDigits: 10 }) }</span>
                      <span className="stats__item__label">revenue</span>
                    </li>
                  </ul>
                  <h3>Sinopsis</h3>
                  <p>{ movie.overview }</p>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="row">
                <div className="medium-12 columns">
                  <h3>Cast</h3>
                  <div className="cast scroll">
                    <ul className="cast__list scroll__list">
                      {credits.cast.map(cast => (
                        <Link to={`/person/${cast.id}`} key={cast.id} onClick={() => initPersonalInfo()} className="cast__list__item scroll__list__item">
                          <span className="cast__list__item__image">
                            { cast.profile_path != null
                                    && <img src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`} alt={cast.name} className="cast__list__item__profile" />
                                    }
                          </span>
                          <span className="cast__list__item__name">
                            <h4>{ cast.name }</h4>
                            { cast.character }
                          </span>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="row">
                <div className="medium-12 columns">
                  <h3>You may also like</h3>
                  <div className="similar scroll">
                    <ul className="scroll__list">
                      {Object.values(similar).map(movie => (
                        <li key={movie.id.toString()} className="movie-list__item scroll__list__item">
                          <MovieItem movie={movie} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </section>
          <aside className="movie__media">
            <ul className="media__list">
              {images.backdrops.map(image => (
                <li key={image.file_path.toString()} className="media__list__item">
                  { image.file_path != null
                    && <img src={`https://image.tmdb.org/t/p/w500${image.file_path}`} alt={movie.title} className="media__list__item__image" />
                  }
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )
    }

    return (
      <div className="container">
        { movieHtml }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  movie: state.get('movieData').toJS().movie,
})

const mapDispatchToProps = {
  getMovie: movie.getMovie,
  initPersonalInfo: movie.initPersonalInfo,
}

Movie.propTypes = {
  getMovie: PropTypes.func.isRequired,
  initPersonalInfo: PropTypes.func.isRequired,
  id: PropTypes.any,
  movie: PropTypes.any.isRequired,
}

Movie.defaultProps = {
  id: 1,
  movie: [],
}
export default connect(mapStateToProps, mapDispatchToProps)(Movie)
