
'use strict';

var React = require('react-native');
var TabbarView = require('./view/TabBar');

var {
    AppRegistry,
    StyleSheet,
    Text,
    View
} = React;

var TarBarIOSExample = React.createClass({
    render: function() {
        return (
            <TabbarView style={styles.container} />
        );
    }
}); 

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderColor: '#ff0000',
        borderWidth: 1,
        borderStyle: 'solid'
    }
});

AppRegistry.registerComponent('TarBarIOSExample', () => TarBarIOSExample);