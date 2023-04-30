import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import color from '../misc/color';

const ListAddModel = ({
  visible,
 
}) => {
  
  return (
    <>
      <StatusBar hidden />
      <Modal animationType='fade' transparent visible={visible}>
        <View style={styles.modal}>
          <Text style={styles.title} numberOfLines={2}>
            Song added to playlist   😍
          </Text>
        
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
    alignItems:'center',
    justifyContent:'center',
    position: 'absolute',
    bottom: 60,
    right: 10,
    left: 10,
    backgroundColor: 'white',
    borderRadius:10,
    zIndex: 1000,
  },
  optionContainer: {
    padding: 10,
  },
  title: {
    color:'black',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,

  },
  option: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
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
});

export default ListAddModel;