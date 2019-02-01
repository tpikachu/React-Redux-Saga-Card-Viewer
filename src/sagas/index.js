import { all, fork } from 'redux-saga/effects'
import watchExampleSagas from './movieSagas'

export default function* rootSaga() {
  yield all([
    fork(watchExampleSagas),
  ])
}
