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
import Polyline from '@mapbox/polyline';
import { Marker } from 'react-native-maps';
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
      coords: [],
      x: 'false',
      concat: "",
      cordLatitude: 42.279594,
      cordLongitude: 83.732124,
      bottomText: 'Find Closest Restrooms',
      index: 0,
      modalName: '',
      modalName: '',
      modalAmenities: '',
      modalReviews: [],
      modalRating: '',
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

  mergeLot(restLat,restLon){
    let dest = restLat +","+restLon;
      
    if (this.state.region.latitude != null && this.state.region.longitude!=null)
     {
        let concatLot = this.state.region.latitude +","+this.state.region.longitude
        this.setState({
          concat: concatLot
        }, () => {
          this.getDirections(concatLot, dest);
        });
     }
   }

  async getDirections(startLoc, destinationLoc) {
      // console.log(startLoc);
      // console.log(destinationLoc);
      try {
          let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyDchT5k7ZvFKsL0-RgQYccKIOHya8XFyKY`)
          let respJson = await resp.json();
          let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
          let coords = points.map((point, index) => {
              return  {
                  latitude : point[0],
                  longitude : point[1]
              }
          })
          this.setState({coords: coords})
          this.setState({x: "true"})
          // console.log(coords)
          return coords
      } catch(error) {
          // console.log(error)
          this.setState({x: "error"})
          return error
      }
  }

  async findClosestRestrooms(long, lat, radius) {
    // get closest restrooms
    let endpoint = 'https://6jii3wt2n6.execute-api.us-east-1.amazonaws.com/test/helloworld-lambda?latitude='+lat+'&longitude='+long+'&radius='+radius;
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        this.setState({
          restrooms: data,
          bottomText: 'Find Closest Restrooms',
        })
      }).catch((err) => {
        console.log(err);
      });
  }
  
  amenities(amenity_dict) {
    res = ""
    
    if(amenity_dict["paper"])
      res += '🧻'

    if(amenity_dict["sanitizer"])
      res += '🧴'
    
    if(amenity_dict["soap"])
      res += '🧼'

    return res
  }

  review() {
    reviews = [];
    for(let i = 0; i < this.state.modalReviews.length; i++){
      review = this.state.modalReviews[i]
      reviews.push(
        <View key={i} style={{flexDirection:"column"}}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>{review.name}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>{review.timestamp}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>{review.rating}</Text>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>{review.review}</Text>
        </View>
      )
    }

    return reviews
  }

  pressedMarker(index) {
    this.setState({
      index: index,
      modalName: this.state.restrooms[index].name, 
      modalImage: this.state.restrooms[index].image,
      modalAmenities: this.amenities(this.state.restrooms[index].amenities),
      modalReviews: this.state.restrooms[index].reviews,
      modalRating: this.state.restrooms[index].avg_rating+'/5',
    });
    this.refs.modal.open()
  }

  bottomButtonStyle = function(options) {
    if(this.state.bottomText == "Find Closest Restrooms"){
      return {
        elevation: 8,
        backgroundColor: "#147EFB",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        position: 'absolute',
        bottom: 30,
        left: 0, 
        right: 0,
        marginLeft:30,
        marginRight:30,
      }
    } else {
      return {
        elevation: 8,
        backgroundColor: "#999999",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        position: 'absolute',
        bottom: 30,
        left: 0, 
        right: 0,
        marginLeft:30,
        marginRight:30,
      }
    }
  }

  render() {
    return (
      <View style={styles.mapContainer}>
        <MapView style={styles.mapStyle}  region={this.state.region}
          onRegionChange={this.onRegionChange}>
          {this.getMarkers()}
          {this.getUserMarker()}
          
       {this.state.x == 'true' && <MapView.Polyline
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>
        }
        {this.state.x == 'error' && <MapView.Polyline
          coordinates={[
              {latitude: this.state.region.latitude, longitude: this.state.region.longitude},
              {latitude: this.state.cordLatitude, longitude: this.state.cordLongitude},
          ]}
          strokeWidth={2}
          strokeColor="red"/>
         }
        </MapView>

        <Modal style={styles.modal} position={"bottom"} ref={"modal"} swipeArea={20}>
          <ScrollView style={styles.scroll}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.title}>{this.state.modalName}</Text>
            <View style={{flexDirection:"row"}}>
              <Image style={styles.image} source={{uri: this.state.modalImage}} />
              <View style={styles.right}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Rating: {this.state.modalRating}</Text>
                <Text adjustsFontSizeToFit numberOfLines={1} style={styles.text}>Amenities: {this.state.modalAmenities}</Text>
              </View>
            </View>
            <View style={{flexDirection:"column"}}>
              {this.review()}
            </View>
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => {
                this.refs.modal.close();
                this.mergeLot(this.state.restrooms[this.state.index].latitude,this.state.restrooms[this.state.index].longitude);
              }}>
              <Text style={styles.appButtonText}>Navigate to this restroom</Text>
            </TouchableOpacity>
          </ScrollView>
        </Modal>

        <TouchableOpacity
          style={this.bottomButtonStyle()}
          onPress={() => {
            this.setState({
              bottomText: 'Loading...'
            }, () => {
              this.findClosestRestrooms(this.state.region['longitude'], this.state.region['latitude'], 1.23)
            });
          }}>
          <Text style={styles.appButtonText}>{this.state.bottomText}</Text>
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

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  },

  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
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
    marginBottom:20,
  },

  appButtonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
  }
});


// const RootStack = createStackNavigator({
//   Home: HomeScreen,
//   Details: DetailsScreen,
// });

export default HomeScreen;