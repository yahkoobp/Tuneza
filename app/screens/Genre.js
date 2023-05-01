import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import color from '../misc/color'
import PlayListInputModal from '../components/PlayListInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioContext } from '../context/AudioProvider';
import PlayListDetail from './PlayListDetail';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { genres } from '../context/Data';

const Genre = ({navigation}) => {

 
  const context = useContext(AudioContext);
  const {genreList, addToGenre, updateState} = context

  // console.log(genreList)

  const createAsyncStorage =async () =>{
    const result = await AsyncStorage.getItem('genrelist');
    // console.log(result)
    if(result===null){
    try{
     await AsyncStorage.setItem('genrelist', JSON.stringify(genreList))
    } catch(err){
       console.log(err)
    }
  }
  updateState(context, {genreList: JSON.parse(result)})
    }

    const getAsyncStorage=async()=>{
      const result = await AsyncStorage.getItem('genrelist');
      // console.log(result)
     }

  useEffect(()=>{
      createAsyncStorage()
      getAsyncStorage()
      
  },[])


  

  const handleBannerPress =(genrelist)=>{
    navigation.navigate('genreDetail',genrelist);
    
  }
    return (
        <ScrollView contentContainerStyle={styles.container}>
          {genreList.map( item =>(
                  <TouchableOpacity key={item.id.toString()} style={styles.ListBanner} onPress={()=>handleBannerPress(item)}>
                  <MaterialCommunityIcons 
                   name="folder-music" 
                   size={70} 
                   color= 'teal' />
                   <View>
                  <Text style={styles.textStyle}>{item.genre}</Text>
                  <Text style={styles.audioCount}>5 Songs</Text>
                  </View>
                </TouchableOpacity>
          ))}

        </ScrollView>

        
        
      )
}

export default Genre

const styles = StyleSheet.create({
    container:{
        padding: 20,
        backgroundColor:color.APP_BG,
    },
    ListBanner:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'flex-start',
      padding: 8,
      backgroundColor: color.APP_BG,
      borderRadius: 5,
      marginBottom:5,
    },
    audioCount:{
      marginLeft:15,
      color:'white',
      marginTop: 3,
      opacity: 0.5,
      fontSize: 14,
    },
    ListBtn:{
      color: color.ACTIVE_BG,
      letterSpacing: 1,
      fontWeight: 'bold',
      fontSize: 14,
      padding: 5,
    },
    textStyle:{
        marginLeft:15,
        color:'white',
        fontSize:17,
        fontWeight:'bold'
    }
})