import React, { Component } from 'react'
import './Person.scss'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'
import { connect } from 'react-redux'
import MovieItem from '../MovieItem'

import { movie } from '../../actions'
import LoadingAnimation from '../LoadingAnimation'

class Person extends Component {
  componentDidMount() {
    const { getPersonalDetail, id } = this.props
    getPersonalDetail(id)
    document.body.classList.add('single')
  }

  componentWillReceiveProps(nextProps) {
    const { id, getPersonalDetail } = this.props
    if (id !== nextProps.id) {
      getPersonalDetail(nextProps.id)
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('single')
  }

  render() {
    const { personalData } = this.props
    let movieHTML = <LoadingAnimation />
    if (personalData && Object.keys(personalData).length > 0) {
      movieHTML = (
        <div className="movie">
          <section className="movie__bg" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${personalData.profile_path}` }} />
          <header className="movie__header">
            <img className="movie__poster" src={`https://image.tmdb.org/t/p/w500${personalData.profile_path}`} alt="{ person.title }" />
            <h3>Personal Info</h3>
            <div className="movie__sidebar__section">
              <h5>Gender</h5>
              <p className="movie-list__item__year">{ personalData.gender }</p>
            </div>
            <div className="movie__sidebar__section">
              <h5>Birthdate</h5>
              <p className="movie-list__item__year">{ moment(personalData.birthday).format('MMMM Do YYYY') }</p>
            </div>
            <div className="movie__sidebar__section">
              <h5>Deathdate</h5>
              <p className="movie-list__item__year">{ personalData.deadthday ? moment(personalData.deadthday).format('MMMM Do YYYY') : 'NaN' }</p>
            </div>
            <div className="movie__sidebar__section">
              <h5>Place of Birth</h5>
              <p className="movie-list__item__year">{ personalData.place_of_birth }</p>
            </div>
            <div className="movie__sidebar__section">
              <h5>Also known as</h5>
              {
                personalData.also_known_as.map((item, key) => (
                  <p className="movie-list__item__year" key={`Also-known-${key}`}>{ item }</p>
                ))
              }
            </div>
          </header>
          <section className="movie__main single__main__content">
            <section className="section">
              <div className="row">
                <div className="medium-12 columns">
                  <h1>{ personalData.name }</h1>
                  <ul className="stats">
                    <li className="stats__item">
                      <span className="stats__item__count">
                        { personalData.popularity }
                        {' '}
                        ratings
                      </span>
                    </li>
                  </ul>
                  <h3>Biography</h3>
                  <p>{ personalData.biography }</p>
                </div>
              </div>
            </section>
            <section className="section">
              <div className="row">
                <div className="medium-12 columns">
                  <h3>Known for</h3>
                  <div className="similar scroll">
                    <ul className="scroll__list">
                      {[...personalData.cast, ...personalData.crew].map((movie, key) => (
                        <li key={`MovieItem ${movie.id} ${key}`} className="movie-list__item scroll__list__item">
                          <MovieItem movie={movie} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            <section className="section">
              <h3>Acting</h3>
              <div className="cast__scroll">
                <table id="acting">
                  <tbody>
                    { [...personalData.cast, ...personalData.crew].filter(movie => movie.title && movie.character).map(movie => (
                      <tr key={`acting-${movie.id}`}>
                        <td>
                          {moment(movie.release_date).format('Y')}
                        </td>
                        <td>
                          <Link to={`/movies/${movie.id.toString()}`}>
                            { movie.title }
                            {' '}
                            as
                            {' '}
                            <p className="character">{movie.character }</p>
                          </Link>
                        </td>
                      </tr>
                    )) }
                  </tbody>
                </table>
              </div>
            </section>
          </section>
          <aside className="movie__media">
            <ul className="media__list">
              {[...personalData.cast, ...personalData.crew].slice(0, 6).map(movie => (
                <li key={movie.id} className="media__list__item">
                  { movie.poster_path
                    && <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="media__list__item__image" />
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
        { movieHTML }
      </div>
    )
  }
}

Person.propTypes = {
  id: PropTypes.any,
  getPersonalDetail: PropTypes.func,
  personalData: PropTypes.any,
}

Person.defaultProps = {
  id: 0,
  personalData: {},
  getPersonalDetail: () => {},
}

const mapStateToProps = state => ({
  personalData: state.get('movieData').toJS().personalData,
})

const mapDispatchToProps = {
  getPersonalDetail: movie.savePersonalInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)
