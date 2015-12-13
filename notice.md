###编写React Native代码时需要注意的点

1. 导出一个某块的方式：
```javascript
var ListPage = React.createClass({
    ......
});

module.exports = ListPage;

以上代码的文件名为ListPage.js，我们在使用这个模块的时候，require('./ListPage')。所以需要文件名，module.exports＝xxx，以及 var xxx = React.createClass({})部分都保持一样的名字，否则会提示xxx not found。
```


2. 在render方法中，两个标签之间最好不要有注释，否则可能出现奇怪问题
```javascript
render: function() {
        return (
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
                    <NavigatorIOS
                        style={[styles.container,{flex : 1, marginTop : 0}]}
                        initialRoute={{
                            title: 'News List',
                            component: ListPage,
                        }} />
                        // 此处因为在两个标签之间，使用"//"注释会出问题
                        // {this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
                </TabBarIOS.Item>
            </TabBarIOS>
        );
```


3. 'use strict';   用于开启Strict Mode，Strict Mode的错误处理可以有所提高。这样JS语言的一些语言缺陷也可以避免。

4. var React = require('react-native');  这句代码是将 react-native 模块加载进来，并将它赋值给变量 React 的。React Native 使用同 Node.js 相同的模块加载方式：require，这个概念可以等同于 Swift 中的“链接库”或者“导入库”。

5. 添加导航。构造一个 navigation controller，应用一个样式，并把初始路由设为 Hello World 组件。在 Web 开发中，路由就是一种定义应用导航的一种技术，即定义页面 — — 或者说是路由 — — 与 URL 的对应关系。
```javascript
class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: HelloWorld,
        }}/>
    );
  }
}
```

6. React Native中的“按钮”其实并不是真的按钮。使用了UIKit之后，按钮更倾向于世可以轻碰(tap)的标签(label)，所以APP中使用的按钮是TouchableHighlight。如下代码：TouchableHighlight 时，它会变得透明从而显示出衬底的颜色（也就是按钮下层的组件颜色，即是underlayColor属性指定的颜色），默认展示是styles.button 指定的backgroundColor属性值。
```javascript
<TouchableHighlight style={styles.button}
    underlayColor='#99d9f4'>
  <Text style={styles.buttonText}>Location</Text>
</TouchableHighlight>

style样式如下：
button: {
  backgroundColor: '#48BBEC',
},
```

7. 图片资源引用有两种方式（本地文件），线上图片使用：
```javascript
方式一：通过require('./flux.png')这种方式，flux.png是放在对应的写这段代码的文件中的
<TabBarIOS.Item 
    icon{={require('./flux.png')}
</TabBarIOS.Item>

方式二：放在Images.xcassets中，如下方式引用
<Image source={require('image!house')} style={styles.image}/>

线上图片使用方式：news.pic是该图片对应的url
<Image style={styles.newsPic} source={{uri:news.pic}} />
```

8. 通过添加组件的状态来说明React独特特性：Virtual-DOM和reconciliation新概念
```javascript
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchString: 'london'
        };
    }

    onSearchTextChanged(event) {
        console.log('onSearchTextChanged');
        // 可以从events中取出text属性的值，用于更新组件的状态
        this.setState({searchString: event.nativeEvent.text});
        console.log(this.state.searchString);
    }

    render() {
        console.log('SearchPage.render');
        return (
            <View style={styles.flowRight}>
                <TextInput
                    style={styles.searchInput}
                    value={this.state.searchString}
                    onChange={this.onSearchTextChanged.bind(this)} // bind 可以确保在 onSearchTextChanged 方法中, this 可以作为组件实例的引用
                    placeholder='Search via name or postcode'/>
            </View>
        );
    }
}

```

以上代码，当用户输入时，onSearchTextChanged这个方法被调用，之后render函数会自动被调用（我们可以通过上述的console.log()打印的信息看出来），js控制台打印的内容：
```javascript
SearchPage.render    // 第一次调用render函数用于设置视图
onSearchTextChanged // 文本变化，onSearchTextChanged函数被调用
london
SearchPage.render  // 之后，通过更新组件的状态来反映输入了新的文本，这便会触发另一次render的执行
```

通过以上的打印结果，可以看出：每当应用程序更新任何 React 组件,将会触发整个UI层的重新绘制,这会调用你所有组件的 render 方法。与其他大多数 UI 框架所不同的是,你既不需要在状态改变的时候去手动更新 UI ,或使用某种类型的绑定框架，来创建某种应用程序状态和它的 UI 表现的关联。在 React 中,你不再需要担心 UI 的哪些部分可能受到状态变化的影响;你的整个应用程序的 UI，都可以简单地表示为一个函数的状态。

从上述的描述你可能在想，每次都完全重绘，岂不是性能超级差才对，而且也浪费资源啊这么做。当然了，React也是很聪明的想到了这些，所以它实际的做法是：每当 UI 渲染出来后,render 方法会返回一颗视图渲染树,并与当前的 UIKit 视图进行比较。这个称之为 reconciliation 的过程的输出是一个简单的更新列表, React 会将这个列表应用到当前视图。这意味着，只有实际改变了的部分才会重新绘制。


