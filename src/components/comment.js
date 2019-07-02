import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Dimensions, FlatList} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {VideoView,CreateVideo,styles} from './cell/maincell';
import {CommentCell} from './cell/commentcell'
import {DATATYPE} from './datatype.js';
import {fetchComment} from '../utils/utils';

const {height,width} = Dimensions.get('window');

function ListHeader (props) {
  const InitalImgHeight = (width - 20)/props.item.width*props.item.height;
  const FinallImgHeight = InitalImgHeight >= (height - 113) ? (width - 20) : InitalImgHeight;
  return (
      <View>
      <View style={styles.userView}>
      <Image style={styles.headimg} source={{uri:props.item.profile_image,cache: 'force-cache'}} />
      <View style={styles.nat}>
      <Text style={styles.nattext}>{props.item.name}</Text>
      <Text style={styles.nattext}>{props.item.create_time}</Text>
      </View>
      </View>
      <View style={styles.textView}>
      <Text style={styles.contentText}>{props.item.text}</Text>
      </View>

      {(props.item.type == DATATYPE.PICTUREDATATYPE) && <Image style={{
        height:FinallImgHeight,
        width:width-20,
        marginTop:0,
        marginBottom:10,
        alignSelf:'center'
      }} source={{uri:props.item.image1,cache: 'force-cache'}}></Image>}
      {(props.item.type == DATATYPE.VIDEODATATYPE) && <VideoView videourl={props.item.videouri} coverUri={props.item.image0} coverViewH={FinallImgHeight} coverH={props.item.height} coverW={props.item.width} />}
      <View style={{backgroundColor:'#d3d3d3',height:10,width:width,marginTop:10}}></View>
      </View>
    );
}


export default class comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      item: '',
      commentdata: []
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    console.log(navigation);
    const item = navigation.getParam('ite');
    this.setState({
      item: item
    });
    const paramer = `list=dataList&data=comment&data_id=${item.id}&hot=1`
    fetchComment('GET',paramer,this);
  }
	static navigationOptions = {
		title: '评论',
    headerTintColor: 'white'
	};
  render() {
  	
    
    return (
      <View>
      
      <FlatList 
        keyExtractor={(item,index) => item.id}
        ItemSeparatorComponent={() => <View style={{backgroundColor:'gray',height:1,width:width}}></View>}
        data={this.state.commentdata}
        ListHeaderComponent={() => <ListHeader item={this.state.item} />}
        renderItem={({item}) => <CommentCell item={item} />} />
        
      </View>
      
      
    );
  }
}