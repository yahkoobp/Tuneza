import { StyleSheet, Text, View , ScrollView ,TouchableOpacity } from 'react-native'
import React from 'react'
import color from '../misc/color'

const Genre = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity style={styles.ListBanner}>
              <Text style={styles.textStyle}>Rock</Text>
              <Text style={styles.audioCount}>5 Songs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ListBanner}>
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
            </TouchableOpacity>

        </ScrollView>

        
        
      )
}

export default Genre

const styles = StyleSheet.create({
    container:{
        padding: 20,
    },
    ListBanner:{
      padding: 8,
      backgroundColor: 'rgba(204,204,204,0.3)',
      borderRadius: 5,
      marginBottom: 15,
    },
    audioCount:{
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
        fontSize:15,
        color: color.FONT,
        fontWeight:'bold'
    }
})
