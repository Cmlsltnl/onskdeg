import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import YourWishList from './modules/yours/YourWishList'
import OthersWishListSelection from './modules/otherwishlistselection/OthersWishListSelection'
import OthersWishList from './modules/others/OthersWishList'
import ChoosePath from './modules/choosepath/ChoosePath'
import SelectUser from './modules/selectuser/SelectUser'
import NameSelect from './modules/nameselect/NameSelect'

require('normalize.css');
require('./global.css');

render((
  <Router history={hashHistory}>
    <Route path="/" component={SelectUser}/>
    <Route path="/choosepath" component={ChoosePath}/>
    <Route path="/nameselect" component={NameSelect}/>
    <Route path="/yours" component={YourWishList}/>
    <Route path="/others" component={OthersWishListSelection}/>
    <Route path="/other/:name" component={OthersWishList}/>
  </Router>
), document.getElementById('wrapper'))
