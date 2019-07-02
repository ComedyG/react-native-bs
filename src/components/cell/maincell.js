import {Platform, StyleSheet, Text, View, ScrollView, Dimensions, FlatList, Image, TouchableOpacity, Modal} from 'react-native';
import React, {Component, createRef} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import Video from 'react-native-video';
const DATATYPE = {
  VIDEODATATYPE: "41",
  PICTUREDATATYPE: "10",
  TEXTDATATYPE: "29",
  VOICEDATATYPE: "31"
}
const {height,width} = Dimensions.get('window');
class MainCell extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			isPre: false,
			currentUrl: ''
		};
	}
	
	render () {
		const item = this.props.item;
		const InitalImgHeight = (width - 20)/item.width*item.height;
		const FinallImgHeight = InitalImgHeight >= (height - 113) ? (width - 20) : InitalImgHeight;
		let isPre = false;
		let currentUrl = '';
		function PreViewImg (imgurl,target) {
		console.log(imgurl);
		
		target.setState({
			isPre: true,
			currentUrl: imgurl
		});
		
	}
		return (
			<View>
			<View style={styles.userView}>
			<Image style={styles.headimg} source={{uri:item.profile_image,cache: 'force-cache'}} />
			<View style={styles.nat}>
			<Text style={styles.nattext}>{item.name}</Text>
			<Text style={styles.nattext}>{item.create_time}</Text>
			</View>
			</View>
			<View style={styles.textView}>
			<Text style={styles.contentText} onPress={() => this.props.gotoComment()}>{item.text}</Text>
			</View>

			{(item.type == DATATYPE.PICTUREDATATYPE) && <TouchableOpacity onPress={() => PreViewImg(item.image1,this)}>
			<Image style={{
				position:'relative',
				height:FinallImgHeight,
				width:width-20,
				marginTop:0,
				marginBottom:10,
				alignSelf:'center'
			}} source={{uri:item.image1,cache: 'force-cache'}} defaultSource={require('../../resource/img/zhanwei.jpeg')}></Image></TouchableOpacity>}
			{(item.height*(width-20)/item.width > height) && (item.type == DATATYPE.PICTUREDATATYPE) && <View style={{position:'absolute',backgroundColor:'#00bfff',width:30,height:30,bottom:45,right:10}}>
									<Text style={{marginTop:9,color:'white',fontSize:12,textAlign:'center',fontWeight:'bold'}}>长图</Text>
									</View>}
			<Modal visible={this.state.isPre} transparent={true}>
                <ImageViewer imageUrls={[{url:this.state.currentUrl}]} onClick={() => (this.setState({isPre:false}))} />
            </Modal>

			{(item.type == DATATYPE.VIDEODATATYPE) && <VideoView videourl={item.videouri} coverUri={item.image0} coverViewH={FinallImgHeight} coverH={item.height} coverW={item.width} />}
			
			<View style={styles.bottomView}>
			<View style={{flexDirection:'row'}}>
			<Image source={require('../../resource/img/mainCellDing.png')} style={{height:15,width:15}}/>
			<Text style={{fontSize:12,color:'grey'}}>{item.ding}</Text>
			</View>
			<View style={{flexDirection:'row'}}>
			<Image source={require('../../resource/img/mainCellCai.png')} style={{height:15,width:15}}/>
			<Text style={{fontSize:12,color:'grey'}}>{item.hate}</Text>
			</View>
			<View style={{flexDirection:'row'}}>
			<Image source={require('../../resource/img/mainCellShare.png')} style={{height:15,width:15}}/>
			<Text style={{fontSize:12,color:'grey'}}>{item.repost}</Text>
			</View>
			<View style={{flexDirection:'row'}}>
			<Image source={require('../../resource/img/mainCellComment.png')} style={{height:15,width:15}}/>
			<Text style={{fontSize:12,color:'grey'}}>{item.comment}</Text>
			</View>
			</View>
			</View>
			
		);
	}
	
}

class VideoView extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			startPlay: false,
		};
	}
	
	
	render() {
		const imgH = (width-20) / this.props.coverW * this.props.coverH;
		const imgW = (width-20) / this.props.coverH * this.props.coverW;
		return (
			<View style={{position:'relative',backgroundColor:'white',marginHorizontal:10,marginVertical:0,height:this.props.coverViewH}}>
			<Image source={{uri:this.props.coverUri,cache: 'force-cache'}} style={{height:imgH,
														width:imgW,
														maxHeight:width-20,
														maxWidth:width-20,
														alignSelf:'center'
													}} ></Image>
			<TouchableOpacity onPress={() => (this.setState({startPlay:true}))} style={{position:'absolute',alignSelf:'center',top:this.props.coverViewH/2-20}}>
			<Image source={require('../../resource/img/feng.png')} />
			</TouchableOpacity>
			{this.state.startPlay == true && <CreateVideo videourl={this.props.videourl}/>}
			</View>
			);
			
		}
}

function CreateVideo (props) {
	
	return (
			<Video source={{uri:props.videourl}} controls={true} style={{width:'100%',height:'100%',position:'absolute',top:0,right:0,bottom:0,left:0}}/>
		);
}

const styles = StyleSheet.create({
	userView:{
		margin: 0,
		flexDirection:'row',
		justifyContent:'flex-start'
	},
	headimg:{
		height: 28,
  		width: 28,
  		marginTop: 10,
  		marginLeft: 10,
  		borderRadius: 14
	},
	nat:{
		marginTop: 15,
  		marginLeft: 10
	},
	nattext:{
		color:'black',
		fontSize:9
	},
	textView:{
		margin:10
	},
	contentText:{
		color:'black',
		fontSize:16
	},
	bottomView:{
		flexDirection:'row',
		justifyContent:'space-between',
		alignItems:'center',
		margin:10
	}
});




export { MainCell,VideoView,CreateVideo,styles };