import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  Pressable
} from 'react-native';
import color from '../misc/color';

const OptionModal = ({
  visible,
  onClose,
}) => {
  
  return (
    <>
      <StatusBar hidden />
      <Modal animationType='fade' transparent visible={visible}>
        <View style={styles.modal}>
            
          <Text style={{marginTop:10}}> Wow..its HipHop...</Text>
          <Text style={{marginTop:10}}> Would you like to add this song to genre list ? </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
           <Pressable style={styles.button}>
              <Text style={styles.textStyle}>Yes</Text>
            </Pressable>
            </View>
        </View>
        <TouchableWithoutFeedback >
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    justifyContent:'center',
    alignItems:'center',
    bottom: 250,
    right: 30,
    left: 30,
    padding:40,
    backgroundColor: color.APP_BG,
    borderRadius:20,
    zIndex: 1000,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
  },
  buttonContainer:{
    marginTop:20,
    width:'100%',
     display:'flex',
     flexDirection:'row',
     alignItems:'flex-start',
     justifyContent:'space-between',
  },
  button: {
    width:80,
    borderRadius: 10,
    padding: 10,
    elevation: 12,
    textAlign:'center',
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default OptionModal;