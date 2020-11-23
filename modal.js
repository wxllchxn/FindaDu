import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  View,
  TouchableOpacity,
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

  // TODO render navigation with pressedMarker with given index

  render() {
    return (
      <Modal style={styles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
        <ScrollView style={styles.scroll}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>{this.state.name}</Text>
          <View style={{flexDirection:"row"}}>
            <Image style={styles.image} source={{uri: this.state.image}} />
            <View style={styles.right}>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Rating: </Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Amenities: </Text>
              <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Reviews</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.appButtonContainer}
            onPress={() => {
              console.log('navigate')
            }}>
            <Text style={styles.appButtonText}>Navigate to this restroom</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 270,
    borderRadius: 10,
  },
  scroll: {
    width: screen.width,
    paddingLeft: 10,
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
    fontSize: 18,
  },
  image: {
    height: 135,
    flex: 1,
  },
  right: {
    flex:2,
    flexDirection: 'column',
    marginLeft: 10,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#147EFB",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    left: 0, 
    right: 0,
    marginTop: 10,
    marginLeft:10,
    marginRight:10,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  }
});