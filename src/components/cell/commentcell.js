import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {Component, createRef} from 'react';
import {styles} from './maincell'
function CommentCell (props) {
	const item = props.item;
	console.log(item);
	return (
			<View>
			<View style={styles.userView}>
			<Image style={styles.headimg} source={{uri:item.user.profile_image,cache: 'force-cache'}} />
			<View style={styles.nat}>
			<Text style={styles.nattext}>{item.user.username}</Text>
			<Text style={styles.nattext}>{item.ctime}</Text>
			</View>
			</View>
			<View style={styles.textView}>
			<Text style={styles.contentText}>{item.content}</Text>
			</View>
			</View>
		);
}

export {CommentCell};