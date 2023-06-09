import { Text, View ,StyleSheet, ScrollView, Dimensions, Alert , ActivityIndicator} from 'react-native'
import React, { Component ,useState } from 'react'
import { AudioContext } from '../context/AudioProvider'
import {RecyclerListView , LayoutProvider} from 'recyclerlistview'
import AudioListItem from '../components/AudioListItem'
import Screen from '../components/Screen'
import OptionModal from '../components/OptionModel'
import { Audio } from 'expo-av';
import { play, pause, resume, playNext, selectAudio } from '../misc/audioController';
import { storeAudioForNextOpening } from '../misc/helper'
import {firebase} from '../firebase/config'
import Spinner from 'react-native-loading-spinner-overlay'
import AppLoader from '../components/AppLoader'
import PopUp from '../components/PopUp'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'




export class AudioList extends Component {



  constructor(props) {
    super(props);
    this.state = {
      optionModalVisible: false,
      popUpVisible:false,
      genre_id:null,
      audio :null ,
      uploading :false,
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

     fetchApi = async (audio) =>{
      try {
       const res = await axios.post(`https://225a-14-139-184-226.ngrok-free.app/${audio}`);
      //  console.log(res.data.genre)
      let index = res.data.genre
      this.setState({...this.state , genre_id:index})
      console.log(this.state.genre_id)
      } catch (error) {
       console.log(error)
      } 
 }

    handleAudioPress = async audio => {

      
      await selectAudio(audio , this.context)

    };

    componentDidMount(){
      this.context.loadPreviousAudio()
    }

    rowRenderer = (type , item, index, extendedState )=>{
      return <AudioListItem 
      title={item.filename} 
      isPlaying = {extendedState.isPlaying}
      activeListItem= {this.context.currentAudioIndex === index}
      duration = {item.duration} 
      onAudioPress = {()=>this.handleAudioPress(item)} 
      onOptionPress={()=>{
        this.currentItem = item;
        this.setState({...this.state , optionModalVisible:true})
      }}
      active={this.state.active}
      />
    }

    navigateToPlaylist = () =>{
      this.context.updateState(this.context, {
        addToPlayList: this.currentItem,
      });
      this.props.navigation.navigate('PlayList');

    }

     findGenre = async ()=>{

      this.state.audio = this.currentItem.uri
      this.setState({...this.state , uploading:true})
      const response = await fetch(this.state.audio)
      const blob = await response.blob()
      const filename = this.state.audio.substring(this.state.audio.lastIndexOf('/')+1)
      var ref = firebase.storage().ref().child(filename).put(blob)

      try {
        await ref
      } catch (error) {
        console.log(error.message)
      }
      this.setState({...this.state, optionModalVisible :false})
      // Alert.alert('audio is uploaded')
      this.state.audio = null
      console.log(filename)
      await this.fetchApi(filename)
      this.setState({...this.state, popUpVisible :true})
      this.setState({...this.state , uploading:false})
    }

    addToGenreList = async (genre_id) =>{

      this.context.updateState(this.context, {
        addToGenre: this.currentItem,
      });
        const result = await AsyncStorage.getItem('genrelist');
        console.log(result)
      // we want to check duplicate audio
    
      let oldList = [];  
      let updatedList = [];
      let sameAudio = false;
    
      if (result !== null) {
        oldList = JSON.parse(result);
        
        updatedList = oldList.filter(list => {
          if(list.id === genre_id){
            //check duplicate present or not
            for (let audio of list.audios){
              if(audio.id === this.context.addToGenre.id){
                // alert with some message
                sameAudio = true;
                return;
              }
            }
    
            // update the playList.
            list.audios = [...list.audios, this.context.addToGenre];
    
          }
    
          return list;
    
        })
      }
    
      
    
      if(sameAudio){
        Alert.alert('Found same audio', `${this.context.addToGenre.filename} is already inside the list.`)
        sameAudio = false;
        return this.context.updateState(this.context, {addToGenre: null});
      }
      this.context.updateState (this.context, {addToGenre: null, genreList: [...updatedList]});
      
      console.log(this.context.genreList)
      this.setState({...this.state, popUpVisible :false})
      return await AsyncStorage.setItem('genrelist', JSON.stringify([...updatedList]));
     
      // console.log(this.context.genreList)
      // console.log(this.currentItem + "is adding to genre list")
    }

    //  AudioTrim = () => {
    //   cropAudio({
    //     audioPath: 'https://samplelib.com/lib/preview/mp3/sample-15s.mp3',
    //     startTime: "00:1:00'",
    //     endingTime: '00:05:10',
    //   })
    //     .then((res) => {
    //       setResult5(res);
    //     })
    //     .catch((err) => console.log(err));
    // };
  render() {
      return (
      <AudioContext.Consumer>
        {({dataProvider, isPlaying}) =>{
            if (!dataProvider._data.length) return null;
            return (
              <>
            <Screen style={{flex:1 , padding:10 , borderBottomColor:'lightgray',borderBottomWidth:0.5 ,}}>
              
            <RecyclerListView 
            dataProvider={dataProvider} layoutProvider={this.layoutProvider} rowRenderer={this.rowRenderer} extendedState={{isPlaying}}/>
           
            <OptionModal 
            options={[{title:'Add to playlist' , onPress: this.navigateToPlaylist} , {title:'Find genre' , onPress:this.findGenre}]}
            currentItem={this.currentItem} onClose={() =>{
              this.setState({...this.state, optionModalVisible:false})
            }} visible={this.state.optionModalVisible}/>
            </Screen>
          {this.state.uploading && <Spinner
          color='green'
          visible={this.state.uploading}
          textContent={'AI is finding genre for you , please wait'}
          textStyle={styles.text}
          animation='fade'
          size='large'
          overlayColor='rgba(0,0,0,0.55)'

            />}
             {/* {this.state.uploading && <AppLoader/>} */}
          {this.state.popUpVisible && <PopUp visible={this.state.popUpVisible} 
          onClose={()=>this.setState({...this.state, popUpVisible:false})} 
          currentItem={this.currentItem} 
          onOkPress={()=>this.addToGenreList(this.state.genre_id)}
          genre_id={this.state.genre_id}/>}
          </>
            );
        }}
      </AudioContext.Consumer>
)}}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color:'white',
        fontSize:16,
        // width:'100%',
        // padding:15,

        

    }
})

export default AudioList