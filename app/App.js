import React from 'react';
import {Button, ImageStore, ImageEditor, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking } from 'react-native';
import { Card, Icon } from 'react-native-elements'
const fetch = require('node-fetch');

const url = 'https://us-central1-kaggle-160323.cloudfunctions.net/fruits-and-veggies-1';

let model_output;

class HomeScreen extends React.Component  {
    state = {
        text: "",
        imgUrl: "assets/icon.png",
        sample: [{
            "title":"",
            "nutrition":{
               "carbs":"",
               "calories":"",
               "protein":"",
               "fat":""
            },
            "imageURL":"",
            "sourceURL":"",
        }]
    };

    async findClosestRestrooms() {
        // get closest restrooms
        fetch(str1).then(response => response.json())
        .then(data => {
            res = data;
        }).then(()=>{
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                
                <View style={styles.bottomBox}>
                    {/* <Text>{currentString}</Text> */}
                    <Image source={{uri: this.state.imgUrl}} style={{width: 300, height: 250}}/>
                    <Button title="Find Closest Restrooms" style={{flex: 1}} onPress={() => {
                        
                        // do stuff here

                    }}/>
                </View>
            </View>
        );
    }
}

// repurpose for pull up
class DetailsScreen extends React.Component {
    state = {
        text: [],
    };

    process() {
        // implemented with Text and Button as children

        return this.props.navigation.getParam('input', 'default value').map(function(item, i){
            // console.log(item)
            return(<Card
                image={{uri: item.imageURL}}>
                <Text style={{fontSize: 25, marginBottom: 10}}>
                    {item.title}
                </Text>
                <Text style={{fontSize: 15, marginBottom: 10}}>
                    Nutritional Value
                </Text>
                <Text style={{marginBottom: 10}}>
                    Carbs: {item.nutrition.carbs}
                </Text>
                <Text style={{marginBottom: 10}}>
                    Calories: {item.nutrition.calories}
                </Text>
                <Text style={{marginBottom: 10}}>
                    Protein: {item.nutrition.protein}
                </Text>
                <Text style={{marginBottom: 10}}>
                    Fat: {item.nutrition.fat}
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    onPress={ ()=> Linking.openURL(item.sourceURL) }
                    title='VIEW RECIPE' />
            </Card>);
        });
    }

    render() {  
      return (  
        <ScrollView style={{ flex: 1, marginBottom: 50, marginTop: 20, marginLeft: 0, marginRight: 0, width: 415}}>
            <Text style={{ flex: 1, fontSize: 30, marginBottom: 10, marginLeft: 20}} >Suggested Recipes</Text>
            {this.process()}
            <Button
                title="Find Closest Restrooms"
                onPress={() => this.props.navigation.navigate('Home')}
            />
        </ScrollView>
        );
    }
}
  
const RootStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
});
  
export default createAppContainer(RootStack);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    cameraView: {
        flex: 2,
    },

    bottomBox: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },

});