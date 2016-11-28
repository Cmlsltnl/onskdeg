var React = require('react');

import { Link } from 'react-router';
import Container from '../common/container/Container';
import { withRouter } from 'react-router';
import user from '../common/User';
var debug = require('debug')('ChoosePath');
import store from '../store';

require('./choosepath.css')

var ChoosePath = React.createClass( {

  componentDidMount() {

    var username = "";

    var users = store.getState().allUserReducer;
    debug("users: ", users);

    var filteredUserList = users.filter(dbuser => {
      debug("dbuser: ", dbuser);
     return user.getUserUid() === dbuser.uid; });
     debug("Filtered user list: ", filteredUserList);

     debug("Filtered user list name: ", filteredUserList[0].name);
     username = filteredUserList[0].name;

     if(!username) {
       this.props.router.push('/nameselect')
     }

    if(user.getUserUid() == undefined) {
      this.props.router.push('/')
    }
  },

  render() {

    //<Link className="ChoosePath__anchor-link button" to="/">Bytt bruker</Link>

    return (
      <Container>
        <h1>Velg</h1>
        <div className="ChoosePath__list">
          <Link className="smallspace button" to="/yours">Din ønskeliste</Link>
          <Link className="smallspace button" to="/others">Andres ønskelister</Link>
          <Link className="smallspace button" to="/">Bytt bruker</Link>

        </div>
      </Container>
    );
  }
})

module.exports = ChoosePath;