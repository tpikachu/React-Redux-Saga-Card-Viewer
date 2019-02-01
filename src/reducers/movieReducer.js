import { fromJS } from 'immutable'
import { MOVIE } from '../actions/types'

const initialState = fromJS({
  personalData: [],
  movieData: {},
  searchData: {},
  movie: {},
})

export default function movieReducer(state = initialState, action) {
  switch (action.type) {
    case MOVIE.PERSONAL_INFO_SUCCESS:
      return state.merge({
        personalData: action.payload,
      })
    case MOVIE.GET_POPULAR_MOVIES_SUCCESS:
      return state.merge({
        movieData: action.payload,
      })
    case MOVIE.INIT_PERSONAL_INFO:
      return state.merge({
        personalData: {},
      })
    case MOVIE.GET_SEARCH_KEYWORD_SUCCESS:
      return state.merge({
        searchData: action.payload,
      })
    case MOVIE.GET_MOVIE_SUCCESS:
      return state.merge({
        movie: action.payload,
      })
    case MOVIE.INIT_MOVIE_INFO:
      return state.merge({
        movie: [],
      })
    default:
      return state
  }
}
