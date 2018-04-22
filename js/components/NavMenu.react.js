var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var NavSubMenuStore = require('../stores/NavSubMenuStore');
var DocumentStore = require('../stores/DocumentStore');
var NavMenuItem = require('./NavMenuItem.react');
var NavItem = require('./NavItem.react');
var SectionItem = require('./SectionItem.react');
var MainSection = require('./MainSection.react');
var TableOfContents = require('./TableOfContents.react');
var Footer = require('./Footer.react');

var getState = function () {
  return {
    attributes: NavSubMenuStore.getAll()
  };
};

var NavMenu = createReactClass({

  propTypes: {
    allNavMenuItems: PropTypes.object.isRequired,
    allSectionItems: PropTypes.object.isRequired,
    allNavItems: PropTypes.object.isRequired,
    menuToggleState: PropTypes.bool.isRequired,
    sectionCategory: PropTypes.string.isRequired
  },

  getInitialState: function () {
    return getState();
  },

  componentDidMount: function () {
    NavSubMenuStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    NavSubMenuStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function () {
    if (Object.keys(this.props.allNavMenuItems).length < 1) {
      return null;
    }

    var sectionItems = [];
    var navItems = [];
    var navMenuItems = [];

    var allNavMenuItems = this.props.allNavMenuItems;

    // menu sections
    var allSectionItems = this.props.allSectionItems;

    // nav commands
    var allNavItems = this.props.allNavItems;


    // menu navigation commands
    for (var key in allNavItems) {
      navItems.push(<NavItem key={key} navItem={allNavItems[key]} />);
    }

    for (var key in allNavMenuItems) {
      navMenuItems.push(<NavMenuItem key={key}
        attributes={this.state.attributes}
        navMenuItem={allNavMenuItems[key]}
      />);
    }

    for (var key in allSectionItems) {
      sectionItems.push(<SectionItem key={key} attributes={this.state.attributes} sectionItem={allSectionItems[key]} />);
    }

    if (this.state.attributes.autoLoad) {
      DocumentStore.getDocuments(null, this.state.attributes);
    }

    return (
      <section id="nav_menu">
        <div id="sidebar-wrapper">
          <ul className="sidebar-nav">
            {navMenuItems}
            <hr />
            <TableOfContents />
            <hr />
            {navItems}
            {sectionItems}
          </ul>
          <Footer
            menuToggleState={this.props.menuToggleState}
          />
        </div>
        <MainSection
          attributes={this.state.attributes}
        />
      </section>
    );
  },

  _onChange: function () {
    this.setState(getState());
  }
});

module.exports = NavMenu;
