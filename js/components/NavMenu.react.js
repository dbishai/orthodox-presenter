var React = require('react');
var ReactPropTypes = React.PropTypes;
var NavMenuItem = require('./NavMenuItem.react');

var NavMenu = React.createClass({

    propTypes: {
        allNavMenuItems: ReactPropTypes.object.isRequired
    },

    /**
     * @return {object}
     */
    render: function() {
        if (Object.keys(this.props.allNavMenuItems).length < 1) {
            return null;
        }

        var menuItems = [];

        var allNavMenuItems = this.props.allNavMenuItems;

        for (var key in allNavMenuItems) {
            menuItems.push(<NavMenuItem key={key} navMenuItem={allNavMenuItems[key]}/>);
        }
        return (
          <section id="nav_menu">
            <div id="sidebar-wrapper">
              <ul className="sidebar-nav">
                {menuItems}
              </ul>
            </div>
          </section>
        );
    },

});

module.exports = NavMenu;
