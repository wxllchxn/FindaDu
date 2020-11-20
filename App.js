import React from 'react';
import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Slider from 'react-native-slider';
import RestroomModal from './modal.js';
import Modal from 'react-native-modalbox';
const fetch = require('node-fetch');

var screen = Dimensions.get('window');

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      restrooms: [],
    };
  }

  componentDidMount() {
    // console.log('component did mount');
    const success = position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(latitude, longitude);
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

  getUserMarker(){
    var tempLatLng = {
        'latitude': this.state.region.latitude,
        'longitude': this.state.region.longitude,
    };
    //const img = require('../assets/userPin.png');
    return <Marker
      key={0}
      coordinate={tempLatLng}
      pinColor={'gold'}
    />;
  }
      
  getMarkers(){
    var marker_list = [];
    for (var i = 0; i < this.state.restrooms.length; i++){
      let latlong = {
        'latitude': this.state.restrooms[i].latitude,
        'longitude': this.state.restrooms[i].longitude
      };
      let ind = i + 1;
      marker_list.push(<Marker
        key={ind}
        coordinate={latlong}
        title={this.state.restrooms[i].name}
        description={""}
        onPress={() => this.pressedMarker(ind-1)} 
      />);
    }
    return marker_list;
  }
                       
  onRegionChange(region) {
    // console.log('region change ' + region);
    //this.setState({ region });
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

  async findClosestRestrooms(long, lat, radius) {
    // get closest restrooms
    let endpoint = 'https://6jii3wt2n6.execute-api.us-east-1.amazonaws.com/test/helloworld-lambda?latitude='+lat+'&longitude='+long+'&radius='+radius;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        this.setState({restrooms: data})
        console.log(this.state.restrooms)
        // TODO peter's pin showing function here
      }).catch((err) => {
        console.log(err);
      });
  }
  
  pressedMarker(index) {
    // console.log(this.state.restrooms[index])
    this.refs.modal.updateText(this.state.restrooms[index].name, this.state.restrooms[index].image)
    this.refs.modal.open()
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        {/* <Button title="starbucks bathroom" onPress={() => this.pressedMarker(0)} style={styles.btn}/>
        <Button title="cvs bathroom" onPress={() => this.pressedMarker(1)} style={styles.btn}/> */}
        <MapView style={styles.mapStyle}  region={this.state.region}
          onRegionChange={this.onRegionChange}>
          {this.getMarkers()}
          {this.getUserMarker()}
        </MapView>

        <RestroomModal ref={"modal"}/>

        <TouchableOpacity
          style={styles.appButtonContainer}
          onPress={() => {
            this.findClosestRestrooms(this.state.region['longitude'], this.state.region['latitude'], 1.23)
          }}>
          <Text style={styles.appButtonText}>Find Closest Restrooms</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },

  mapContainer: {
    flex: 1,
  },

  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
  },

  btn: {
    margin: 10,
    backgroundColor: "#3B5998",
    color: "white",
    padding: 10
  },

  text: {
    color: "black",
    fontSize: 22
  },

  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 30,
    left: 0, 
    right: 0,
    marginLeft:70,
    marginRight:70,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});


// const RootStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

export default HomeScreen;