import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AudioList from '../AudioList'
import Player from '../Player'
import PlayList from '../PlayList'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

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
    <Tab.Screen name='PlayList' component={PlayList} options={{
        tabBarIcon: (color, size) =>{
            return <SimpleLineIcons name="playlist" size={24} color="black" />
        }
    }}/>
  </Tab.Navigator>
  
}


export default AppNavigator