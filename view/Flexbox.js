

'use strict';

var React = require('react-native');

var {
    Text, 
    StyleSheet,
    View
} = React;

var Flexbox = React.createClass({


    render: function() {
        return (
            <Text style={{fontWeight: 'bold', marginTop: 80}}>
              I am bold
              <Text style={{color: 'red'}}>
                and red
              </Text>
             </Text>
        );
    }
});

var styles = StyleSheet.create({
    flexContainer: {
        marginTop: 80,
        flexDirection: 'row'
    },
    cell: {
        flex: 1,
        height: 50,
        backgroundColor: '#aaaaaa'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    cellfixed: {
        height: 50,
        width: 70,
        backgroundColor: '#FF0000'
    }
});

module.exports = Flexbox;