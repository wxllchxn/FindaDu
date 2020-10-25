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

  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.mapContainer}>
  //         <Image style={styles.image} source={{uri: 'https://source.unsplash.com/random'}} />
  //       </View>
  //       <View style={styles.bottom}>
  //         <Button
  //           title="Find Closest Restrooms"
  //           style={styles.bottomButton}
  //           onPress={() => {
  //             this.findClosestRestrooms(2, 0, 1.23)
  //           }}
  //         />
  //       </View>
  //     </View>
  //   );
  // }

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