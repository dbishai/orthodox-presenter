var React = require('react');
var createReactClass = require('create-react-class');
var MainSection = require('./MainSection.react');
var NavMenu = require('./NavMenu.react');
var SectionStore = require('../stores/SectionStore');
var NavStore = require('../stores/NavStore');
var NavMenuStore = require('../stores/NavMenuStore');
var NavActions = require('../actions/NavActions');
var Cookies = require('js-cookie');

var getState = function (menuState) {
  return {
    allSectionItems: SectionStore.getAll(),
    allNavMenuItems: NavMenuStore.getAll(),
    allNavItems: NavStore.getCommands(),
    menuToggle: NavStore.getToggleState(),
    sectionCategory: NavStore.getCategory()
  };
};

var OrthodoxPresenterApp = createReactClass({

  getInitialState: function () {
    return getState(true);
  },

  componentDidMount: function () {
    SectionStore.addChangeListener(this._onChange);
    NavStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    SectionStore.removeChangeListener(this._onChange);
    NavStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {
    var betaWindowCookie = Cookies.get('beta-window');
    if (betaWindowCookie !== 'true') {
      alert("Welcome to Orthodox Presenter! It's currently in BETA and things "
        + "are still missing but we'd love for you to check it out! God bless");
      Cookies.set('beta-window', 'true')
    }

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
            menuToggleState={this.state.menuToggle}
            sectionCategory={this.state.sectionCategory}
          />
        </div>
      </div>
    );
  },

  _onClick: function (e) {
    e.preventDefault();
    NavActions.toggleMenu();
  },
  /**
   * Event handler for 'change' events coming from stores
   */
  _onChange: function () {
    this.setState(getState(this.state.menuToggle));
  }

});

module.exports = OrthodoxPresenterApp;
