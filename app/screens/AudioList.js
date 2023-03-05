import { Text, View ,StyleSheet, ScrollView, Dimensions} from 'react-native'
import React, { Component } from 'react'
import { AudioContext } from '../context/AudioProvider'
import {RecyclerListView , LayoutProvider} from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import Screen from '../components/Screen'
import OptionModal from '../components/OptionModel'
import { Audio } from 'expo-av';
import { play, pause, resume, playNext } from '../misc/audioController';




export class AudioList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
    };

    this.currentItem = {};
  }
    static contextType = AudioContext
    layoutProvider = new LayoutProvider((i) => 'audio' , (type , dim)=> {
      switch(type){
        case 'audio':
            dim.width = Dimensions.get('window').width;
            dim.height=70
            break;

            default:
                dim.width = 0;
            dim.height=0;

      }
     
    });

    handleAudioPress = async audio => {
      const {soundObj, playbackObj, currentAudio, updateState} = this.context;
      //playing audio for the first time
      if (soundObj===null){
        const playbackObj = new Audio.Sound()
        const status = await play(playbackObj, audio.uri);
        return updateState(this.context, {currentAudio: audio, playbackObj: playbackObj, soundObj: status})
      }

      //pause audio
      if (soundObj.isLoaded && soundObj.isPlaying && currentAudio.id === audio.id) {
        const status = await pause(playbackObj)
        return updateState(this.context, {soundObj: status})
      }

      //resume audio
      if (soundObj.isLoaded && !soundObj.isPlaying && currentAudio.id === audio.id){
        const status = await resume(playbackObj)
        return updateState(this.context, {soundObj: status})
      }

      //select another audio
      if(soundObj.isLoaded && currentAudio.id !== audio.id){
        const status = await playNext(playbackObj, audio.uri)
        return updateState(this.context, {currentAudio: audio, soundObj: status})
      }
    };

    rowRenderer = (type , item )=>{
      return <AudioListItem 
      title={item.filename} 
      duration = {item.duration} 
      onAudioPress = {()=>this.handleAudioPress(item)} 
      onOptionPress={()=>{
        this.currentItem = item
        this.setState({...this.state , optionModalVisible:true})
      }}/>
    }
  render() {
      return (
      <AudioContext.Consumer>
        {({dataProvider}) =>{
            
            return (
            <Screen style={{flex:1 , padding:10 , borderBottomColor:'lightgray',borderBottomWidth:0.5 ,}}>
            <RecyclerListView 
            dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer}/>
            <OptionModal 
            onPlayPress={()=>console.log('playing audio.....')}
            onPlayListPress={()=>{console.log('Added to the playlist')}}
            currentItem={this.currentItem} onClose={() =>{
              this.setState({...this.state, optionModalVisible:false})
            }} visible={this.state.optionModalVisible}/>
            </Screen>
            );
        }}
      </AudioContext.Consumer>
)}}


// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     text:{
//         fontSize:15,
//         width:'100%',
//         padding:15,
//         borderBottomColor:'lightgray',
//         borderBottomWidth:0.3,

        

//     }
// })

export default AudioList