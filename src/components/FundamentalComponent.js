import React from 'react'
import PropTypes from 'prop-types'
import Movies from './Movies'
import MovieComponent from './Movie'
import PersonComponent from './Person'

const Movie = ({ match }) => (
  <MovieComponent id={match.params.id} />
)

const Person = ({ match }) => (
  <PersonComponent id={match.params.id} />
)
const Popular = () => (
  <div className="container">
    <div className="app">
      <div className="app__header">
        <h1>Popular Movies</h1>
      </div>
    </div>
    <Movies type="popular" />
  </div>
)

const TopRated = () => (
  <div className="container">
    <div className="app">
      <div className="app__header">
        <h1>Top Rated Movies</h1>
      </div>
    </div>
    <Movies type="top_rated" />
  </div>
)

const NowPlaying = () => (
  <div className="container">
    <div className="app">
      <div className="app__header">
        <h1>Now playing</h1>
      </div>
    </div>
    <Movies type="now_playing" />
  </div>
)

Movie.propTypes = {
  match: PropTypes.object,
}
Movie.defaultProps = {
  match: {},
}
Person.propTypes = {
  match: PropTypes.object,
}
Person.defaultProps = {
  match: {},
}
export {
  Movie,
  Person,
  Popular,
  TopRated,
  NowPlaying,
}
