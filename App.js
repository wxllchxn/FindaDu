import React from 'react';
import {
  Button,
  ImageStore,
  ImageEditor,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomDrawer from 'rn-bottom-drawer';
// import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
// import { Linking } from 'react-native';
// import { Card, Icon } from 'react-native-elements';
// const fetch = require('node-fetch');

// let model_output;

class HomeScreen extends React.Component {

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
        <View style={styles.mapContainer}>
          <Image style={styles.image} source={{uri: 'https://source.unsplash.com/random'}} />
        </View>
        <View style={styles.bottom}>
          <Button
            title="Find Closest Restrooms"
            style={styles.bottomButton}
            onPress={() => {
              alert("hi")
            }}
          />
        </View>
        {/* <BottomDrawer
          style={styles.bottom}
          containerHeight={420}
          offset={10}
          downDisplay={340}
          roundedEdges={true}
          panResponder={false} // add panResponder to false
          responder={(panHandlers) => {
            return (
                <ScrollView horizontal={true}>
                  <TouchableOpacity>
                    <View style={styles.date} {...panHandlers}><Text>BottomDrawer</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                    <View style={styles.date}><Text>Today</Text></View>
                  </TouchableOpacity>
                </ScrollView>
            )
          }}
        /> */}
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
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  image: {
    flex: 1,
  },
  mapContainer: {
    flex: 12,
    alignItems: 'stretch',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  bottomButton: {
    position: 'absolute',
    bottom:0,
  },
  bottomDrawer: {
  }
});