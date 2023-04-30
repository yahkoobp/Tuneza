import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import color from '../misc/color'
import PlayListInputModal from '../components/PlayListInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioContext } from '../context/AudioProvider';
import PlayListDetail from './PlayListDetail';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Genre = ({navigation}) => {

  const genre_dict = {
    0:"rock",1:"blues",2:"disco",3:"raggae",4:"hiphop",5:"metal",6:"country",7:"classical",8:"pop",9:"jazz"
  }

  const genres = [
    {
      id:0,
      genre:'Rock'
    },
    {
      id:1,
      genre:'Blues'
    },
    {
      id:2,
      genre:'Disco',
    },
    {
      id:3,
      genre:'Raggae'
    },
    {
      id:4,
      genre:'Hiphop'
    },
    {
      id:5,
      genre:'Metal'
    },
    {
      id:6,
      genre:'Country'
    },
    {
      id:7,
      genre:'Classical'
    },
    {
      id:8,
      genre:'Pop'
    },
    {
      id:9,
      genre:'Jazz'
    }
  ]

  genre = []

  const handleBannerPress =()=>{

    navigation.navigate('genreDetail',);
    
  }
    return (
        <ScrollView contentContainerStyle={styles.container}>
          {genres.map( item =>(
                  <TouchableOpacity key={item.id.toString()} style={styles.ListBanner} onPress={handleBannerPress}>
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
            

            {/* <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Classical</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Jazz</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Blues</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Hip Hop</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Disco</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Metal</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Country</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Raggae</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Pop</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity> */}

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
      marginBottom: 15,
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
        fontSize:15,
        fontWeight:'bold'
    }
})
