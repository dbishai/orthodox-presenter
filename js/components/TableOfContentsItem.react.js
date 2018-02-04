var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');

var TableofContentsItem = createReactClass({

  getInitialState: function () {
    return null;
  },

  propTypes: {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  },

  /**
   * @return {object}
   */
  render: function () {

    return (
      <li className="table-of-contents-item">
        <a className="table-of-contents-item" href={"#" + this.props.id}>{this.props.title}</a>
      </li>
    );
  },

});

module.exports = TableofContentsItem;
