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
import { genres } from '../context/Data';

const OptionModal = ({
  visible,
  onClose,
  currentItem,
  onOkPress,
  genre_id,
}) => {
  const {filename} = currentItem
  const genre_obj = genres[genre_id]
  return (
    <>
      <StatusBar hidden />
      <Modal animationType='fade' transparent visible={visible}>
        <View style={styles.modal}>
            
          <Text style={{marginTop:10 , color:'white' ,fontWeight:'bold',fontSize:17}}>{genre_obj.genre}</Text>
          <Text style={{marginTop:10 , color:"white"}}> Would you like to add this song to {genre_obj.genre} list ? </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onClose}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
           <Pressable style={styles.button} onPress={onOkPress}>
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
    backgroundColor: color.MODAL_POPUP,
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
    color:'white',
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