// 使用总结：
// 1. this.props.navigator.push。可以通过this.props.navigator获取该 NavigatorIOS 的navigation


'use strict';

var React = require('react-native');

// var ViewExample =require('./ViewExample');
// var createExamplePage = require('./createExamplePage');

var {
    AlertIOS,
    PixelRatio,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} = React;

var EmptyPage = React.createClass({

    render: function() {
        return (
            <View style={styles.emptyPage}>
                <Text style={styles.emptyPageText}>{this.props.text}</Text>
            </View>
        );
    },
});

var NavigatorIOSExample = React.createClass({
    // 可以通过类名直接获取，如 navigatorIOSExample.title
    statics: {
        title: '<NavigatorIOS>',
        description: 'iOS navigation capabilities'
    },

    render: function() {
        var recurseTitle = 'Recurse Navigation';
        if (!this.props.topExampleRoute) {
            recurseTitle += ' - more example here';
        }

        return (
            <ScrollView style={styles.list}>
                <View style={styles.line} />
                <View style={styles.group}>
                    <View style={styles.row}>
                        <Text style={styles.rowNote}>
                            See &lt;UIExplorerApp&gt; for top-level usage
                        </Text>
                    </View>
                </View>
                <View style={styles.line} />
                <View style={styles.groupSpace} />
                <View style={styles.line} />
                <View style={styles.group}>
                    {this._renderRow(recurseTitle, ()=> {
                        this.props.navigator.push({
                            title: navigatorIOSExample.title,
                            component: navigatorIOSExample,
                            backButtonTitle: 'Custom Back',
                            passProps: {
                                topExampleRoute: this.props.topExampleRoute || this.props.route
                            }
                        });
                    })}
                    {this._renderRow('Custom Right Button', () => {
                        this.props.navigator.push({
                            title: navigatorIOSExample.title,
                            component: EmptyPage,
                            rightButtonTitle: 'Cancel',
                            onRightButtonPress: ()=>this.props.navigator.pop(),
                            passProps: {
                                text: 'This page has a right button in the nav bar'
                            }
                        });
                    })}
                   {this._renderRow('Custom Left & Right Icons', ()=>{
                        this.props.navigator.push({
                            title: navigatorIOSExample.title,
                            component:EmptyPage,
                            leftButtonTitle: 'Custom Left',
                            onLeftButtonPress: ()=>this.props.navigator.pop(),
                            rightButtonIcon: require('image!NavBarButtonPlus'),
                            onRightButtonPress: ()=>{
                                AlertIOS.alert(
                                    'Bar Button Action',
                                    'Recognized a tap on the bar button icon',
                                    [{
                                        text: 'OK',
                                        onPress: ()=>console.log('Tapped OK')
                                    }]
                                );
                            },
                            passProps: {
                                text: 'This page has an icon for the right button in the navbar'
                            }
                        });
                    })}
                    {this._renderRow('Pop', ()=>{
                        this.props.navigator.pop();
                    })}
                    {this._renderRow('Pop to top', ()=>{
                        this.props.navigator.popToTop();
                    })}
                    {this._renderRow('Replace here', ()=>{
                        var prevRoute = this.props.route;
                        this.props.navigator.replace({
                            title: 'New Navigation',
                            component: EmptyPage,
                            rightButtonTitle: 'Undo',
                            onRightButtonPress: ()=>this.props.navigator.replace(prevRoute),
                            passProps: {
                                text: 'The component is replaced, but there is currently no way to change the right button oo title of the current route'
                            }
                        });
                    })}
                    {this._renderReplacePrevious()}
                    {this._renderReplacePreviousAndPop()}
                    {this._renderPopToTopNavExample()}
                </View>
            </ScrollView>
        );
    },

    _renderRow: function(title: string, onPress: Function) {
        return (
            <View>
                <TouchableHighlight onPress={onPress}>
                    <View style={styles.row}>
                        <Text style={styles.rowText}>{title}</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    },

    _renderReplacePrevious: function() {
        if (!this.props.topExampleRoute) {
            // this is to avoid replacing the UIExplorerList at the top of the stack
            return null;
        }
        return this._renderRow('Replace previous', ()=>{
            this.props.navigator.replacePrevious({
                title: 'Replaced',
                component: EmptyPage,
                passProps: {
                    text: 'This is a replaced "previous" page'
                },
                wrapperStyle: styles.customWrapperStyle
            });
        });
    },

    _renderReplacePreviousAndPop: function() {
        if (!this.props.topExampleRoute) {
            // this is to avoid replacing the UIExplorerList at the top of the stack
            return null;
        }
        return this._renderRow('Replace previous and pop', ()=>{
            this.props.navigator.renderReplacePreviousAndPop({
                title: 'Replaced and Poped',
                component: EmptyPage,
                passProps: {
                    text: 'This is a replaced "previous" page'
                },
                wrapperStyle: styles.customWrapperStyle
            });
        });
    },

    _renderPopToTopNavExample: function() {
        if (!this.props.topExampleRoute) {
            return null;
        }
        return this._renderRow('Pop to top navigatorIOSExample', ()=>{
            this.props.navigator.popToRoute(this.props.topExampleRoute);
        });
    }

});

var styles = StyleSheet.create({
    customWrapperStyle: {
        backgroundColor: '#bbdddd',
    },
    emptyPage: {
        flex: 1,
        paddingTop: 64,
    },
    emptyPageText: {
        margin: 10,
    },
    list: {
        backgroundColor: '#eeeeee',
        marginTop: 10,
    },
    group: {
        backgroundColor: 'white',
    },
    groupSpace: {
        height: 15,
    },
    line: {
        backgroundColor: '#bbbbbb',
        height: 1 / PixelRatio.get(),
    },
    row: {
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    separator: {
        height: 1 / PixelRatio.get(),
        backgroundColor: '#bbbbbb',
        marginLeft: 15,
    },
    rowNote: {
        fontSize: 17,
    },
    rowText: {
        fontSize: 17,
        fontWeight: '500',
    },
});


module.exports = NavigatorIOSExample;












