import React from 'react'
import { compose } from 'recompose'
import {
  Route, withRouter, Link, BrowserRouter as Router,
} from 'react-router-dom'
import WithErrors from './hocs/WithErrors'
import {
  TopRated,
  Popular,
  NowPlaying,
  Movie,
  Person,
} from './components/FundamentalComponent'

import Search from './components/Search'

const App = () => (
  <Router>
    <div className="router-container">
      <nav className="top-bar">
        <Search />
      </nav>
      <aside className="aside">
        <ul className="aside__nav">
          <li><Link className="aside__nav__item aside__nav__item--popular" to="/">Popular</Link></li>
          <li><Link className="aside__nav__item aside__nav__item--top-rated" to="/top-rated">Top rated</Link></li>
          <li><Link className="aside__nav__item aside__nav__item--now-playing" to="/now-playing">Now playing</Link></li>
        </ul>
      </aside>
      <Route exact path="/" component={Popular} />
      <Route path="/top-rated" component={TopRated} />
      <Route path="/now-playing" component={NowPlaying} />
      <Route path="/movies/:id" component={Movie} />
      <Route path="/person/:id" component={Person} />
    </div>
  </Router>
)

export default compose(
  WithErrors,
  withRouter,
)(App)
