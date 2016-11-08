import React from 'react';
import Container from '../../common/container/Container';
import user from '../../common/User';
import { Link } from 'react-router';
var debug = require('debug')('NameSelect');
import firebase from '../../common/firebase/firebase';

var NameSelect = React.createClass({

  getInitialState() {
    return {
      name: "",
      confirmedName: ""
    }
  },

  componentDidMount() {
    if(user.getUserUid() == undefined) {
      this.props.router.push('/')
    }
  },

  nameSelected(e) {
    e.preventDefault();
    debug("Name selected: ", this.state.name);
    this.setState({
      confirmedName: this.state.name
    });

    firebase.database().ref('/userlist').once('value').then(function(snapshot) {
      var users = snapshot.val();

      var newUsers = users.map(el=> {
        if(el.email == user.getUserEmail()) {
          el.name = this.state.confirmedName;
        }
        return el;
      });

      firebase.database().ref('/userlist').set(newUsers);
    }.bind(this));
  },

  updateNameState(e) {
    this.setState({
      name: e.target.value
    })
  },

  render() {
    var continueLink = this.state.confirmedName === "" ? "": (<Link to="/choosepath">Continue</Link>);
    var input = this.state.confirmedName === "" ? (<span><input className="space" value={this.state.name} onChange={this.updateNameState} placeholder="Skriv navn her" /><input type="submit" value="OK" /></span>) : (<div>{this.state.confirmedName}</div>);

    return(
      <Container>
      <h1>Velg brukernavn</h1>
      <div className="flex-column">
        <form onSubmit={this.nameSelected}>
        {input}
        </form>
      </div>

      {continueLink}
      </Container>

    );
  }
});

module.exports = NameSelect;
