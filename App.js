import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
const fetch = require('node-fetch');
/*
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {
  Dimensions,
  Button,
  ImageStore,
  ImageEditor,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import BottomDrawer from './BottomDrawer';
// const fetch = require('node-fetch');

let model_output;

class HomeScreen extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: 1,
          longitudeDelta: 1,
        },
        text: 'jjhj',
        imgUrl: 'assets/icon.png',
      }
  }
  componentDidMount() {
    console.log('nnn');
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(latitude, longitude);
      this.setState({
        region: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }
      });
    };
    const error = () => {
      console.log("Unable to retrieve your location");
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }
  getInitialState() {
    return {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }
  onRegionChange(region) {
    console.log('ssss');
    //this.setState({ region });
  }
  async findClosestRestrooms() {
    // get closest restrooms
    let str1 = '';
    let res = '';
    fetch(str1)
      .then((response) => response.json())
      .then((data) => {
        res = data;
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <View style={styles.container}>
       <MapView style={styles.mapStyle}  region={this.state.region}
      onRegionChange={this.onRegionChange}
    />
    <View style={styles.bottomBox}>
        
          <Text>Using geolocation JavaScript API in React</Text>
          <Image
            source={{ uri: this.state.imgUrl }}
            style={{ width: 300, height: 250 }}
          />
          <Button
            title="Find Closest Restrooms"
            style={{ flex: 1 }}
            onPress={() => {
              // do stuff here
            }}
          />
        </View>
    </View>
    );
  }
}

// const RootStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bottomBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

*/
// let model_output;

var screen = Dimensions.get('window');

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just opened');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  renderList() {
    var list = [];

    for (var i=0;i<50;i++) {
      list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
    }

    return list;
  }

  async findClosestRestrooms(long, lat, radius) {
    // get closest restrooms
    let endpoint = 'https://6jii3wt2n6.execute-api.us-east-1.amazonaws.com/test/helloworld-lambda?longitude='+long+'&latitude='+lat+'&radius='+radius;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        alert(JSON.stringify(data))
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    // var BContent = (
    //   <View style={[styles.btn, styles.btnModal]}>
    //     <Button title="X" color="white" onPress={() => this.setState({isOpen: false})}/>
    //   </View>
    // );

    return (
      <View style={styles.wrapper}>
        <View style={styles.mapContainer}>
          {/* <Image style={styles.image} source={{uri: 'https://source.unsplash.com/random'}} /> */}
          <Button title="Position bottom + ScrollView" onPress={() => this.refs.modal6.open()} style={styles.btn}/>
        </View>
        
        <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal6"} swipeArea={20}>
          <ScrollView>
            <View style={{width: screen.width, paddingLeft: 10}}>
              {this.renderList()}
            </View>
          </ScrollView>
        </Modal>

        <View style={styles.bottom}>
           <Button
             title="Find Closest Restrooms"
             style={styles.bottomButton}
             onPress={() => {
               this.findClosestRestrooms(2, 0, 1.23)
             }}
           />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  wrapper: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  modal4: {
    height: 300
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  btnModal: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
    height: 50,
    backgroundColor: "transparent"
  },

  text: {
    color: "black",
    fontSize: 22
  },

  bottomButton: {
    position: 'absolute',
    bottom:0,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },

});


// const RootStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

export default HomeScreen;