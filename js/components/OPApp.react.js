var React = require('react');
var MainSection = require('./MainSection.react');
var NavMenu = require('./NavMenu.react');
var SectionStore = require('../stores/SectionStore');
var NavStore = require('../stores/NavStore');
var NavMenuStore = require('../stores/NavMenuStore');
var DocumentStore = require('../stores/DocumentStore');

/**
 * Retrieve the current Section data from the SectionStore
 */
function getSectionState(menuState) {
  return {
    allSectionItems: SectionStore.getAll(),
    allNavMenuItems: NavMenuStore.getAll(),
    allDocumentItems: DocumentStore.getAll(),
    allNavItems: NavStore.getAll(),
    menuToggle: menuState
  };
}

var OrthodoxPresenterApp = React.createClass({

  getInitialState: function() {
    return getSectionState(true);
  },

  componentDidMount: function() {
    SectionStore.addChangeListener(this._onChange);
    DocumentStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SectionStore.removeChangeListener(this._onChange);
    DocumentStore.addChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
    <div>
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <span id="menu-toggle" className="glyphicon glyphicon-menu-hamburger hamburger"
            aria-hidden="true" onClick={this._onClick}></span>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <h1 className="nav navbar-nav page-title">ORTHODOX PRESENTER</h1>
          </div>
        </div>
      </nav>
      <div id="wrapper" className={this.state.menuToggle ? null : "toggled"}>
        <NavMenu
          allNavMenuItems={this.state.allNavMenuItems}
          allSectionItems={this.state.allSectionItems}
          allNavItems={this.state.allNavItems}
          allDocumentItems={this.state.allDocumentItems}
        />
      </div>
    </div>
    );
  },

  _onClick: function(e) {
    e.preventDefault();
    if (this.state.menuToggle) {
      this.setState({menuToggle: false});
    } else {
      this.setState({menuToggle: true});
    }
  },
  /**
   * Event handler for 'change' events coming from stores
   */
  _onChange: function() {
    this.setState(getSectionState(this.state.menuToggle));
  }

});

module.exports = OrthodoxPresenterApp;
