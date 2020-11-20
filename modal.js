import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  View,
} from 'react-native'
import Modal from 'react-native-modalbox';

var screen = Dimensions.get('window');

export default class RestroomModal extends Component {
  constructor() {
    super()
    this.state = {
      name: '...', 
      image: 'https://source.unsplash.com/random',
    }
  }

  updateText(new_name, new_image) {
    // console.log(new_name)
    // console.log(new_image)
    this.setState({
      name: new_name, 
      image: new_image,
    });
  }

  open(){
    this.refs.modal.open()
  }

  render() {
    return (
      <Modal style={[styles.modal]} position={"bottom"} ref={"modal"} swipeArea={20}>
        <ScrollView style={{width: screen.width, paddingLeft: 10}}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>{this.state.name}</Text>
          <Image style={styles.image} source={{uri: this.state.image}} />
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  title: {
    color: "black",
    fontSize: 25,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  text: {
    color: "black",
    fontSize: 22,
  },
  image: {
    height: 128,
    width: 128,
  }
});