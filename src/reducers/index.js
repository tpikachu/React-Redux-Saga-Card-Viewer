import { combineReducers } from 'redux-immutable'
import routeReducer from './routeReducer'
import movieReducer from './movieReducer'

const rootReducer = asyncReducers => combineReducers({
  route: routeReducer,
  movieData: movieReducer,
  ...asyncReducers,
})

export default rootReducer
