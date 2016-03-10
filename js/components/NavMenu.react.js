var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavMenuItem = require('./NavMenuItem.react');
var NavItem = require('./NavItem.react');
var SectionItem = require('./SectionItem.react');
var MainSection = require('./MainSection.react');


var NavMenu = React.createClass({

    propTypes: {
        allNavMenuItems: ReactPropTypes.object.isRequired,
        allSectionItems: ReactPropTypes.object.isRequired,
        allDocumentItems: ReactPropTypes.array.isRequired,
        allNavItems: ReactPropTypes.object.isRequired
    },

    /**
     * @return {object}
     */
    render: function() {
        if (Object.keys(this.props.allNavMenuItems).length < 1) {
            return null;
        }

        var navMenuItems = [];
        var sectionItems = [];
        var navItems = [];


        var allNavMenuItems = this.props.allNavMenuItems;

        // menu sections
        var allSectionItems = this.props.allSectionItems;

        // nav commands
        var allNavItems = this.props.allNavItems;


        // menu navigation commands

        for (var key in allNavItems) {
            navItems.push(<NavItem key={key} navItem={allNavItems[key]}/>);
        }

        for (var key in allSectionItems) {
            sectionItems.push(<SectionItem key={key} sectionItem={allSectionItems[key]}/>);
        }

        for (var key in allNavMenuItems) {
            navMenuItems.push(<NavMenuItem key={key} navMenuItem={allNavMenuItems[key]}/>);
        }

        return (
          <section id="nav_menu">
            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                {navMenuItems}
                {navItems}
                {sectionItems}
              </ul>
            </div>
            <MainSection
              allDocumentItems={this.props.allDocumentItems}
            />
          </section>
        );
    },

});

module.exports = NavMenu;
