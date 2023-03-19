import { Text, View ,Alert ,StyleSheet} from 'react-native'
import React, { Component ,createContext} from 'react'
import * as MediaLibrary from 'expo-media-library'
import {DataProvider} from 'recyclerlistview'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AudioContext = createContext();


export class AudioProvider extends Component {

    // { status: "undetermined", canAskAgain: true, granted: false, expires: "never" }
    constructor(props){
        super(props)
        this.state={
            audioFiles:[],
            permissionError : false,
            dataProvider: new DataProvider((r1,r2) => r1!==r2),
            playbackObj: null,
            soundObj: null,
            currentAudio: {},
            isPlaying: false,
            currentAudioIndex: null,
            playbackPosition: null,
            playbackDuration: null,
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

    componentDidMount(){
        this.getPermission()
    }

    updateState = (prevState, newState = {}) => {
        this.setState({...prevState,...newState})
    }

  render() {
    const {
        audioFiles,
        dataProvider,
        permissionError, 
        playbackObj, 
        soundObj, 
        currentAudio, 
        isPlaying, currentAudioIndex,
        playbackPosition,
        playbackDuration,
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
    return <AudioContext.Provider  value={{audioFiles, 
    dataProvider, 
    playbackObj, 
    soundObj, 
    currentAudio, 
    isPlaying, 
    currentAudioIndex, 
    totalAudioCount: this.totalAudioCount,
    playbackPosition,
    playbackDuration,
    updateState: this.updateState,
    loadPreviousAudio: this.loadPreviousAudio,
    }}>
        {this.props.children}
    </AudioContext.Provider>
  }
}



export default AudioProvider