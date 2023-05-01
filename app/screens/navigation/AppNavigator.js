import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AudioList from '../AudioList'
import Player from '../Player'
import PlayList from '../PlayList'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import PlayListDetail from '../PlayListDetail';
import Genre from '../Genre';
import GenreDetail from '../GenreDetail';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const PlayListScreen = () =>{
     return (
     <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='PlayList' component={PlayList}/>
        <Stack.Screen name='PlayListDetail' component={PlayListDetail} />
     </Stack.Navigator>
     
     )
}

const GenreScreen = () =>{
    return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
       <Stack.Screen name='genre' component={Genre}/>
       <Stack.Screen name='genreDetail' component={GenreDetail}/>
    </Stack.Navigator>
    
    )
}

const AppNavigator = () => {
  return  <Tab.Navigator  
  screenOptions={({ route }) => ({
      headerShown: true,
      tabBarStyle: {
      activeTintColor: '#fff',
      inactiveTintColor: 'lightgray',
      activeBackgroundColor: 'green',
      inactiveBackgroundColor: '#b55031',
      height: 65,
      paddingHorizontal: 3,
      paddingTop: 0,
      backgroundColor: '#2a1d1d',
      
      // borderTopLeftRadius:15,
      // borderTopRightRadius:15,
    //   position: 'absolute',
      borderTopWidth: 0,
  },
})}
  >
    <Tab.Screen name='AudioList' component={AudioList} options={{
        title: 'Audio List',
        headerStyle: {
          backgroundColor: '#382d2d',
          
         
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: (color, size) =>{
            return <Ionicons name="headset" size={24} color='white' />
        }

        
    }}/>
    <Tab.Screen name='Player' component={Player} options={{
        title: 'Audio Player',
        headerStyle: {
          backgroundColor: '#382d2d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: (color, size) =>{
            return <FontAwesome5 name="compact-disc" size={24} color='white'  />
        }
    }}/>
    <Tab.Screen name='PlayList' component={PlayListScreen} options={{
        title: 'Your Playlist',
        headerStyle: {
          backgroundColor: '#382d2d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: (color, size) =>{
            return <SimpleLineIcons name="playlist" size={24} color='white' />
        }
    }}/>

    <Tab.Screen name='Genre' component={GenreScreen} options={{
        title: 'Genre',
        headerStyle: {
          backgroundColor: '#382d2d',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarIcon: (color, size) =>{
            return <Entypo name="folder" size={24} color='white' />
        },
    }}/>
  </Tab.Navigator>

}


export default AppNavigator