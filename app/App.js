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
import * as Permissions from 'expo-permissions';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import BottomDrawer from './BottomDrawer';
// const fetch = require('node-fetch');

let model_output;

class HomeScreen extends React.Component {
  state = {
    text: '',
    imgUrl: 'assets/icon.png',
    sample: [
      {
        title: '',
        nutrition: {
          carbs: '',
          calories: '',
          protein: '',
          fat: '',
        },
        imageURL: '',
        sourceURL: '',
      },
    ],
  };

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
        <View style={styles.bottomBox}>
          {/* <Text>{currentString}</Text> */}
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

  bottomBox: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
