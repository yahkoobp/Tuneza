import { Text, View ,Alert ,StyleSheet} from 'react-native';
import React, { Component ,createContext} from 'react';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { storeAudioForNextOpening } from '../misc/helper';
import { playNext } from '../misc/audioController';
import { genres } from './Data';


export const AudioContext = createContext();


export class AudioProvider extends Component {

    // { status: "undetermined", canAskAgain: true, granted: false, expires: "never" }
    constructor(props){
        super(props)
        this.state={
            audioFiles:[],
            playList: [],
            genreList:genres,
            addToPlayList: null,
            permissionError : false,
            dataProvider: new DataProvider((r1,r2) => r1!==r2),
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            isPlayListRunning:false,
            activePlayList:[],
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
            addToGenre:null,
            isGenreListRunning:false,
            activeGenreList:[],
        };
        this.totalAudioCount = 0
    }

    permissionAlert = () =>{
       Alert.alert("Permission Required","this app needs to read audio files",[{
        text:'iam ready',
        onPress: ()=>{
            this.getPermission()
        }
       },
       {
        text:'cancel',
        onPress: () =>{
            this.permissionAlert()
        }
       }
    ])
    }

    getAudioFiles = async ()=>{
        const {dataProvider,audioFiles} = this.state
      let media = await MediaLibrary.getAssetsAsync({
        mediaType:'audio'
      })

      media = await MediaLibrary.getAssetsAsync({
        mediaType:'audio',
        first:media.totalCount,
      });
      this.totalAudioCount = media.totalCount
    //   console.log(this.totalAudioCount)

      this.setState({...this.state,dataProvider: dataProvider.cloneWithRows([...audioFiles, ...media.assets]) , 
        audioFiles:[...audioFiles, ...media.assets],})
    //   console.log(this.state.audioFiles)
    }

    loadPreviousAudio = async () => {
        let previousAudio = await AsyncStorage.getItem('previousAudio');
        let currentAudio;
        let currentAudioIndex;

        if (previousAudio === null){
            currentAudio = this.state.audioFiles[0];
            currentAudioIndex = 0;
        }
        else{
            previousAudio = JSON.parse(previousAudio);
            currentAudio = previousAudio.audio;
            currentAudioIndex = previousAudio.index;
        }

        this.setState({...this.state, currentAudio, currentAudioIndex});
    }

    getPermission = async() =>{
       const permission = await MediaLibrary.getPermissionsAsync()
       if(permission.granted){
           this.getAudioFiles()
       }
    if(!permission.canAskAgain && permission.granted){
        this.setState({...this.state, permissionError:true})
    }
       if(!permission.granted && permission.canAskAgain){
        const {status , canAskAgain} = await MediaLibrary.requestPermissionsAsync()
        if(status === 'denied' && canAskAgain){
            this.permissionAlert()
        }

        if(status ==='granted'){
           this.getAudioFiles()
        }

        if(status === 'denied' && !canAskAgain){
            this.setState({...this.state, permissionError:true})
        }
       }
    }

    onPlaybackStatusUpdate = async playbackStatus => {
        if (playbackStatus.isLoaded && playbackStatus.isPlaying){
          this.updateState(this, {
            playbackPosition: playbackStatus.positionMillis,
            playbackDuration: playbackStatus.durationMillis,
          });
        }
        if(playbackStatus.didJustFinish){
          if(this.state.isPlayListRunning) {
            let audio;
            const indexOnPlayList = this.state.activePlayList.audios.findIndex(({id})=> id === this.state.currentAudio.id)
            const nextIndex = indexOnPlayList +1 
            audio = this.state.activePlayList.audios[nextIndex];

            if(!audio)  audio = this.state.activePlayList.audios[0];
            const indexOnAllList = this.state.audioFiles.findIndex(({id}) => id === audio.id)

            const status = await playNext(this.state.playbackObj , audio.uri)
            return this.updateState(this , {
              soundObj : status ,
              isPlaying : true,
              currentAudio : audio,
              currentAudioIndex : indexOnAllList
            })


          }
          const nextAudioIndex = this.state.currentAudioIndex + 1;
          // there is no next audio to play or current audio is the last one
          if (nextAudioIndex >= this.totalAudioCount){
            this.state.playbackObj.unloadAsync();
            this.updateState(this, {
              soundObj: null,
              currentAudio: this.state.audioFiles[0],
              isPlaying: false,
              currentAudioIndex: 0,
              playbackPosition: null,
              playbackDuration: null,
            });
            return await storeAudioForNextOpening(this.state.audioFiles[0], 0);
          }
          // otherwise select next audio
          const audio = this.state.audioFiles[nextAudioIndex];
          const status = await playNext(this.state.playbackObj, audio.uri)
          this.updateState(this, {
            soundObj: status,
            currentAudio: audio,
            isPlaying: true,
            currentAudioIndex: nextAudioIndex,
          });
          await storeAudioForNextOpening(audio, nextAudioIndex);
        }
      };

    componentDidMount(){
        this.getPermission();
        if(this.state.playbackObj === null){
            this.setState({...this.state, playbackObj: new Audio.Sound()} );
        }
    }

    updateState = (prevState, newState = {}) => {
        this.setState({...prevState,...newState})
    }

  render() {
    const {
        audioFiles,
        playList,
        genreList,
        addToPlayList,
        dataProvider,
        permissionError, 
        playbackObj, 
        soundObj, 
        currentAudio, 
        isPlaying, currentAudioIndex,
        playbackPosition,
        playbackDuration,
        isPlayListRunning,
        activePlayList,
        addToGenre,
        isGenreListRunning,
        activeGenreList,
        } = this.state
    if(permissionError) return <View style={{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }}>
        <Text style={{
            fontSize:25,
            textAlign:'center',
            color:'red'

        }}> You should give permission to use this app</Text>
    </View>
    return <AudioContext.Provider  value={{
    audioFiles, 
    playList,
    genreList,
    addToPlayList,
    dataProvider, 
    playbackObj, 
    soundObj, 
    currentAudio, 
    isPlaying, 
    currentAudioIndex, 
    totalAudioCount: this.totalAudioCount,
    playbackPosition,
    playbackDuration,
    isPlayListRunning,
    activePlayList,
    addToGenre,
    isGenreListRunning,
    activeGenreList,
    updateState: this.updateState,
    loadPreviousAudio: this.loadPreviousAudio,
    onPlaybackStatusUpdate: this.onPlaybackStatusUpdate,
    }}>
        {this.props.children}
    </AudioContext.Provider>
  }
}



export default AudioProvider