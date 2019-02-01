import {
  put, call, takeLatest, all,
} from 'redux-saga/effects'
import axios from 'axios'

import { MOVIE } from '../actions/types'

import { movie } from '../actions'
import { Remote } from '../utils'

function* getPersonalData(action) {
  try {
    const { data } = yield call(axios.get, Remote(`person/${action.payload}`))
    const { data: movieData } = yield call(axios.get, Remote(`person/${action.payload}/combined_credits`))
    yield put(movie.personalInfoSuccess({ ...data, ...movieData }))
  } catch (e) {
    yield put(movie.failure({ error: { ...e } }))
  }
}

function* getMovies(action) {
  if (action.payload === '') { yield put(movie.getMoviesSuccess({ })) } else {
    try {
      const { data } = yield call(axios.get, Remote(`movie/${action.payload}`))
      yield put(movie.getMoviesSuccess({ ...data.results }))
    } catch (e) {
      yield put(movie.failure({ error: { ...e } }))
    }
  }
}

function* getMovie(action) {
  try {
    const { data } = yield call(axios.get, Remote(`movie/${action.payload}`))
    const { data: similar } = yield call(axios.get, Remote(`movie/${action.payload}/similar`))
    const { data: credits } = yield call(axios.get, Remote(`movie/${action.payload}/credits`))
    const { data: images } = yield call(axios.get, Remote(`movie/${action.payload}/images`, { include_image_language: 'en,null' }))
    yield put(movie.getMovieSuccess({
      movie: { ...data }, similar: { ...similar.results.slice(0, 10) }, credits: { ...credits }, images: { ...images },
    }))
  } catch (e) {
    yield put(movie.failure({ error: { ...e } }))
  }
}

function* getSearchKeyword(action) {
  if (action.payload !== '') {
    try {
      const { data: movieData } = yield call(axios.get, Remote('search/movie', { query: action.payload }))
      const { data: personData } = yield call(axios.get, Remote('search/person', { query: action.payload }))
      yield put(movie.getSearchKeywordSuccess({ movies: { ...movieData.results }, persons: { ...personData.results } }))
    } catch (e) {
      yield put(movie.failure({ error: { ...e } }))
    }
  } else {
    yield put(movie.getSearchKeywordSuccess({}))
  }
}

function* watchExampleSagas() {
  yield all([
    takeLatest(MOVIE.PERSONAL_INFO, getPersonalData),
    takeLatest(MOVIE.GET_POPULAR_MOVIES, getMovies),
    takeLatest(MOVIE.GET_SEARCH_KEYWORD, getSearchKeyword),
    takeLatest(MOVIE.GET_MOVIE, getMovie),
  ])
}

export default watchExampleSagas
