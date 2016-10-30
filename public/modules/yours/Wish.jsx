var React = require('react');
var debug = require('debug')('Wish');
var ReactDOM = require('react-dom');

var Wish = React.createClass( {

  componentDidUpdate: function() {
    if(this.refs.input) {
      ReactDOM.findDOMNode(this.refs.input).focus()
    }
  },

  getInitialState() {
    return {
      edit: false,
      text: this.props.children
    }
  },

  click: function() {
    this.setState({
      edit: true
    });
    debug("This refs", this.refs);
  },

  focusLost: function() {
    this.setState({
      edit: false
    });
    this.props.save({
      newWish: this.state.text,
      oldWish: this.props.children
    });
  },

  updateText: function(e) {
    this.setState({
      text: e.target.value
    })
  },

  delete: function(e) {
    this.props.delete(this.state.text);
  },

  render: function() {

    var html = this.state.edit ? <input ref="input" onBlur={this.focusLost} onChange={this.updateText} value={this.state.text} /> : <span onClick={this.click}>{this.state.text}</span>;
    return (
      <li>{html} <button onClick={this.delete}>Slett</button></li>
    )
  }
});

module.exports = Wish;
