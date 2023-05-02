import { View, Text, Modal, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import color from '../misc/color';
import AudioListItem from '../components/AudioListItem';
import { selectAudio } from '../misc/audioController';
import { AudioContext } from '../context/AudioProvider';
import OptionModal from '../components/OptionModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlayListDetail = props => {
    
    const context = useContext(AudioContext);
    // const playList = props
    const playList = props?.route?.params
    // console.log(playList)
    const [modelVisible , setModelVisible ] = useState(false)
    const [selectedItem , setSelectedItem ] = useState({})
    const [audios , setAudios ] = useState(playList?.audios)

    const playAudio = async (audio) =>{
       await selectAudio(audio , context ,{activePlayList : playList , isPlayListRunning: true},{})
    }

    const closeModel = () =>{
      setSelectedItem({});
      setModelVisible(false)

    }

    const removeAudio = async () =>{

        let isPlayListRunning = context.isPlayListRunning;
        let isPlaying = context.isPlaying;
        let soundObj = context.soundObj;
        let playbackPosition = context.playbackPosition;
        let activePlayList = context.activePlayList;

    if(context.isPlayListRunning && context.currentAudio.id === selectedItem.id){
        //stop
        await context.playbackObj.stopAsync()
        await context.playbackObj.unloadAsync()

         isPlayListRunning = false
         isPlaying = false
         soundObj = null
         playbackPosition = 0
         activePlayList = []
    }
      const newAudios = audios.filter(audio => audio.id !== selectedItem.id);
      const result = await AsyncStorage.getItem('playlist')
      if(result !== null) {
        const oldPlayList = JSON.parse(result)
       const updatedPlayList =  oldPlayList.filter((item)=>{
            if(item.id === playList.id){
                item.audios = newAudios
            }
        return item
        })
    AsyncStorage.setItem('playlist' , JSON.stringify(updatedPlayList))
    context.updateState(context , {playList:updatedPlayList, isPlayListRunning ,
         activePlayList , playbackPosition , isPlaying , soundObj})
      }
     setAudios(newAudios)
     closeModel()
    }

    const removePlaylist = async () =>{


        let isPlayListRunning = context.isPlayListRunning;
        let isPlaying = context.isPlaying;
        let soundObj = context.soundObj;
        let playbackPosition = context.playbackPosition;
        let activePlayList = context.activePlayList;

    if(context.isPlayListRunning && activePlayList.id === playList.id){
        //stop
        await context.playbackObj.stopAsync()
        await context.playbackObj.unloadAsync()

         isPlayListRunning = false
         isPlaying = false
         soundObj = null
         playbackPosition = 0
         activePlayList = []
    }
      const result = await AsyncStorage.getItem('playlist')
      if(result !== null) {
        const oldPlayList = JSON.parse(result)
       const updatedPlayList =  oldPlayList.filter(item => item.id !== playList.id)
    AsyncStorage.setItem('playlist' , JSON.stringify(updatedPlayList))
    context.updateState(context , {playList:updatedPlayList, isPlayListRunning ,
         activePlayList , playbackPosition , isPlaying , soundObj})
      }
      props.navigation.goBack()
    }

  return (
   
        <>
        <View style={styles.container}>
            <View style={{ 
                           backgroundColor:color.APP_BG,
                           width:'100%',
                           flexDirection:'row',
                           justifyContent:'space-between',
                           paddingHorizontal:15,
        }}>
            <Text style={styles.title}>{playList?.title}</Text>
            {/* <TouchableOpacity onPress={removePlaylist}>
            <Text style={[styles.title , {color:'red'}]}>Remove</Text>
            </TouchableOpacity> */}
            </View>
            {audios?.length ?
            <FlatList 
            contentContainerStyle={styles.listContainer}
            data = {audios} 
            keyExtractor = {item => item.id.toString()}
            renderItem = {({item}) => (
            <View style={{marginBottom: 10}}>
            <AudioListItem title={item.filename} 
            duration={item.duration}
            isPlaying = {context.isPlaying}
            activeListItem = {item.id === context.currentAudio?.id}
             onAudioPress = {() => playAudio(item)}
             onOptionPress={()=>{
                setSelectedItem(item)
                setModelVisible(true)
             }}
             />
            </View> 
            )}
            /> :<Text style={{marginTop:250 , fontSize:17 , color:'white'}}> No audios</Text>}
        </View>
        <OptionModal visible={modelVisible} onClose={closeModel}
         options={[{title :'Remove from playlist' ,onPress : removeAudio}]} 
         currentItem={selectedItem}/>
     </>
       
    
  );
};



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor:color.APP_BG,
        height:'100%',

    },
    listContainer: {
        padding: 20,
        backgroundColor:color.APP_BG,
        // height:'100%',
    },
    title: {
        marginTop:25,
        textAlign: 'center',
        fontSize: 18,
        fontFamily:'Courier New',
        paddingVertical: 5,
        fontWeight: 'bold',
        color: 'white',
    }
});

export default PlayListDetail;