//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import color from '../misc/color';

// create a component
const PlayListInputModal = ({ visible, onClose,onSubmit }) => {

    const [playListName, setPlayListName] = useState('');
    const handleOnSubmit = () => {
        if(!playListName.trim()){
            onClose()
        }else{
            onSubmit(playListName);
            setPlayListName('');
            onClose()
        }
    }

    return (
        <Modal visible={visible} animationType='fade' transparent>
            <View style={styles.modalContainer}>
                <View style={styles.inputContainer}>
                        <Text style={{color:'white'}}>Create New Playlist</Text>
                    <TextInput value={playListName} onChangeText={(text) => setPlayListName(text)} style={styles.input}/>
                    <AntDesign 
                    name='check' 
                    size={24} 
                    color={color.ACTIVE_FONT} 
                    style={styles.submitIcon} 
                    onPress={handleOnSubmit}/>
                </View>
            </View>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={[StyleSheet.absoluteFillObject, styles.modalBG]}/>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: width - 20,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#382d2d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        color:'white',
        width: width - 40,
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        fontSize: 18,
        paddingVertical: 5,
    },
    submitIcon: {
        padding: 10,
        backgroundColor: '#38D506',
        borderRadius: 50,
        marginTop: 15,
    },
    modalBG: {
        backgroundColor: color.MODAL_BG,
        zIndex: -1,
    }
});

//make this component available to the app
export default PlayListInputModal;
