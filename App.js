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
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
const fetch = require('node-fetch');
// let model_output;

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
    console.log('component did mount');
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
      console.log("haha");
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
      />);
    }
    return marker_list;
  }
                       
  onRegionChange(region) {
    console.log('region change');
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
        this.setState({restrooms: data})
         console.log(this.state.restrooms)
         // peter's pin showing function here EDIT: setState should cause it to rerender anyway
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
          {/* <Button title="Position bottom + ScrollView" onPress={() => this.refs.modal6.open()} style={styles.btn}/> */}
          <MapView style={styles.mapStyle}  region={this.state.region}
            onRegionChange={this.onRegionChange}>
            {this.getMarkers()}
            {this.getUserMarker()}
          </MapView>
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
               this.findClosestRestrooms(this.state.region['longitude'], this.state.region['latitude'], 1.23)
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

  mapContainer: {
    flex: 11,
  },

  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },

  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
});


// const RootStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

export default HomeScreen;