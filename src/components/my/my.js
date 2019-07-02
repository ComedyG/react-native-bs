import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import setting from './setting';

class my extends React.Component {
static navigationOptions = {
		title: '我的',
    headerTitleStyle: {
      fontSize: 20
    },
};
	render(){
		return (
				<View>
				<Text>我的主页</Text>
				</View>
			);
	}
}

// const My_Navigator = createStackNavigator(
// 		{
// 			My: my,
// 			Setting: setting
// 		},
// 		{
//     initialRouteName: "My",
//     defaultNavigationOptions: {
//     	headerStyle: {
//       backgroundColor: '#FA0C44',
//     },
//     headerTintColor: '#fff',
//      headerTitleStyle: {
//       fontWeight: 'bold',
//     },
//     }
// }
// );

export default my

