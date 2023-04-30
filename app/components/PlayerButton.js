//import liraries
import React, { Component } from 'react';
import {AntDesign} from '@expo/vector-icons';
import color from '../misc/color';

// create a component
const PlayerButton = (props) => {
    const {
        iconType, 
        size = 60, 
        iconColor = 'white', 
        onPress, 
    } = props
    const getIconName = (type) => {
        switch(type){
            case 'PLAY':
                return 'pausecircle';
            case 'PAUSE':
                return 'playcircleo';
            case 'NEXT':
                return 'stepforward';
            case 'PREV':
                return 'stepbackward';
        }
    }
    return (
        <AntDesign 
        {...props}
        onPress={onPress} 
        name={getIconName(iconType)} 
        size={size} 
        color={iconColor}/>
    );
};



//make this component available to the app
export default PlayerButton;
