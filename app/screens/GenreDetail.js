import { View, Text, Modal, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
import color from '../misc/color';
import AudioListItem from '../components/AudioListItem';
import { selectAudio } from '../misc/audioController';
import { AudioContext } from '../context/AudioProvider';

const GenreDetail = props => {

    const context = useContext(AudioContext);
    // const playList = props
    const genreList = props?.route?.params
    const [audios , setAudios ] = useState(genreList?.audios)

    const playAudio = async (audio) =>{
        await selectAudio(audio , context , {activePlayList : playList , isPlayListRunning: true})
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
        <Text style={styles.title}>{genreList?.genre}</Text>
        {/* <TouchableOpacity onPress={removePlaylist}>
        <Text style={[styles.title , {color:'red'}]}>Remove</Text>
        </TouchableOpacity> */}
        </View>
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
        //  onAudioPress = {() => playAudio(item)}
        //  onOptionPress={()=>{
        //     setSelectedItem(item)
        //     setModelVisible(true)
        //  }}
         />
        </View> 
        )}
        /> 
    </View>
    {/* <OptionModal visible={modelVisible} onClose={closeModel}
     options={[{title :'Remove from playlist' ,onPress : removeAudio}]} 
     currentItem={selectedItem}/> */}
 </>
   

);
};



const styles = StyleSheet.create({
container: {
    alignItems: 'center',

},
listContainer: {
    padding: 20,
    backgroundColor:color.APP_BG,
    height:'100%',
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

export default GenreDetail;