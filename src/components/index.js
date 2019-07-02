import React, {Component, createRef} from 'react';
import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Image} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator } from "react-navigation";
import comment from './comment'
import my_navigator from './my/my'
import {fetchData} from '../utils/utils'
import {MainCell} from './cell/maincell'

const DATATYPE = {
  ALLDATATYPE: "1",
  VIDEODATATYPE: "41",
  PICTUREDATATYPE: "10",
  TEXTDATATYPE: "29",
  VOICEDATATYPE: "31"
}
const types = ['1','41','10','29','31'];

const navList = ['推荐','视频','图片','段子'];
const {height,width} = Dimensions.get('window');


function TopTabItem (props) {
  const topitemlist = props.navlist;
  
  const listItems = topitemlist.map((itemname,inx) => 

      <View key={inx} >
      <Text onPress={() => props.selectItem(inx)} style={inx===props.curInx?styles.actnavitem:styles.navitem}>{itemname}</Text>
      </View>
    );
  return (
      <View style={styles.container}>
      {listItems}
      </View>
    );
}

function BsFlatList (props) {
  return (
        <View style={{width:width,backgroundColor:'white'}}>
        <FlatList 
        keyExtractor={(item,index) => item.id}
        windowSize={1}
        ItemSeparatorComponent={() => <View style={{backgroundColor:'gray',height:1,width:width}}></View>}
        data={props.item}
        onRefresh={() => props.refreshData()}
        refreshing={!props.isLoaded || (props.item.length==0)} 
        renderItem={({item}) => <MainCell item={item} gotoComment={() => props.navigateComment(item)} />} />
      
        </View>  
    );
  
}

class home extends React.Component{
  constructor(props) {
    super(props);
    this.scrollView = React.createRef();
    this.state = {
      isLoaded: false,
      allData: [],
      videoData: [],
      imgData: [],
      txtData: [],
      currentInx: 0
    }
  }
componentDidMount() {
  const parameters = 'list=list&data=data&type=1';
  let loaded = this.state.allData.length == 0 ? false : true;
  fetchData('GET',parameters,this,'1',loaded);
  
}

refreshData() {
  this.setState({
    isLoaded: !this.state.isLoaded
  });

  console.log('正在刷新');
  let inx = this.state.currentInx;
  const parameters = `list=list&data=data&type=${types[inx]}`;
  fetchData('GET',parameters,this,types[inx],false);
}
	render(){
    
    let data = this.state.allData;
    
		return (
      <View style={styles.mainview}>
      <TopTabItem navlist={navList} curInx={this.state.currentInx} selectItem={(inx) => this.selectItem(inx)} />
      <ScrollView 
      horizontal='true' 
      pagingEnabled='true' 
      style={styles.scrollview}
      scrollEventThrottle={0}
      onMomentumScrollEnd={(e) => this.currentInxActive(e)}
      ref={this.scrollView}
      >
      <BsFlatList navigateComment={(curdata) => this.props.navigation.navigate('Comment',{ite: curdata})} item={this.state.allData} isLoaded={this.state.isLoaded} refreshData={() => this.refreshData()} />
      <BsFlatList navigateComment={(curdata) => this.props.navigation.navigate('Comment',{ite: curdata})} item={this.state.videoData} isLoaded={this.state.isLoaded} refreshData={() => this.refreshData()} />
      <BsFlatList navigateComment={(curdata) => this.props.navigation.navigate('Comment',{ite: curdata})} item={this.state.imgData} isLoaded={this.state.isLoaded} refreshData={() => this.refreshData()} />
      <BsFlatList navigateComment={(curdata) => this.props.navigation.navigate('Comment',{ite: curdata})} item={this.state.txtData} isLoaded={this.state.isLoaded} refreshData={() => this.refreshData()} />
      
      </ScrollView>
      </View>
			
		);
	}

  selectItem(inx) {
    
    if(this.state.currentInx != inx){
      this.scrollView.current.scrollTo({x: width*inx, y: 0, animated: false});
      this.setState({currentInx: inx});
      let loaded;
      switch(types[inx]){
        case  '1':
        loaded = this.state.allData.length==0 ? false : true;
        case  '41':
        loaded = this.state.videoData.length==0 ? false : true;
        case  '10':
        loaded = this.state.imgData.length==0 ? false : true;
        case  '29':
        loaded = this.state.txtData.length==0 ? false : true;
      }
      
      const parameters = `list=list&data=data&type=${types[inx]}`;
      console.log(parameters);
      fetchData('GET',parameters,this,types[inx],loaded);
    }

  }
	
  
  currentInxActive(e) {
    console.log(e.nativeEvent);
        let x = e.nativeEvent.contentOffset.x;
        switch (e.nativeEvent.contentOffset.x/width){
          case 0:
          this.setState({currentInx: 0});
          this.selectItem(0);
          break;
          case 1:
          this.setState({currentInx: 1});
          this.selectItem(1);
          break;
          case 2:
          this.setState({currentInx: 2});
          this.selectItem(2);
          break;
          case 3:
          this.setState({currentInx: 3});
          this.selectItem(3);
          break;
          default:
          this.setState({currentInx: 0});
        }
  }

  loadingPage() {
    return (
        <View>
        <Text>正在加载...</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  mainview:{
    height: height - 64,
    width: width
  },
  container:{
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height:25
  },
  navitem:{
    color: 'black',
    fontSize: 15
  },
  actnavitem:{
    color: 'orange',
    fontSize:15,
    fontWeight: 'bold'
  },
  scrollview:{
    flex: 1,
    marginBottom:49,
    backgroundColor: 'white'
  }
});


const TabBar = createBottomTabNavigator(
		{
			主页: home,
			我的: my_navigator
		},
    {
      initialRouteName: "主页",
      defaultNavigationOptions: ({ navigation }) => ({
        title:'主页',
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        
        if (routeName === '主页') {
          return <Image style={{width:26,height:26}} source={focused ? require('../resource/img/tabBar/tabBar_essence_click_icon.png') : require('../resource/img/tabBar/tabBar_essence_icon.png')} />
        } else if (routeName === '我的') {
          return <Image style={{width:26,height:26}} source={focused ? require('../resource/img/tabBar/tabBar_friendTrends_click_icon.png') : require('../resource/img/tabBar/tabBar_friendTrends_icon.png')} />
        }

      }
    })
    }
	);

TabBar.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];

  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;


  return {
    headerTitle,
  };
};



const AppNavigator = createStackNavigator({
  Home: TabBar,
  Comment:comment
},
{
    initialRouteName: "Home",
    defaultNavigationOptions: {
    	headerStyle: {
      backgroundColor: '#FA0C44',
    },
    headerTintColor: '#fff',
     headerTitleStyle: {
      fontWeight: 'bold',
    },
    }
}
);



const General = createSwitchNavigator({
	GeneralPage: AppNavigator,
});

const AppContainer = createAppContainer(General);



export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}