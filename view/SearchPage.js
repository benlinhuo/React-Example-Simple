

'use strict';

var React = require('react-native');
var SearchResult = require('./SearchResult');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
} = React;


// 工具方法，它不依赖于SearchPage类，所以定义成了一个独立的函数，而不是类方法
function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'http://api.nestoria.co.uk/api?' + querystring;
}


class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london',
            isLoading: false,
            message: ''
        };
    }

    onSearchTextChanged(event) {
        this.setState({searchString: event.nativeEvent.text});
    }

    // 处理返回值
    _handleResponse(response) {
        this.setState({
            isLoading: false,
            message: ''
        });

        this.props.navigator.push({
            title: 'Results',
            component: SearchResult,
            passProps: {listings: response.listings}
        });

        // application_response_code 是 API 中的字段
        // if (response.application_response_code.substr(0, 1) === '1') {
        //     this.setState({
        //         message: 'Properties found:' + response.listings.length
        //     });
        // } else {
        //     this.setState({
        //         message: 'Location not recognized; please try again.'
        //     });
        // }
    }

    // 因为JS中没有私有方法的概念，所以可以简单通过一个下划线作为方法的前缀，来说明该方法是私有方法
    _executeQuery(query) {
        this.setState({isLoading: true});
        // 处理请求
        console.log(query);

        fetch(query)
            .then(response => response.json()) // 可以简单看来function(response) {response.json()} ，即＝>前面是参数，后面是函数体
            .then(json => this._handleResponse(json.response)) // 返回的api中有字段是request，response
            .catch(error => {
                this.setState({
                    isLoading: false,
                    message: 'Something bad happened ' + error
                });
            });
    }   

    onSearchPressed() {
        // urlForQueryAndPage 是上述定义的一个工具方法
        var query = urlForQueryAndPage('place_name', this.state.searchString, 1); 
        this._executeQuery(query);
    }

    // 按照当前位置查询，不过测试的时候，发现基于当前位置搜索，没有结果显示
    onLocationPressed() {
        navigator.geolocation.getCurrentPosition(
            location => {
                var search = location.coords.latitude + ',' + location.coords.longitude;
                search = '55.02,  -1.42';
                this.setState({
                    searchString: search
                });
                var query = urlForQueryAndPage('centre_point', search, 1);
                this._executeQuery(query);
            },
            error => {
                this.setState({
                    message: 'There was a problem with obtaining your location: ' + error
                })
            }
        );
    }

    render() {
        var spinner = this.state.isLoading ? 
            (<ActivityIndicatorIOS hidden="true" size="large" />) : (<View />);
        return (
            <View style={styles.container}>
                <Text style={styles.description}>
                    Search for houses to buy!
                </Text>
                <Text style={styles.description}>
                    Search by place-name, postcode or search near your location.
                </Text>
                <View style={styles.flowRight}>
                    <TextInput
                        style={styles.searchInput}
                        value={this.state.searchString}
                        onChange={this.onSearchTextChanged.bind(this)}
                        placeholder='Search via name or postcode'/>
                    <TouchableHighlight style={styles.button}
                        underlayColor='#99d9f4'
                        onPress={this.onSearchPressed.bind(this)}>
                        <Text style={styles.buttonText}>Go</Text>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight style={styles.button}
                    onPress={this.onLocationPressed.bind(this)}
                    underlayColor='#99d9f4'>
                    <Text style={styles.buttonText}>Location</Text>
                </TouchableHighlight>
                <Image source={require('image!house')} style={styles.image}/>
                {spinner}
                <Text style={styles.description}>{this.state.message}</Text>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565',
        borderWidth: 1,
        borderColor: 'red'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
        borderWidth: 1
    },
    flowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginRight: 5,
        flex: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
        borderRadius: 8,
        color: '#48BBEC'
    },
    image: {
        width: 217,
        height: 138
    }
});

module.exports = SearchPage;













