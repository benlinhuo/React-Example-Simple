


'use strict';

var React = require('react-native');
var NavigatorIOSExample = require('./NavigatorIOSExample');
var ListPage = require('./ListPage');
var SearchPage = require('./SearchPage');
var Flexbox = require('./Flexbox');
var SimpleAnimation = require('./SimpleAnimation');

var {   
    StyleSheet,
    TabBarIOS,
    NavigatorIOS,
    Text,
    View
} = React;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var TabBarExample = React.createClass({

    // 初始化的时候应该会被调用
    getInitialState: function() {
        return {
            selectedTab: 'blueTab', // 初始化的时候选中redTab
            notifCount: 0,
            presses: 0
        };
    },

    _renderContent:function(color: string, pageText: string, num?: number) {
        return (
            // 设置style的另一种写法
            <View style={[styles.tabContent, {backgroundColor:color}]}>
                <Text style={styles.tabText}>{pageText}</Text>
                <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
            </View>
        );
    },

    render: function() {
        return (
            <TabBarIOS tintColor='white' barTintColor='darkslateblue'>
                <TabBarIOS.Item 
                    title='Blue Tab' 
                    icon={{uri:base64Icon, scale:3}} 
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab'
                        });
                    }}>
                    <NavigatorIOS
                        style={[styles.container,{flex : 1, marginTop : 0}]}
                        initialRoute={{
                            title: 'SearchPage',
                            component: SearchPage,
                        }} />
                </TabBarIOS.Item>
                <TabBarIOS.Item 
                    systemIcon="history" 
                    badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                    selected={this.state.selectedTab === 'redTab'}
                    onPress={() => {
                        // 与开始的时候 getInitialState 呼应
                        this.setState({
                            selectedTab: 'redTab',
                            notifCount: this.state.notifCount + 1
                        });
                    }}>
                    {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
                </TabBarIOS.Item>
                <TabBarIOS.Item 
                    icon={require('./flux.png')}
                    title='More'
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                            presses: this.state.presses + 1
                        });
                    }}>
                    <NavigatorIOS
                        style={[styles.container,{flex : 1, marginTop : 0}]}
                        initialRoute={{
                            title: 'List Page',
                            component: ListPage,
                        }} />
                </TabBarIOS.Item>
                <TabBarIOS.Item 
                    icon={require('./wechat.png')}
                    title="navigator"
                    selected={this.state.selectedTab === 'navigatorTab'}
                    onPress={()=>{
                        console.log('pressed navigtor');
                        this.setState({
                            selectedTab: 'navigatorTab'
                        });
                    }}>
                    <NavigatorIOS 
                        style={[styles.container, {flex: 1, marginTop: 0}]}
                        initialRoute={{
                            title: 'SimpleAnimation',
                            component: SimpleAnimation
                        }} />
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }

});


var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: 'center',
    },
    tabText: {
        color: 'white',
        margin: 50
    }
});

module.exports = TabBarExample;
