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

const AppNavigator = () => {
  return  <Tab.Navigator>
    <Tab.Screen name='AudioList' component={AudioList} options={{
        tabBarIcon: (color, size) =>{
            return <Ionicons name="headset" size={24} color={color} />
        }
    }}/>
    <Tab.Screen name='Player' component={Player} options={{
        tabBarIcon: (color, size) =>{
            return <FontAwesome5 name="compact-disc" size={24} color="black"  />
        }
    }}/>
    <Tab.Screen name='PlayList' component={PlayListScreen} options={{
        tabBarIcon: (color, size) =>{
            return <SimpleLineIcons name="playlist" size={24} color="black" />
        }
    }}/>

    <Tab.Screen name='Genre' component={Genre} options={{
        tabBarIcon: (color, size) =>{
            return <Entypo name="folder" size={24} color="black" />
        },
    }}/>
  </Tab.Navigator>
  
}


export default AppNavigator