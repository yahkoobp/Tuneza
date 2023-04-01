import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import  Screen from '../components/Screen'
import color from '../misc/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import Slider from '@react-native-community/slider';
import PlayerButton from '../components/PlayerButton';
import {AudioContext} from '../context/AudioProvider';
import { play, pause, resume, playNext, selectAudio, changeAudio, moveAudio } from '../misc/audioController';
import { convertTime, storeAudioForNextOpening } from '../misc/helper';

const {width} = Dimensions.get('window')

const Player = () => {
  const [currentPosition, setCurrentPosition] = useState(0)
  const context = useContext(AudioContext);
  const {playbackPosition,
    playbackDuration,} = context;

  const calculateSeekBar = () => {
    if(playbackPosition !== null && playbackDuration !== null){
      return playbackPosition / playbackDuration;
    }
    return 0
  }

  useEffect(() => {
    context.loadPreviousAudio();
    }, []);

  const handlePlayPause = async () => {
    await selectAudio(context.currentAudio , context)
    //play
    // if(context.soundObj === null){
    //   const audio = context.currentAudio;
    //   const status = await play(context.playbackObj, audio.uri);
    //   context.playbackObj.setOnPlaybackStatusUpdate(context.onPlaybackStatusUpdate)
    //   return context.updateState(context, {
    //     soundObj: status,
    //     currentAudio: audio,
    //     isPlaying: true,
    //     currentAudioIndex: context.currentAudioIndex,
    //   });
    // }
    // //pause
    // if(context.soundObj && context.soundObj.isPlaying){
    //   const status = await pause(context.playbackObj);
    //   return context.updateState(context, {
    //     soundObj: status,
    //     isPlaying: false,
    //   });
    // }
    // //resume
    // if(context.soundObj && !context.soundObj.isPlaying){
    //   const status = await resume(context.playbackObj);
    //   return context.updateState(context, {
    //     soundObj: status,
    //     isPlaying: true,
    //   });
    // }

  };

  const handleNext = async () => {
    await changeAudio(context , 'next') 
    // const {isLoaded} = await context.playbackObj.getStatusAsync();
    // const isLastAudio = context.currentAudioIndex + 1 === context.totalAudioCount;
    // let audio= context.audioFiles[context.currentAudioIndex + 1];
    // let index;
    // let status;

    // if(!isLoaded && !isLastAudio){
    //   index = context.currentAudioIndex + 1;
    //   status = await play(context.playbackObj, audio.uri);
    // }

    // if(isLoaded && !isLastAudio){
    //   index = context.currentAudioIndex + 1;
    //   status = await playNext(context.playbackObj, audio.uri);
    // }

    // if(isLastAudio){
    //   index = 0;
    //   audio = context.audioFiles[0];
    //   if(isLoaded){
    //     status = await playNext(context.playbackObj, audio.uri);
    //   }
    //   else{
    //     status = await play(context.playbackObj, audio.uri);
    //   }
    // }

    // context.updateState(context, {
    //   currentAudio: audio, 
    //   playbackObj: context.playbackObj, 
    //   soundObj: status, 
    //   isPlaying: true,
    //   currentAudioIndex: index,
    //   playbackPosition: null,
    //   playbackDuration: null,
    // });
    // storeAudioForNextOpening(audio, index);
  };


  const handlePrevious = async () => {
    await changeAudio(context , 'previous')
    // const {isLoaded} = await context.playbackObj.getStatusAsync();
    // const isFirstAudio = context.currentAudioIndex <= 0;
    // let audio= context.audioFiles[context.currentAudioIndex - 1];
    // let index;
    // let status;

    // if(!isLoaded && !isFirstAudio){
    //   index = context.currentAudioIndex - 1;
    //   status = await play(context.playbackObj, audio.uri);
    // }

    // if(isLoaded && !isFirstAudio){
    //   index = context.currentAudioIndex - 1;
    //   status = await playNext(context.playbackObj, audio.uri);
    // }

    // if(isFirstAudio){
    //   index = context.totalAudioCount - 1;
    //   audio = context.audioFiles[0];
    //   if(isLoaded){
    //     status = await playNext(context.playbackObj, audio.uri);
    //   }
    //   else{
    //     status = await play(context.playbackObj, audio.uri);
    //   }
    // }

    // context.updateState(context, {
    //   currentAudio: audio, 
    //   playbackObj: context.playbackObj, 
    //   soundObj: status, 
    //   isPlaying: true,
    //   currentAudioIndex: index,
    //   playbackPosition: null,
    //   playbackDuration: null,
    // });
    // storeAudioForNextOpening(audio, index);
  };  


  if (!context.currentAudio) return null;

  const renderCurrentTime = () =>{
    return convertTime(context.playbackPosition / 1000)
  }

  return (
  <Screen>
    <View style={styles.container}>
      <View style={styles.audioCountContainer} >
       { context.isPlayListRunning && (
       <View style={{flexDirection:'row'}} >
        <Text style={{fontWeight:"bold"}}>From PlayList  :</Text>
        <Text>{context.activePlayList.title}</Text>
        </View>) }
      <Text style={styles.audioCount}>{`${context.currentAudioIndex+1} / ${context.totalAudioCount}`}</Text>
      <SimpleLineIcons name="options-vertical" size={20} color={color.FONT_MEDIUM} />
      </View>
      <View style={styles.midBannerContainer}>
        <MaterialCommunityIcons 
        name="music-circle" 
        size={300} 
        color={context.isPlaying? color.ACTIVE_BG : 'teal'} />
      </View>
      <View style={styles.audioPlayerContainer}>
        <Text numberOfLines={1} style={styles.audioTitle}>{context.currentAudio.filename}</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between' , paddingHorizontal:15}}>
        <Text>{currentPosition? currentPosition: renderCurrentTime()}</Text>
        <Text>{convertTime(context.currentAudio.duration)}</Text>
      </View>
      <Slider
  style={{width: width, height: 40}}
  minimumValue={0}
  maximumValue={1}
  value={calculateSeekBar()}
  minimumTrackTintColor={color.FONT_MEDIUM}
  maximumTrackTintColor={color.ACTIVE_BG}
  onValueChange={(value) => {
    setCurrentPosition(convertTime(value * context.currentAudio.duration));
  }}
  onSlidingStart={
    async () => {
      if(!context.isPlaying) return;

      try {
        await pause(context.playbackObj)
      } catch(error) {
        console.log('error inside onSlidingStart callback', error)
      }
    }
  }

  onSlidingComplete={async value => {
    setCurrentPosition(0)
    await moveAudio(context, value)}}
/>
    <View style={styles.audioControllers}>
      <PlayerButton iconType='PREV' onPress={handlePrevious}/>
      <PlayerButton
      onPress={handlePlayPause}
       style={{marginHorizontal: 25}} 
       iconType={context.isPlaying? 'PLAY' : 'PAUSE'}/>
      <PlayerButton iconType='NEXT' onPress={handleNext}/>
    </View>
    </View>
  </Screen>
  );
};


const styles = StyleSheet.create({
  audioControllers:{
    width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20
  },
  audioCountContainer:{
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:15,

  },
    container:{
        flex:1,
    },
    audioCount: {
      textAlign: 'right',

      color: color.FONT_LIGHT,
      fontSize: 14,
    },
    midBannerContainer: {
      flex:1, 
      justifyContent:'center',
      alignItems: 'center',
    },
    audioTitle: {
      fontSize: 16,
      color: color.FONT,
      padding: 15,
    }
});
export default Player;