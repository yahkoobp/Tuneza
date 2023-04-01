import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import AppNavigator from "./app/screens/navigation/AppNavigator"
import AudioProvider from "./app/context/AudioProvider"
import AudioListItem from "./app/components/AudioListItem"
import { Text, View ,StyleSheet} from 'react-native'
import color from "./app/misc/color"





const myTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: color.APP_BG,
  },
};

export default function App() {
  return( 
    
    <AudioProvider>
   <NavigationContainer>
     <AppNavigator/>
   </NavigationContainer>
  </AudioProvider>
  )

  
}


