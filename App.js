import React, { useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import AppNavigator from "./app/screens/navigation/AppNavigator"
import AudioProvider from "./app/context/AudioProvider"
import AudioListItem from "./app/components/AudioListItem"
import { Text, View ,StyleSheet} from 'react-native'
import color from "./app/misc/color"
import SplashScreen from "react-native-splash-screen";
import axios from "axios";


const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.APP_BG,
  },
};

export default function App() {

  const fetchApi = async () =>{
       try {
        const res = await axios.get('http://192.168.43.175:8000');
        console.log(res.data)
       } catch (error) {
        console.log(error)
       } 
  }

  useEffect(()=>{
    fetchApi()
  },[])

  return( 
    
    <AudioProvider>
   <NavigationContainer>
     <AppNavigator/>
   </NavigationContainer>
  </AudioProvider>
  )

  
}


