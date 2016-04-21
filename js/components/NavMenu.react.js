var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavSubMenuStore = require('../stores/NavSubMenuStore');
var NavMenuItem = require('./NavMenuItem.react');
var NavItem = require('./NavItem.react');
var SectionItem = require('./SectionItem.react');
var MainSection = require('./MainSection.react');
var Footer = require('./Footer.react');

var getState = function () {
  return {
      attributes: NavSubMenuStore.getAll()
  };
};

var NavMenu = React.createClass({

    propTypes: {
        allNavMenuItems: ReactPropTypes.object.isRequired,
        allSectionItems: ReactPropTypes.object.isRequired,
        allNavItems: ReactPropTypes.object.isRequired
    },

    getInitialState: function() {
      return getState();
    },

    componentDidMount: function() {
      NavSubMenuStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
      NavSubMenuStore.removeChangeListener(this._onChange);
    },
    /**
     * @return {object}
     */
    render: function() {
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
            navItems.push(<NavItem key={key} navItem={allNavItems[key]}/>);
        }

        for (var key in allNavMenuItems) {
            navMenuItems.push(<NavMenuItem key={key}
                attributes={this.state.attributes}
                navMenuItem={allNavMenuItems[key]}
                />);
        }

        for (var key in allSectionItems) {
            sectionItems.push(<SectionItem key={key} sectionItem={allSectionItems[key]}/>);
        }

        return (
          <section id="nav_menu">
            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                {navMenuItems}
                {navItems}
                {sectionItems}
              </ul>
              <Footer/>
            </div>
            <MainSection
              attributes={this.state.attributes}
            />
          </section>
        );
    },

    _onChange: function() {
      this.setState(getState());
    }
});

module.exports = NavMenu;
