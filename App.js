import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigator from "./app/screens/navigation/AppNavigator"
import AudioProvider from "./app/context/AudioProvider"
import AudioListItem from "./app/components/AudioListItem"
import { Text, View ,StyleSheet} from 'react-native'

export default function App() {
  return( 
    <AudioProvider>
  <NavigationContainer>
     <AppNavigator/>
  </NavigationContainer>
  </AudioProvider>
  )

  
}