9. ActivityIndicatorIOS 是一个正在转动的菊花，表示正在加载中

10. Text标签必须包含在View中，如果只是单独的一个标签(如下代码<View>去掉)，是会报错的
```javascript
render() {
    <View style={styles.container}>
        <Text style={styles.description}>{this.state.message}</Text>
    </View>
}

```

11. 上一个navigator controller 传递给下一个值
```javascript
上一个navigator controller 传值给下一个，通过passProps：
this.props.navigator.push({
  title: 'Results',
  component: SearchResults,
  passProps: {listings: response.listings}
});

下一个navigator controler是可以直接使用传递过来的值：this.props.listings(listings是上一个传递过来的key值)

同样我们也可以通过 this.props.navigator 获取到当前的navigator controller。
```

12. 关于ListView组件的使用方法
```javascript
class SearchResults extends Component {

  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
          underlayColor='#dddddd'>
        <View>
          <Text>{rowData.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}
```

ListView – 它能将数据一行行地呈现出来，并放置在一个可滚动的容器内，和 UITableView 很相似。通过 ListView.DataSource 将 ListView 的数据引入，还有一个函数 renderRow 来显示每一行UI。
 - new ListView.DataSource({...}); DataSource是ListView的方法
 - dataSource.cloneWithRows(this.props.listings); 这是将多行数据转化成每行需要的dataSource。这个dataSource是可以直接赋值给ListView 的属性 dataSource
 - renderRow是一个function。它会取每一行中的数据进行渲染一行UI。renderRow(rowData, sectionID, rowID)，rowData即是最初 API 给到前台的一行数据。

在构建数据源的同时，`你还需要一个函数 rowHasChanged 用来比较每两行之间是否重复。 为了确认列表数据的变化，在 reconciliation 过程中ListView 就会使用到这个函数`。在上述实例中，API 返回的房屋数据都有一个guid 属性，它就是用来测试数据变化的。


13. 



###ios.index.js文件(开始载入的js)解析

一般有三种创建方式：
```javascript
方式一：
class PropertyFinderApp extends React.Component {
  render() {
    return React.createElement(React.Text, {style: styles.text}, "Hello World!");
  }
}

方式二：
class PropertyFinderApp extends React.Component {
  render() {
        return <React.Text style={styles.text}>Hello World</React.Text>
  }
}

方式三：
var {
    Text
} = React;
var PropertyFinderApp = React.createClass({
    render: function() {
        return <Text style={style={styles.text}}>Hello World</Text>
    }
});

方式三使用的是一种解构赋值（ES6），准许你获取对象的多个属性并且使用一条语句将它们赋给多个变量。结果是，后面的代码中可以省略掉 React 前缀；比如，你可以直接引用 StyleSheet ，而不再需要 React.StyleSheet。解构同样适用于操作数组。具体可以查看ES6关于解构赋值部分的知识。

上述使用 React.createElement 来构建应用 UI ,React会将其转换到原生环境中。render 很好地展示出 JSX （全称：JavaScript XML ，它是一种XML语言） 以及它表示的结构。
```

方式一中使用了class（ES6新特性，因为React Native是运行在JavaScriptCore中，使用最新的JS特性，不需要担心兼容性）。PropertyFinderApp 继承了 React.Component（React UI的基础模块）。`React Native 组件并不是 UIKit 类，它们只能说是在某种程度上等同`。框架只是将 React 组件树转化成为原生的UI。

AppRegistry 定义了App的入口，并提供了根组件。
```javascript
写法一：
React.AppRegistry.registerComponent('PropertyFinder', function() { return PropertyFinderApp });

写法二：
React.AppRegistry.registerComponent('PropertyFinder', ()=>PropertyFinderApp);

两种写法的不同之处就是：最后传递的callback写法的不同，在React Native中还可以这么简单快捷的编写： ()=>{...此处时函数内容}，如果函数内容只有一句话，就可以更加的简洁了：直接将这句话跟在 “=>” 之后。
```


总结：

它的所有js文件都是运行在模拟器上，跟UIWebView是没有关系的，它使用的就是原生UI。这可以通过查看view层级关系证明：`Debug\View Debugging\Capture View Hierarchy`。

执行原理：
 － Xcode中打开AppDelegate.m文件，找到application:didFinishLaunchingWithOptions：方法，它构建了 RCTRootView 用于加载 JavaScript 应用以及渲染最后的视图的。
 － 当应用开始运行的时候，RCTRootView可以从`http://localhost:8081/index.ios.bundle`该URL中加载应用，重新调用了你在运行这个App时打开的终端窗口，它开启了一个 packager 和 server 来处理上面的请求。当我们在浏览器（通过调试，打开Safari，或者Chrome浏览器）中打开这个URL，就会看到APP的JS代码。



14. 











