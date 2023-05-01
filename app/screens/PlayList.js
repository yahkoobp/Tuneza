import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import color from '../misc/color'
import PlayListInputModal from '../components/PlayListInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioContext } from '../context/AudioProvider';
import PlayListDetail from './PlayListDetail';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PlayListAddModel from '../components/ListAddModel';



const PlayList = ({navigation}) => {
  const [playListPopUp , setPlayListPopUp] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayList, setShowPlayList] = useState(false);

  const context = useContext(AudioContext);
  const {playList, addToPlayList, updateState} = context

 

  const createPlayList = async playListName => {
     const result = await AsyncStorage.getItem('playlist');
     if (result !== null){
      const audios =[];
      if(addToPlayList){
        audios.push(addToPlayList);
      }
      const newList = {
        id: Date.now(),
        title: playListName,
        audios: audios
      }

      const updatedList = [...playList, newList];
      updateState(context, {addToPlayList: null, playList: updatedList });
      await AsyncStorage.setItem('playlist', JSON.stringify(updatedList))
     }
     setModalVisible(false);
  }

const renderPlayList = async () => {
  const result = await AsyncStorage.getItem('playlist');
  if(result === null){
    const defaultPlayList = {
      id: Date.now(),
      title: 'My Favorite',
      audios: []
    }

    const newPlayList = [...playList, defaultPlayList];
    updateState(context, {playList: [...newPlayList]})
    return await AsyncStorage.setItem('playlist', JSON.stringify([...newPlayList]));
  }

  updateState(context, {playList: JSON.parse(result)}); 
}


useEffect(() => {
  if(!playList.length){ 
    renderPlayList()
  }
},[]);

const handleBannerPress = async (playList) => { 
  // update playlist if there is any selected audio
  if(addToPlayList){
    setPlayListPopUp(true)
    const result = await AsyncStorage.getItem('playlist');
  // we want to check duplicate audio

  let oldList = [];  
  let updatedList = [];
  let sameAudio = false;

  if (result !== null) {
    oldList = JSON.parse(result);
    
    updatedList = oldList.filter(list => {
      if(list.id === playList.id){
        //check duplicate present or not
        for (let audio of list.audios){
          if(audio.id === addToPlayList.id){
            // alert with some message
            sameAudio = true;
            return;
          }
        }

        // update the playList.
        list.audios = [...list.audios, addToPlayList];

      }

      return list;

    })
  }

  

  if(sameAudio){
    Alert.alert('Found same audio', `${addToPlayList.filename} is already inside the list.`)
    setPlayListPopUp(false)
    sameAudio = false;
    return updateState(context, {addToPlayList: null});
  }
  updateState (context, {addToPlayList: null, playList: [...updatedList]});
  setPlayListPopUp(false)
  return AsyncStorage.setItem('playlist', JSON.stringify([...updatedList]));
  
  }

  
  //if no audio selected then open the list

  

  // selectedPlayList = playList;
  // setShowPlayList(true);
  // console.log(playList)
  navigation.navigate('PlayListDetail' , playList);
};
 

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>

        {playList.length? playList.map(item => (
        <TouchableOpacity key={item.id.toString()} style={styles.playListBanner} onPress={() => handleBannerPress(item)}>
          <MaterialCommunityIcons 
        name="music-box-multiple" 
        size={70} 
        color= 'teal' />
          <View>
          <Text style={{color:'white',fontSize:17 , fontWeight:'bold',marginLeft:15,}}>{item.title}</Text>
          <Text style={styles.audioCount}>{item.audios.length > 1 ? `${item.audios.length} Songs` : `${item.audios.length} Song`}</Text>
          </View>
          <View>
          {/* <AntDesign name="delete" size={24} color="black" /> */}
          </View>
        </TouchableOpacity>)) : null}

        {/* <FlatList data={playList} keyExtractor={item => item.id.toString()} 
        renderItem={({item}) => <Text>{item.title}</Text>}/> */}

        <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginTop:15}}>
          <Text style={styles.playListBtn}>
            + Add new playlist
          </Text>
        </TouchableOpacity>
        <PlayListInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onSubmit={createPlayList}/>
    </ScrollView>
    <PlayListAddModel visible={playListPopUp}/>
  
    </>
    
  )
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        height:'100%',
        backgroundColor:'#2a1d1d',
    },
    playListBanner:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      padding: 0,
      backgroundColor: '#2a1d1d',
      borderRadius: 5,
      marginBottom: 15,
    },
    audioCount:{
      marginLeft:15,
      color:'white',
      marginTop: 3,
      opacity: 0.5,
      fontSize: 13,
    },
    playListBtn:{
      color: '#38D506',
      letterSpacing: 1,
      fontWeight: 'bold',
      fontSize: 14,
      padding: 5,
    }
})
export default PlayList 