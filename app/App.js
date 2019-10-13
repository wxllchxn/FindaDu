import React from 'react';
import {Button, ImageStore, Image, StyleSheet, Text, TouchableOpacity, View, TouchableHighlight} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { ScrollView } from 'react-native-gesture-handler';
import { Linking} from 'react-native';

const url = 'https://us-central1-kaggle-160323.cloudfunctions.net/asl-translate-3';
const twilioURL = 'https://us-central1-kaggle-160323.cloudfunctions.net/function-1';

let currentString = 0;

let sample = [
    {
        "sourceName": "Jamie Oliver", 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/48191-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": "Jamie Oliver", 
        "id": 48191, 
        "veryPopular": true, 
        "lowFodmap": false, 
        "title": "Apple Crumble Recipe", 
        "diets": [
            "dairy free"
        ], 
        "pricePerServing": 36.41, 
        "extendedIngredients": [
            {
                "originalString": "400 g cooking apples peeled cored and quartered", 
                "aisle": "Produce", 
                "name": "apples", 
                "metaInformation": [
                    "cored", 
                    "peeled", 
                    "quartered"
                ], 
                "image": "apple.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 400.0
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 14.11
                    }
                }, 
                "id": 9003, 
                "amount": 400.0, 
                "consitency": "solid", 
                "meta": [
                    "cored", 
                    "peeled", 
                    "quartered"
                ], 
                "originalName": "cooking apples peeled cored and quartered", 
                "original": "400 g cooking apples peeled cored and quartered", 
                "unit": "g"
            }, 
            {
                "originalString": "35 g margarine or butter", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "margarine", 
                "metaInformation": [], 
                "image": "butter-sliced.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 35.0
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 1.235
                    }
                }, 
                "id": 4073, 
                "amount": 35.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "margarine or butter", 
                "original": "35 g margarine or butter", 
                "unit": "g"
            }, 
            {
                "originalString": "35 g rolled oats", 
                "aisle": "Cereal", 
                "name": "rolled oats", 
                "metaInformation": [], 
                "image": "rolled-oats.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 35.0
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 1.235
                    }
                }, 
                "id": 8120, 
                "amount": 35.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "rolled oats", 
                "original": "35 g rolled oats", 
                "unit": "g"
            }, 
            {
                "originalString": "20 g caster sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 20.0
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 0.705
                    }
                }, 
                "id": 19335, 
                "amount": 20.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "caster sugar", 
                "original": "20 g caster sugar", 
                "unit": "g"
            }, 
            {
                "originalString": "50 g sugar to sweeten", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 50.0
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 1.764
                    }
                }, 
                "id": 19335, 
                "amount": 50.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar to sweeten", 
                "original": "50 g sugar to sweeten", 
                "unit": "g"
            }, 
            {
                "originalString": "1 Tbsp water", 
                "aisle": "Beverages", 
                "name": "water", 
                "metaInformation": [], 
                "image": "water.png", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }
                }, 
                "id": 14412, 
                "amount": 1.0, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "water", 
                "original": "1 Tbsp water", 
                "unit": "Tbsp"
            }, 
            {
                "originalString": "35 g wholemeal flour", 
                "aisle": "Baking", 
                "name": "wholemeal flour", 
                "metaInformation": [], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 35.0
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 1.235
                    }
                }, 
                "id": 20080, 
                "amount": 35.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "wholemeal flour", 
                "original": "35 g wholemeal flour", 
                "unit": "g"
            }
        ], 
        "healthScore": 4.0, 
        "imageType": "jpg", 
        "spoonacularScore": 46.0, 
        "sourceUrl": "http://www.jamieoliver.com/recipes/fruit-recipes/apple-crumble", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 6, 
        "analyzedInstructions": [], 
        "winePairing": {}, 
        "aggregateLikes": 965, 
        "instructions": null, 
        "spoonacularSourceUrl": "https://spoonacular.com/apple-crumble-recipe-48191", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": false, 
        "ketogenic": false, 
        "readyInMinutes": 45, 
        "servings": 5, 
        "sustainable": false, 
        "dairyFree": true, 
        "whole30": false
    }, 
    {
        "sourceName": null, 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/73474-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": null, 
        "id": 73474, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Apple Turnovers", 
        "diets": [
            "lacto ovo vegetarian"
        ], 
        "pricePerServing": 62.36, 
        "extendedIngredients": [
            {
                "originalString": "4 large apples (about 2 lb. total), peeled, halved, and cored; each half quartered lengthwise", 
                "aisle": "Produce", 
                "name": "apples", 
                "metaInformation": [
                    "cored", 
                    "peeled", 
                    "halved", 
                    "quartered", 
                    "( 2 lb. total)"
                ], 
                "image": "apple.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "larges", 
                        "unitShort": "large", 
                        "amount": 4.0
                    }, 
                    "us": {
                        "unitLong": "larges", 
                        "unitShort": "large", 
                        "amount": 4.0
                    }
                }, 
                "id": 9003, 
                "amount": 4.0, 
                "consitency": "solid", 
                "meta": [
                    "cored", 
                    "peeled", 
                    "halved", 
                    "quartered", 
                    "( 2 lb. total)"
                ], 
                "originalName": "apples (about 2 lb. total), peeled, halved, and cored; each half quartered lengthwise", 
                "original": "4 large apples (about 2 lb. total), peeled, halved, and cored; each half quartered lengthwise", 
                "unit": "large"
            }, 
            {
                "originalString": "10 oz. (2-1/4 cups) all-purpose flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [
                    "all-purpose"
                ], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 473.176
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 2.0
                    }
                }, 
                "id": 20081, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [
                    "all-purpose"
                ], 
                "originalName": "10 oz. all-purpose flour", 
                "original": "10 oz. (2-1/4 cups) all-purpose flour", 
                "unit": "cups"
            }, 
            {
                "originalString": "Granulated sugar, for sprinkling", 
                "aisle": "Baking", 
                "name": "granulated sugar", 
                "metaInformation": [
                    "for sprinkling"
                ], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 8.0
                    }, 
                    "us": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 8.0
                    }
                }, 
                "id": 19335, 
                "amount": 8.0, 
                "consitency": "solid", 
                "meta": [
                    "for sprinkling"
                ], 
                "originalName": "Granulated sugar, for sprinkling", 
                "original": "Granulated sugar, for sprinkling", 
                "unit": "servings"
            }, 
            {
                "originalString": "About 1 tsp. ground cinnamon", 
                "aisle": "Spices and Seasonings", 
                "name": "ground cinnamon", 
                "metaInformation": [], 
                "image": "cinnamon.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "teaspoon", 
                        "unitShort": "tsp", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "teaspoon", 
                        "unitShort": "tsp", 
                        "amount": 1.0
                    }
                }, 
                "id": 1012010, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "About ground cinnamon", 
                "original": "About 1 tsp. ground cinnamon", 
                "unit": "tsp"
            }, 
            {
                "originalString": "1/2 cup ice water", 
                "aisle": "Beverages", 
                "name": "ice water", 
                "metaInformation": [], 
                "image": "water.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 118.294
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.5
                    }
                }, 
                "id": 14412, 
                "amount": 0.5, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "ice water", 
                "original": "1/2 cup ice water", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/2 tsp. table salt", 
                "aisle": "Spices and Seasonings", 
                "name": "table salt", 
                "metaInformation": [], 
                "image": "salt.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.5
                    }, 
                    "us": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.5
                    }
                }, 
                "id": 2047, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "table salt", 
                "original": "1/2 tsp. table salt", 
                "unit": "tsp"
            }, 
            {
                "originalString": "6 oz. (12 Tbs.) unsalted butter, cut into small pieces and chilled", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "unsalted butter", 
                "metaInformation": [
                    "unsalted", 
                    "chilled", 
                    "cut into small pieces and "
                ], 
                "image": "butter-sliced.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbs", 
                        "unitShort": "Tbs", 
                        "amount": 12.0
                    }, 
                    "us": {
                        "unitLong": "Tbs", 
                        "unitShort": "Tbs", 
                        "amount": 12.0
                    }
                }, 
                "id": 1145, 
                "amount": 12.0, 
                "consitency": "solid", 
                "meta": [
                    "unsalted", 
                    "chilled", 
                    "cut into small pieces and "
                ], 
                "originalName": "oz. unsalted butter, cut into small pieces and chilled", 
                "original": "6 oz. (12 Tbs.) unsalted butter, cut into small pieces and chilled", 
                "unit": "Tbs"
            }
        ], 
        "healthScore": 2.0, 
        "imageType": "jpg", 
        "spoonacularScore": 25.0, 
        "sourceUrl": "http://www.finecooking.com/recipes/apple-turnovers.aspx", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 13, 
        "analyzedInstructions": [], 
        "winePairing": {}, 
        "aggregateLikes": 48, 
        "instructions": null, 
        "spoonacularSourceUrl": "https://spoonacular.com/apple-turnovers-73474", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 45, 
        "servings": 8, 
        "sustainable": false, 
        "dairyFree": false, 
        "whole30": false
    }, 
    {
        "sourceName": null, 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/47950-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": null, 
        "cookingMinutes": 20, 
        "id": 47950, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Cinnamon Apple Crisp", 
        "diets": [
            "lacto ovo vegetarian"
        ], 
        "preparationMinutes": 25, 
        "pricePerServing": 83.17, 
        "extendedIngredients": [
            {
                "originalString": "6 medium (6 cups) apples, peeled, cored, sliced", 
                "aisle": "Produce", 
                "name": "apples", 
                "metaInformation": [
                    "cored", 
                    "peeled", 
                    "sliced"
                ], 
                "image": "apple.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "liters", 
                        "unitShort": "l", 
                        "amount": 1.42
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 6.0
                    }
                }, 
                "id": 9003, 
                "amount": 6.0, 
                "consitency": "solid", 
                "meta": [
                    "cored", 
                    "peeled", 
                    "sliced"
                ], 
                "originalName": "medium apples, peeled, cored, sliced", 
                "original": "6 medium (6 cups) apples, peeled, cored, sliced", 
                "unit": "cups"
            }, 
            {
                "originalString": "3/4 cup firmly packed brown sugar", 
                "aisle": "Baking", 
                "name": "brown sugar", 
                "metaInformation": [
                    "packed"
                ], 
                "image": "light-brown-sugar.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 177.441
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.75
                    }
                }, 
                "id": 19334, 
                "amount": 0.75, 
                "consitency": "solid", 
                "meta": [
                    "packed"
                ], 
                "originalName": "firmly packed brown sugar", 
                "original": "3/4 cup firmly packed brown sugar", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/2 cup Land O Lakes® Cinnamon Sugar Butter Spread", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "cinnamon sugar butter", 
                "metaInformation": [
                    "lakes®"
                ], 
                "image": "cinnamon-sugar-butter.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 118.294
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.5
                    }
                }, 
                "id": 93674, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [
                    "lakes®"
                ], 
                "originalName": "Land O Lakes® Cinnamon Sugar Butter Spread", 
                "original": "1/2 cup Land O Lakes® Cinnamon Sugar Butter Spread", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/2 cup all-purpose flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [
                    "all-purpose"
                ], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 118.294
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.5
                    }
                }, 
                "id": 20081, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [
                    "all-purpose"
                ], 
                "originalName": "all-purpose flour", 
                "original": "1/2 cup all-purpose flour", 
                "unit": "cup"
            }, 
            {
                "originalString": "3/4 cup uncooked old-fashioned oats", 
                "aisle": "Cereal", 
                "name": "old-fashioned oats", 
                "metaInformation": [
                    "uncooked"
                ], 
                "image": "rolled-oats.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 177.441
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.75
                    }
                }, 
                "id": 8120, 
                "amount": 0.75, 
                "consitency": "solid", 
                "meta": [
                    "uncooked"
                ], 
                "originalName": "uncooked old-fashioned oats", 
                "original": "3/4 cup uncooked old-fashioned oats", 
                "unit": "cup"
            }
        ], 
        "healthScore": 3.0, 
        "imageType": "jpg", 
        "spoonacularScore": 31.0, 
        "sourceUrl": "http://www.landolakes.com/recipe/3168/cinnamon-apple-crisp", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 13, 
        "analyzedInstructions": [], 
        "winePairing": {}, 
        "aggregateLikes": 35, 
        "instructions": null, 
        "spoonacularSourceUrl": "https://spoonacular.com/cinnamon-apple-crisp-47950", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 45, 
        "servings": 6, 
        "sustainable": false, 
        "dairyFree": false, 
        "whole30": false
    }, 
    {
        "sourceName": "Sarahs Cucina Bella", 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/534573-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": "Sarahs Cucina Bella", 
        "id": 534573, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Brown Butter Apple Crumble", 
        "diets": [
            "lacto ovo vegetarian"
        ], 
        "pricePerServing": 84.01, 
        "extendedIngredients": [
            {
                "originalString": "4 apples, peeled, cored and sliced", 
                "aisle": "Produce", 
                "name": "apples", 
                "metaInformation": [
                    "cored", 
                    "peeled", 
                    "sliced"
                ], 
                "image": "apple.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 4.0
                    }, 
                    "us": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 4.0
                    }
                }, 
                "id": 9003, 
                "amount": 4.0, 
                "consitency": "solid", 
                "meta": [
                    "cored", 
                    "peeled", 
                    "sliced"
                ], 
                "originalName": "apples, peeled, cored and sliced", 
                "original": "4 apples, peeled, cored and sliced", 
                "unit": ""
            }, 
            {
                "originalString": "1/2 tsp cinnamon", 
                "aisle": "Spices and Seasonings", 
                "name": "cinnamon", 
                "metaInformation": [], 
                "image": "cinnamon.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.5
                    }, 
                    "us": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.5
                    }
                }, 
                "id": 2010, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "cinnamon", 
                "original": "1/2 tsp cinnamon", 
                "unit": "tsp"
            }, 
            {
                "originalString": "1/4 cup all-purpose flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [
                    "all-purpose"
                ], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 59.147
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.25
                    }
                }, 
                "id": 20081, 
                "amount": 0.25, 
                "consitency": "solid", 
                "meta": [
                    "all-purpose"
                ], 
                "originalName": "all-purpose flour", 
                "original": "1/4 cup all-purpose flour", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/4 cup light brown sugar", 
                "aisle": "Baking", 
                "name": "light brown sugar", 
                "metaInformation": [
                    "light"
                ], 
                "image": "light-brown-sugar.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 59.147
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.25
                    }
                }, 
                "id": 19334, 
                "amount": 0.25, 
                "consitency": "solid", 
                "meta": [
                    "light"
                ], 
                "originalName": "light brown sugar", 
                "original": "1/4 cup light brown sugar", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/2 cup uncooked oats (not instant)", 
                "aisle": "Cereal", 
                "name": "oats", 
                "metaInformation": [
                    "uncooked", 
                    "(not instant)"
                ], 
                "image": "rolled-oats.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 118.294
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.5
                    }
                }, 
                "id": 8120, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [
                    "uncooked", 
                    "(not instant)"
                ], 
                "originalName": "uncooked oats (not instant)", 
                "original": "1/2 cup uncooked oats (not instant)", 
                "unit": "cup"
            }, 
            {
                "originalString": "pinch salt", 
                "aisle": "Spices and Seasonings", 
                "name": "salt", 
                "metaInformation": [], 
                "image": "salt.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "pinch", 
                        "unitShort": "pinch", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "pinch", 
                        "unitShort": "pinch", 
                        "amount": 1.0
                    }
                }, 
                "id": 2047, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "pinch salt", 
                "original": "pinch salt", 
                "unit": "pinch"
            }, 
            {
                "originalString": "1/4 cup salted butter", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "salted butter", 
                "metaInformation": [
                    "salted"
                ], 
                "image": "butter.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 59.147
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.25
                    }
                }, 
                "id": 1001001, 
                "amount": 0.25, 
                "consitency": "solid", 
                "meta": [
                    "salted"
                ], 
                "originalName": "salted butter", 
                "original": "1/4 cup salted butter", 
                "unit": "cup"
            }, 
            {
                "originalString": "2 tbsp sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }
                }, 
                "id": 19335, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar", 
                "original": "2 tbsp sugar", 
                "unit": "tbsp"
            }
        ], 
        "healthScore": 2.0, 
        "imageType": "jpg", 
        "spoonacularScore": 20.0, 
        "sourceUrl": "http://sarahscucinabella.com/2010/10/06/brown-butter-apple-crumble/", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 11, 
        "analyzedInstructions": [
            {
                "steps": [
                    {
                        "equipment": [
                            {
                                "image": "bowl.jpg", 
                                "id": 404783, 
                                "name": "bowl"
                            }, 
                            {
                                "image": "oven.jpg", 
                                "id": 404784, 
                                "name": "oven"
                            }
                        ], 
                        "step": "Preheat oven to 350 degrees.In a medium bowl, combine the apples, sugar, cinnamon, cloves and salt. Toss until well-combined.", 
                        "number": 1, 
                        "ingredients": [
                            {
                                "image": "cinnamon.jpg", 
                                "id": 2010, 
                                "name": "cinnamon"
                            }, 
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }, 
                            {
                                "image": "sugar-in-bowl.png", 
                                "id": 19335, 
                                "name": "sugar"
                            }, 
                            {
                                "image": "salt.jpg", 
                                "id": 2047, 
                                "name": "salt"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "roasting-pan.jpg", 
                                "id": 404646, 
                                "name": "baking pan"
                            }
                        ], 
                        "step": "Add the apples to a deep oval baking dish.", 
                        "number": 2, 
                        "ingredients": [
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "bowl.jpg", 
                                "id": 404783, 
                                "name": "bowl"
                            }
                        ], 
                        "step": "Spread out into an even layer.In a small bowl, stir together the oats, flour and brown sugar. Set aside.", 
                        "number": 3, 
                        "ingredients": [
                            {
                                "image": "dark-brown-sugar.png", 
                                "id": 19334, 
                                "name": "brown sugar"
                            }, 
                            {
                                "image": "flour.png", 
                                "id": 20081, 
                                "name": "all purpose flour"
                            }, 
                            {
                                "image": "rolled-oats.jpg", 
                                "id": 8120, 
                                "name": "oats"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "pan.png", 
                                "id": 404645, 
                                "name": "frying pan"
                            }
                        ], 
                        "step": "Heat the butter in a small pan until melted. Continue swirling over a medium flame until the butter turns a golden brown color.", 
                        "number": 4, 
                        "ingredients": [
                            {
                                "image": "butter-sliced.jpg", 
                                "id": 1001, 
                                "name": "butter"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "roasting-pan.jpg", 
                                "id": 404646, 
                                "name": "baking pan"
                            }, 
                            {
                                "image": "oven.jpg", 
                                "id": 404784, 
                                "name": "oven"
                            }
                        ], 
                        "step": "Remove from heat and stir into the oats mixture until well combined.Sprinkle the oats mixture over the apples.Slide the baking dish into the oven and cook for 45 minutes, until golden on top and bubbling at the sides.", 
                        "length": {
                            "number": 45, 
                            "unit": "minutes"
                        }, 
                        "number": 5, 
                        "ingredients": [
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }, 
                            {
                                "image": "rolled-oats.jpg", 
                                "id": 8120, 
                                "name": "oats"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "oven.jpg", 
                                "id": 404784, 
                                "name": "oven"
                            }
                        ], 
                        "step": "Remove from the oven and let cool slightly before serving.", 
                        "number": 6, 
                        "ingredients": []
                    }
                ], 
                "name": ""
            }
        ], 
        "winePairing": {}, 
        "aggregateLikes": 7, 
        "instructions": "Preheat oven to 350 degrees.In a medium bowl, combine the apples, sugar, cinnamon, cloves and salt. Toss until well-combined.Add the apples to a deep oval baking dish. Spread out into an even layer.In a small bowl, stir together the oats, flour and brown sugar. Set aside.Heat the butter in a small pan until melted. Continue swirling over a medium flame until the butter turns a golden brown color. Remove from heat and stir into the oats mixture until well combined.Sprinkle the oats mixture over the apples.Slide the baking dish into the oven and cook for 45 minutes, until golden on top and bubbling at the sides. Remove from the oven and let cool slightly before serving.", 
        "spoonacularSourceUrl": "https://spoonacular.com/brown-butter-apple-crumble-534573", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 45, 
        "servings": 4, 
        "sustainable": false, 
        "dairyFree": false, 
        "whole30": false
    }, 
    {
        "sourceName": null, 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/70306-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": null, 
        "id": 70306, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Easy Cinnamon Apple Pie", 
        "diets": [
            "dairy free", 
            "lacto ovo vegetarian", 
            "vegan"
        ], 
        "pricePerServing": 217.54, 
        "extendedIngredients": [
            {
                "originalString": "2 cans (20-oz. each) sliced apples (not pie filling), drained *", 
                "aisle": "Produce", 
                "name": "apples", 
                "metaInformation": [
                    "drained", 
                    "sliced", 
                    "canned", 
                    "(not pie filling)"
                ], 
                "image": "apple.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "kilograms", 
                        "unitShort": "kilogram", 
                        "amount": 1.134
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 40.0
                    }
                }, 
                "id": 9003, 
                "amount": 40.0, 
                "consitency": "solid", 
                "meta": [
                    "drained", 
                    "sliced", 
                    "canned", 
                    "(not pie filling)"
                ], 
                "originalName": "cans each) sliced apples (not pie filling), drained *", 
                "original": "2 cans (20-oz. each) sliced apples (not pie filling), drained *", 
                "unit": "oz"
            }, 
            {
                "originalString": "1-2/3 cups (10-oz. pkg.) HERSHEY'S Cinnamon Chips, divided", 
                "aisle": "Spices and Seasonings", 
                "name": "cinnamon", 
                "metaInformation": [
                    "divided", 
                    "(10-oz. pkg.)"
                ], 
                "image": "cinnamon.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 236.588
                    }, 
                    "us": {
                        "unitLong": "cup", 
                        "unitShort": "cup", 
                        "amount": 1.0
                    }
                }, 
                "id": 2010, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [
                    "divided", 
                    "(10-oz. pkg.)"
                ], 
                "originalName": "(10-oz. pkg.) HERSHEY'S Cinnamon Chips, divided", 
                "original": "1-2/3 cups (10-oz. pkg.) HERSHEY'S Cinnamon Chips, divided", 
                "unit": "cups"
            }, 
            {
                "originalString": "1/4 cup flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 59.147
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.25
                    }
                }, 
                "id": 20081, 
                "amount": 0.25, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "flour", 
                "original": "1/4 cup flour", 
                "unit": "cup"
            }, 
            {
                "originalString": "1 package (15 oz.) refrigerated pie crusts, or pastry for double-crust 9-inch pie", 
                "aisle": "Refrigerated", 
                "name": "refrigerated pie crusts", 
                "metaInformation": [
                    "refrigerated", 
                    "for double-crust pie"
                ], 
                "image": "pie-crust.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 425.243
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 15.0
                    }
                }, 
                "id": 18334, 
                "amount": 15.0, 
                "consitency": "solid", 
                "meta": [
                    "refrigerated", 
                    "for double-crust pie"
                ], 
                "originalName": "package refrigerated pie crusts, or pastry for double-crust 9-inch pie", 
                "original": "1 package (15 oz.) refrigerated pie crusts, or pastry for double-crust 9-inch pie", 
                "unit": "oz"
            }, 
            {
                "originalString": "3/4 cup sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 177.441
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.75
                    }
                }, 
                "id": 19335, 
                "amount": 0.75, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar", 
                "original": "3/4 cup sugar", 
                "unit": "cup"
            }
        ], 
        "healthScore": 7.0, 
        "imageType": "jpg", 
        "spoonacularScore": 42.0, 
        "sourceUrl": "http://www.hersheys.com/recipes/6401/Easy-Cinnamon-Apple-Pie.aspx", 
        "glutenFree": false, 
        "vegan": true, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 26, 
        "analyzedInstructions": [], 
        "winePairing": {
            "pairingText": "", 
            "pairedWines": [], 
            "productMatches": []
        }, 
        "aggregateLikes": 5, 
        "instructions": null, 
        "spoonacularSourceUrl": "https://spoonacular.com/easy-cinnamon-apple-pie-70306", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 55, 
        "servings": 4, 
        "sustainable": false, 
        "dairyFree": true, 
        "whole30": false
    }, 
    {
        "sourceName": "The Amateur Gourmet", 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/48416-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": "The Amateur Gourmet", 
        "id": 48416, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "French Apple Tart", 
        "diets": [
            "lacto ovo vegetarian"
        ], 
        "pricePerServing": 71.43, 
        "extendedIngredients": [
            {
                "originalString": "apples, cut into 1/4 inch slices", 
                "aisle": "Produce", 
                "name": "apples", 
                "metaInformation": [
                    "cut into 1/4 inch slices"
                ], 
                "image": "apple.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 4.0
                    }, 
                    "us": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 4.0
                    }
                }, 
                "id": 9003, 
                "amount": 4.0, 
                "consitency": "solid", 
                "meta": [
                    "cut into 1/4 inch slices"
                ], 
                "originalName": "apples, cut into 1/4 inch slices", 
                "original": "apples, cut into 1/4 inch slices", 
                "unit": "servings"
            }, 
            {
                "originalString": "2 tbsp butter, cut into bits", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "butter", 
                "metaInformation": [
                    "cut into bits"
                ], 
                "image": "butter-sliced.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }
                }, 
                "id": 1001, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [
                    "cut into bits"
                ], 
                "originalName": "butter, cut into bits", 
                "original": "2 tbsp butter, cut into bits", 
                "unit": "tbsp"
            }, 
            {
                "originalString": "2 cup Flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 473.176
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 2.0
                    }
                }, 
                "id": 20081, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "Flour", 
                "original": "2 cup Flour", 
                "unit": "cup"
            }, 
            {
                "originalString": "0 pinch Salt", 
                "aisle": "Spices and Seasonings", 
                "name": "salt", 
                "metaInformation": [], 
                "image": "salt.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "pinchs", 
                        "unitShort": "pinch", 
                        "amount": 0.0
                    }, 
                    "us": {
                        "unitLong": "pinchs", 
                        "unitShort": "pinch", 
                        "amount": 0.0
                    }
                }, 
                "id": 2047, 
                "amount": 0.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "Salt", 
                "original": "0 pinch Salt", 
                "unit": "pinch"
            }, 
            {
                "originalString": "0 pinch Sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "pinchs", 
                        "unitShort": "pinch", 
                        "amount": 0.0
                    }, 
                    "us": {
                        "unitLong": "pinchs", 
                        "unitShort": "pinch", 
                        "amount": 0.0
                    }
                }, 
                "id": 19335, 
                "amount": 0.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "Sugar", 
                "original": "0 pinch Sugar", 
                "unit": "pinch"
            }, 
            {
                "originalString": "1 1/2 stick unsalted butter, cut into tiny cubes", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "unsalted butter", 
                "metaInformation": [
                    "unsalted", 
                    "cut into tiny cubes"
                ], 
                "image": "butter-sliced.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "sticks", 
                        "unitShort": "stick", 
                        "amount": 1.5
                    }, 
                    "us": {
                        "unitLong": "sticks", 
                        "unitShort": "stick", 
                        "amount": 1.5
                    }
                }, 
                "id": 1145, 
                "amount": 1.5, 
                "consitency": "solid", 
                "meta": [
                    "unsalted", 
                    "cut into tiny cubes"
                ], 
                "originalName": "unsalted butter, cut into tiny cubes", 
                "original": "1 1/2 stick unsalted butter, cut into tiny cubes", 
                "unit": "stick"
            }, 
            {
                "originalString": "1/3 cup ice cold water", 
                "aisle": "Beverages", 
                "name": "water", 
                "metaInformation": [
                    "ice cold"
                ], 
                "image": "water.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 78.863
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.333
                    }
                }, 
                "id": 14412, 
                "amount": 0.3333333333333333, 
                "consitency": "liquid", 
                "meta": [
                    "ice cold"
                ], 
                "originalName": "ice cold water", 
                "original": "1/3 cup ice cold water", 
                "unit": "cup"
            }
        ], 
        "healthScore": 4.0, 
        "imageType": "jpg", 
        "spoonacularScore": 29.0, 
        "sourceUrl": "http://www.amateurgourmet.com/2008/04/tuesday_techni4.html", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 23, 
        "analyzedInstructions": [], 
        "winePairing": {}, 
        "aggregateLikes": 1, 
        "instructions": null, 
        "spoonacularSourceUrl": "https://spoonacular.com/french-apple-tart-48416", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 45, 
        "servings": 4, 
        "sustainable": false, 
        "dairyFree": false, 
        "whole30": false
    }, 
    {
        "sourceName": "Jul's Kitchen", 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/556470-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": "Jul's Kitchen", 
        "cookingMinutes": 0, 
        "id": 556470, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Apple fritters", 
        "diets": [
            "dairy free", 
            "lacto ovo vegetarian"
        ], 
        "preparationMinutes": 5, 
        "pricePerServing": 122.5, 
        "extendedIngredients": [
            {
                "originalString": "2 tablespoons of lager beer", 
                "aisle": "Alcoholic Beverages", 
                "name": "beer", 
                "metaInformation": [], 
                "image": "beer.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }
                }, 
                "id": 14003, 
                "amount": 2.0, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "lager beer", 
                "original": "2 tablespoons of lager beer", 
                "unit": "tablespoons"
            }, 
            {
                "originalString": "1 egg", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "egg", 
                "metaInformation": [], 
                "image": "egg.png", 
                "measures": {
                    "metric": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 1.0
                    }
                }, 
                "id": 1123, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "egg", 
                "original": "1 egg", 
                "unit": ""
            }, 
            {
                "originalString": "1 tablespoon of extra virgin olive oil", 
                "aisle": "Oil, Vinegar, Salad Dressing", 
                "name": "extra virgin olive oil", 
                "metaInformation": [], 
                "image": "olive-oil.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }
                }, 
                "id": 1034053, 
                "amount": 1.0, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "extra virgin olive oil", 
                "original": "1 tablespoon of extra virgin olive oil", 
                "unit": "tablespoon"
            }, 
            {
                "originalString": "2 tablespoons of flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }
                }, 
                "id": 20081, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "flour", 
                "original": "2 tablespoons of flour", 
                "unit": "tablespoons"
            }, 
            {
                "originalString": "peanut oil for frying", 
                "aisle": "Oil, Vinegar, Salad Dressing", 
                "name": "peanut oil", 
                "metaInformation": [
                    "for frying"
                ], 
                "image": "peanut-oil.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 2.0
                    }
                }, 
                "id": 4042, 
                "amount": 2.0, 
                "consitency": "liquid", 
                "meta": [
                    "for frying"
                ], 
                "originalName": "peanut oil for frying", 
                "original": "peanut oil for frying", 
                "unit": "servings"
            }, 
            {
                "originalString": "2 Golden Delicious apples", 
                "aisle": "Produce", 
                "name": "red delicious apples", 
                "metaInformation": [], 
                "image": "red-delicious-apples.png", 
                "measures": {
                    "metric": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 2.0
                    }
                }, 
                "id": 1059003, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "Golden Delicious apples", 
                "original": "2 Golden Delicious apples", 
                "unit": ""
            }, 
            {
                "originalString": "1 pinch of salt", 
                "aisle": "Spices and Seasonings", 
                "name": "salt", 
                "metaInformation": [], 
                "image": "salt.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "pinch", 
                        "unitShort": "pinch", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "pinch", 
                        "unitShort": "pinch", 
                        "amount": 1.0
                    }
                }, 
                "id": 2047, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "salt", 
                "original": "1 pinch of salt", 
                "unit": "pinch"
            }, 
            {
                "originalString": "sugar to decorate", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 2.0
                    }
                }, 
                "id": 19335, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar to decorate", 
                "original": "sugar to decorate", 
                "unit": "servings"
            }
        ], 
        "healthScore": 2.0, 
        "imageType": "jpg", 
        "spoonacularScore": 33.0, 
        "sourceUrl": "http://en.julskitchen.com/other/life/apple-fritters", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 7, 
        "analyzedInstructions": [
            {
                "steps": [
                    {
                        "equipment": [
                            {
                                "image": "bowl.jpg", 
                                "id": 404783, 
                                "name": "bowl"
                            }
                        ], 
                        "step": "Beat the egg in a bowl, add a pinch of salt and the flour and pour in the extra virgin olive oil and the beer: if needed, add a tablespoon of water to make a smooth but not too liquid batter. It is supposed to cover the apples, not to slide off!Peel the apples, core them paying attention not to break them and cut the apples into horizontal slices, 1 cm thick.", 
                        "number": 1, 
                        "ingredients": [
                            {
                                "image": "olive-oil.jpg", 
                                "id": 1034053, 
                                "name": "extra virgin olive oil"
                            }, 
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }, 
                            {
                                "image": "flour.png", 
                                "id": 20081, 
                                "name": "all purpose flour"
                            }, 
                            {
                                "image": "beer.jpg", 
                                "id": 14003, 
                                "name": "beer"
                            }, 
                            {
                                "image": "salt.jpg", 
                                "id": 2047, 
                                "name": "salt"
                            }, 
                            {
                                "image": "egg.png", 
                                "id": 1123, 
                                "name": "egg"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "pan.png", 
                                "id": 404645, 
                                "name": "frying pan"
                            }
                        ], 
                        "step": "Heat the olive oil in a large frying pan. The right moment to fry the apples is when the oil starts to smoke, as grandma says. Dip the apple slices into the batter and deep fry them until cooked through and golden on both sides.", 
                        "number": 2, 
                        "ingredients": [
                            {
                                "image": "olive-oil.jpg", 
                                "id": 4053, 
                                "name": "olive oil"
                            }, 
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "paper-towels.jpg", 
                                "id": 405895, 
                                "name": "paper towels"
                            }
                        ], 
                        "step": "Transfer the apples into a plate lined with a paper towel. Sprinkle the fritters with icing sugar and serve them warm.", 
                        "number": 3, 
                        "ingredients": [
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }
                        ]
                    }
                ], 
                "name": ""
            }
        ], 
        "winePairing": {}, 
        "aggregateLikes": 243, 
        "instructions": "Beat the egg in a bowl, add a pinch of salt and the flour and pour in the extra virgin olive oil and the beer: if needed, add a tablespoon of water to make a smooth but not too liquid batter. It is supposed to cover the apples, not to slide off!Peel the apples, core them paying attention not to break them and cut the apples into horizontal slices, 1 cm thick.Heat the olive oil in a large frying pan. The right moment to fry the apples is when the oil starts to smoke, as grandma says. Dip the apple slices into the batter and deep fry them until cooked through and golden on both sides.Transfer the apples into a plate lined with a paper towel. Sprinkle the fritters with icing sugar and serve them warm.", 
        "spoonacularSourceUrl": "https://spoonacular.com/apple-fritters-556470", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 5, 
        "servings": 2, 
        "sustainable": false, 
        "dairyFree": true, 
        "whole30": false
    }, 
    {
        "sourceName": "Leites Culinaria", 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/597993-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": "Leites Culinaria", 
        "cookingMinutes": 95, 
        "id": 597993, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Rustic Apple Tarts", 
        "diets": [], 
        "preparationMinutes": 40, 
        "pricePerServing": 73.7, 
        "extendedIngredients": [
            {
                "originalString": "2 cups all-purpose flour", 
                "aisle": "Baking", 
                "name": "flour", 
                "metaInformation": [
                    "all-purpose"
                ], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 473.176
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 2.0
                    }
                }, 
                "id": 20081, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [
                    "all-purpose"
                ], 
                "originalName": "all-purpose flour", 
                "original": "2 cups all-purpose flour", 
                "unit": "cups"
            }, 
            {
                "originalString": "1/4 cup ice water", 
                "aisle": "Beverages", 
                "name": "ice water", 
                "metaInformation": [], 
                "image": "water.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 59.147
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.25
                    }
                }, 
                "id": 14412, 
                "amount": 0.25, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "ice water", 
                "original": "1/4 cup ice water", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/2 teaspoon kosher salt", 
                "aisle": "Spices and Seasonings", 
                "name": "kosher salt", 
                "metaInformation": [], 
                "image": "salt.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.5
                    }, 
                    "us": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.5
                    }
                }, 
                "id": 1082047, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "kosher salt", 
                "original": "1/2 teaspoon kosher salt", 
                "unit": "teaspoon"
            }, 
            {
                "originalString": "2 Golden Delicious apples, peeled, cored, cut in quarters and sliced paper-thin", 
                "aisle": "Produce", 
                "name": "red delicious apples", 
                "metaInformation": [
                    "paper-thin", 
                    "cored", 
                    "peeled", 
                    "sliced", 
                    "cut in quarters and  "
                ], 
                "image": "red-delicious-apples.png", 
                "measures": {
                    "metric": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "", 
                        "unitShort": "", 
                        "amount": 2.0
                    }
                }, 
                "id": 1059003, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [
                    "paper-thin", 
                    "cored", 
                    "peeled", 
                    "sliced", 
                    "cut in quarters and  "
                ], 
                "originalName": "Golden Delicious apples, peeled, cored, cut in quarters and sliced paper-thin", 
                "original": "2 Golden Delicious apples, peeled, cored, cut in quarters and sliced paper-thin", 
                "unit": ""
            }, 
            {
                "originalString": "2 tablespoons sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }, 
                    "us": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 2.0
                    }
                }, 
                "id": 19335, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar", 
                "original": "2 tablespoons sugar", 
                "unit": "tablespoons"
            }, 
            {
                "originalString": "1 tablespoon unsalted butter, quartered", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "unsalted butter", 
                "metaInformation": [
                    "unsalted", 
                    "quartered"
                ], 
                "image": "butter-sliced.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }
                }, 
                "id": 1145, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [
                    "unsalted", 
                    "quartered"
                ], 
                "originalName": "unsalted butter, quartered", 
                "original": "1 tablespoon unsalted butter, quartered", 
                "unit": "tablespoon"
            }, 
            {
                "originalString": "Vanilla ice cream, optional", 
                "aisle": "Frozen", 
                "name": "vanilla ice cream", 
                "metaInformation": [], 
                "image": "vanilla-ice-cream.png", 
                "measures": {
                    "metric": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 4.0
                    }, 
                    "us": {
                        "unitLong": "servings", 
                        "unitShort": "servings", 
                        "amount": 4.0
                    }
                }, 
                "id": 19095, 
                "amount": 4.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "Vanilla ice cream, optional", 
                "original": "Vanilla ice cream, optional", 
                "unit": "servings"
            }
        ], 
        "healthScore": 5.0, 
        "imageType": "jpg", 
        "spoonacularScore": 44.0, 
        "sourceUrl": "http://leitesculinaria.com/4207/recipes-rustic-apple-tarts.html", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 15, 
        "analyzedInstructions": [
            {
                "steps": [
                    {
                        "equipment": [
                            {
                                "image": "food-processor.png", 
                                "id": 404771, 
                                "name": "food processor"
                            }, 
                            {
                                "image": "bowl.jpg", 
                                "id": 404783, 
                                "name": "bowl"
                            }
                        ], 
                        "step": "In the bowl of a food processor fitted with a metal blade, pulse the flour, sugar, and salt until blended.", 
                        "number": 1, 
                        "ingredients": [
                            {
                                "image": "flour.png", 
                                "id": 20081, 
                                "name": "all purpose flour"
                            }, 
                            {
                                "image": "sugar-in-bowl.png", 
                                "id": 19335, 
                                "name": "sugar"
                            }, 
                            {
                                "image": "salt.jpg", 
                                "id": 2047, 
                                "name": "salt"
                            }
                        ]
                    }, 
                    {
                        "equipment": [], 
                        "step": "Add the butter cubes and pulse until the mixture resembles coarse cornmeal with pieces no bigger than small peas, about 13 to 15 one-second pulses.", 
                        "number": 2, 
                        "ingredients": []
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "plastic-wrap.jpg", 
                                "id": 404730, 
                                "name": "plastic wrap"
                            }, 
                            {
                                "image": "bowl.jpg", 
                                "id": 404783, 
                                "name": "bowl"
                            }
                        ], 
                        "step": "With the motor running, add the ice water all at once through the feed tube. Process for about 10 seconds, stopping before the dough becomes a solid mass. Turn the contents of the bowl onto a work surface, form into four equal-size discs, and wrap tightly in plastic wrap. Refrigerate for an one hour.", 
                        "number": 3, 
                        "ingredients": [
                            {
                                "image": "water.png", 
                                "id": 14412, 
                                "name": "water"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "baking-sheet.jpg", 
                                "id": 404727, 
                                "name": "baking sheet"
                            }, 
                            {
                                "image": "oven.jpg", 
                                "id": 404784, 
                                "temperature": {
                                    "number": 450.0, 
                                    "unit": "Fahrenheit"
                                }, 
                                "name": "oven"
                            }
                        ], 
                        "step": "Preheat the oven to 450°F (220°C). On a lightly floured surface, roll out each disc into a 7-inch circle and transfer to a parchment-lined baking sheet.", 
                        "number": 4, 
                        "ingredients": []
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "baking-sheet.jpg", 
                                "id": 404727, 
                                "name": "baking sheet"
                            }
                        ], 
                        "step": "Spread one-quarter of the ginger mixture on each tart, then arrange one-quarter of the slices (about half an apple) in an overlapping circular pattern on top, leaving a 1-inch border. Sprinkle the sugar evenly on top of the apples and fold over the borders. Most of the apples will remain uncovered. Press down the dough on the baking sheet, snugly securing the sides and seams to prevent drips. Dot the center of each tart with butter.", 
                        "number": 5, 
                        "ingredients": [
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }, 
                            {
                                "image": "sugar-in-bowl.png", 
                                "id": 19335, 
                                "name": "sugar"
                            }
                        ]
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "wire-rack.jpg", 
                                "id": 405900, 
                                "name": "wire rack"
                            }
                        ], 
                        "step": "Bake for 20 minutes, or until the crusts are golden and the apples have begun to brown slightly. Cool on a wire rack for 10 minutes and serve warm with a scoop of vanilla ice cream.", 
                        "length": {
                            "number": 30, 
                            "unit": "minutes"
                        }, 
                        "number": 6, 
                        "ingredients": [
                            {
                                "image": "vanilla-ice-cream.png", 
                                "id": 19095, 
                                "name": "vanilla ice cream"
                            }, 
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }
                        ]
                    }
                ], 
                "name": ""
            }
        ], 
        "winePairing": {}, 
        "aggregateLikes": 19, 
        "instructions": "1. In the bowl of a food processor fitted with a metal blade, pulse the flour, sugar, and salt until blended. Add the butter cubes and pulse until the mixture resembles coarse cornmeal with pieces no bigger than small peas, about 13 to 15 one-second pulses.2. With the motor running, add the ice water all at once through the feed tube. Process for about 10 seconds, stopping before the dough becomes a solid mass. Turn the contents of the bowl onto a work surface, form into four equal-size discs, and wrap tightly in plastic wrap. Refrigerate for an one hour.3. Preheat the oven to 450°F (220°C). On a lightly floured surface, roll out each disc into a 7-inch circle and transfer to a parchment-lined baking sheet.4. Spread one-quarter of the ginger mixture on each tart, then arrange one-quarter of the slices (about half an apple) in an overlapping circular pattern on top, leaving a 1-inch border. Sprinkle the sugar evenly on top of the apples and fold over the borders. Most of the apples will remain uncovered. Press down the dough on the baking sheet, snugly securing the sides and seams to prevent drips. Dot the center of each tart with butter.5. Bake for 20 minutes, or until the crusts are golden and the apples have begun to brown slightly. Cool on a wire rack for 10 minutes and serve warm with a scoop of vanilla ice cream.", 
        "spoonacularSourceUrl": "https://spoonacular.com/rustic-apple-tarts-597993", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": false, 
        "ketogenic": false, 
        "readyInMinutes": 135, 
        "servings": 4, 
        "sustainable": false, 
        "dairyFree": false, 
        "whole30": false
    }, 
    {
        "sourceName": null, 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/47732-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": null, 
        "id": 47732, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Apple Tart", 
        "diets": [
            "lacto ovo vegetarian"
        ], 
        "pricePerServing": 82.0, 
        "extendedIngredients": [
            {
                "originalString": "3/4 tsp apple cider vinegar", 
                "aisle": "Oil, Vinegar, Salad Dressing", 
                "name": "apple cider vinegar", 
                "metaInformation": [], 
                "image": "apple-cider-vinegar.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.75
                    }, 
                    "us": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.75
                    }
                }, 
                "id": 2048, 
                "amount": 0.75, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "apple cider vinegar", 
                "original": "3/4 tsp apple cider vinegar", 
                "unit": "tsp"
            }, 
            {
                "originalString": "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)", 
                "aisle": "Produce", 
                "name": "granny smith apples", 
                "metaInformation": [], 
                "image": "grannysmith-apple.png", 
                "measures": {
                    "metric": {
                        "unitLong": "kilograms", 
                        "unitShort": "kilogram", 
                        "amount": 1.134
                    }, 
                    "us": {
                        "unitLong": "pounds", 
                        "unitShort": "lb", 
                        "amount": 2.5
                    }
                }, 
                "id": 1089003, 
                "amount": 2.5, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "- 7 medium Granny Smith apples (about", 
                "original": "6 - 7 medium Granny Smith apples (about 2 1/2 lbs)", 
                "unit": "lbs"
            }, 
            {
                "originalString": "4 tbsp ice water, plus more as needed", 
                "aisle": "Beverages", 
                "name": "ice water", 
                "metaInformation": [
                    "as needed", 
                    "plus more "
                ], 
                "image": "water.png", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 4.0
                    }, 
                    "us": {
                        "unitLong": "Tbsps", 
                        "unitShort": "Tbsps", 
                        "amount": 4.0
                    }
                }, 
                "id": 14412, 
                "amount": 4.0, 
                "consitency": "liquid", 
                "meta": [
                    "as needed", 
                    "plus more "
                ], 
                "originalName": "ice water, plus more as needed", 
                "original": "4 tbsp ice water, plus more as needed", 
                "unit": "tbsp"
            }, 
            {
                "originalString": "3/4 tsp salt", 
                "aisle": "Spices and Seasonings", 
                "name": "salt", 
                "metaInformation": [], 
                "image": "salt.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.75
                    }, 
                    "us": {
                        "unitLong": "teaspoons", 
                        "unitShort": "tsps", 
                        "amount": 0.75
                    }
                }, 
                "id": 2047, 
                "amount": 0.75, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "salt", 
                "original": "3/4 tsp salt", 
                "unit": "tsp"
            }, 
            {
                "originalString": "1 tbsp sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }, 
                    "us": {
                        "unitLong": "Tbsp", 
                        "unitShort": "Tbsp", 
                        "amount": 1.0
                    }
                }, 
                "id": 19335, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar", 
                "original": "1 tbsp sugar", 
                "unit": "tbsp"
            }, 
            {
                "originalString": "1 1/2 cup unbleached all-purpose flour", 
                "aisle": "Baking", 
                "name": "unbleached flour", 
                "metaInformation": [
                    "all-purpose"
                ], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 354.882
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 1.5
                    }
                }, 
                "id": 10020081, 
                "amount": 1.5, 
                "consitency": "solid", 
                "meta": [
                    "all-purpose"
                ], 
                "originalName": "unbleached all-purpose flour", 
                "original": "1 1/2 cup unbleached all-purpose flour", 
                "unit": "cup"
            }, 
            {
                "originalString": "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes", 
                "aisle": "Milk, Eggs, Other Dairy", 
                "name": "unsalted butter", 
                "metaInformation": [
                    "unsalted", 
                    "cold", 
                    "cut into cubes"
                ], 
                "image": "butter-sliced.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 127.573
                    }, 
                    "us": {
                        "unitLong": "ounces", 
                        "unitShort": "oz", 
                        "amount": 4.5
                    }
                }, 
                "id": 1145, 
                "amount": 4.5, 
                "consitency": "solid", 
                "meta": [
                    "unsalted", 
                    "cold", 
                    "cut into cubes"
                ], 
                "originalName": "tbsp cold unsalted butter, cut into cubes", 
                "original": "9 tbsp (4 1/2 oz) cold unsalted butter, cut into cubes", 
                "unit": "oz"
            }, 
            {
                "originalString": "1 cup water", 
                "aisle": "Beverages", 
                "name": "water", 
                "metaInformation": [], 
                "image": "water.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 236.588
                    }, 
                    "us": {
                        "unitLong": "cup", 
                        "unitShort": "cup", 
                        "amount": 1.0
                    }
                }, 
                "id": 14412, 
                "amount": 1.0, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "water", 
                "original": "1 cup water", 
                "unit": "cup"
            }
        ], 
        "healthScore": 1.0, 
        "imageType": "jpg", 
        "spoonacularScore": 10.0, 
        "sourceUrl": "http://orangette.blogspot.com/2008/10/this-old-thing.html", 
        "glutenFree": false, 
        "vegan": false, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 8, 
        "analyzedInstructions": [], 
        "winePairing": {}, 
        "aggregateLikes": 0, 
        "instructions": null, 
        "spoonacularSourceUrl": "https://spoonacular.com/apple-tart-47732", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 60, 
        "servings": 8, 
        "sustainable": false, 
        "dairyFree": false, 
        "whole30": false
    }, 
    {
        "sourceName": "My Recipes", 
        "cuisines": [], 
        "image": "https://spoonacular.com/recipeImages/55263-556x370.jpg", 
        "cheap": false, 
        "gaps": "no", 
        "creditsText": "My Recipes", 
        "id": 55263, 
        "veryPopular": false, 
        "lowFodmap": false, 
        "title": "Apple-Cranberry Crisp", 
        "diets": [
            "dairy free", 
            "lacto ovo vegetarian", 
            "vegan"
        ], 
        "pricePerServing": 43.67, 
        "extendedIngredients": [
            {
                "originalString": "1/2 cup packed brown sugar", 
                "aisle": "Baking", 
                "name": "brown sugar", 
                "metaInformation": [
                    "packed"
                ], 
                "image": "light-brown-sugar.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 118.294
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.5
                    }
                }, 
                "id": 19334, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [
                    "packed"
                ], 
                "originalName": "packed brown sugar", 
                "original": "1/2 cup packed brown sugar", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/4 cup canola oil", 
                "aisle": "Oil, Vinegar, Salad Dressing", 
                "name": "canola oil", 
                "metaInformation": [], 
                "image": "vegetable-oil.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 59.147
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.25
                    }
                }, 
                "id": 4582, 
                "amount": 0.25, 
                "consitency": "liquid", 
                "meta": [], 
                "originalName": "canola oil", 
                "original": "1/4 cup canola oil", 
                "unit": "cup"
            }, 
            {
                "originalString": "2 cups fresh cranberries", 
                "aisle": "Produce", 
                "name": "cranberries", 
                "metaInformation": [
                    "fresh"
                ], 
                "image": "cranberries.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 473.176
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 2.0
                    }
                }, 
                "id": 9078, 
                "amount": 2.0, 
                "consitency": "solid", 
                "meta": [
                    "fresh"
                ], 
                "originalName": "fresh cranberries", 
                "original": "2 cups fresh cranberries", 
                "unit": "cups"
            }, 
            {
                "originalString": "3 cups cubed Granny Smith apple (about 1 pound)", 
                "aisle": "Produce", 
                "name": "granny smith apple", 
                "metaInformation": [
                    "cubed"
                ], 
                "image": "grannysmith-apple.png", 
                "measures": {
                    "metric": {
                        "unitLong": "grams", 
                        "unitShort": "g", 
                        "amount": 453.592
                    }, 
                    "us": {
                        "unitLong": "pound", 
                        "unitShort": "lb", 
                        "amount": 1.0
                    }
                }, 
                "id": 1089003, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [
                    "cubed"
                ], 
                "originalName": "cups cubed Granny Smith apple (about", 
                "original": "3 cups cubed Granny Smith apple (about 1 pound)", 
                "unit": "pound"
            }, 
            {
                "originalString": "1 cup regular oats", 
                "aisle": "Cereal", 
                "name": "oats", 
                "metaInformation": [], 
                "image": "rolled-oats.jpg", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 236.588
                    }, 
                    "us": {
                        "unitLong": "cup", 
                        "unitShort": "cup", 
                        "amount": 1.0
                    }
                }, 
                "id": 8120, 
                "amount": 1.0, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "regular oats", 
                "original": "1 cup regular oats", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/2 cup sugar", 
                "aisle": "Baking", 
                "name": "sugar", 
                "metaInformation": [], 
                "image": "sugar-in-bowl.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 118.294
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.5
                    }
                }, 
                "id": 19335, 
                "amount": 0.5, 
                "consitency": "solid", 
                "meta": [], 
                "originalName": "sugar", 
                "original": "1/2 cup sugar", 
                "unit": "cup"
            }, 
            {
                "originalString": "1/3 cup whole wheat flour", 
                "aisle": "Baking", 
                "name": "whole wheat flour", 
                "metaInformation": [
                    "whole wheat"
                ], 
                "image": "flour.png", 
                "measures": {
                    "metric": {
                        "unitLong": "milliliters", 
                        "unitShort": "ml", 
                        "amount": 78.863
                    }, 
                    "us": {
                        "unitLong": "cups", 
                        "unitShort": "cups", 
                        "amount": 0.333
                    }
                }, 
                "id": 20080, 
                "amount": 0.3333333333333333, 
                "consitency": "solid", 
                "meta": [
                    "whole wheat"
                ], 
                "originalName": "whole wheat flour", 
                "original": "1/3 cup whole wheat flour", 
                "unit": "cup"
            }
        ], 
        "healthScore": 1.0, 
        "imageType": "jpg", 
        "spoonacularScore": 13.0, 
        "sourceUrl": "http://www.myrecipes.com/recipe/apple-cranberry-crisp-10000000521615/", 
        "glutenFree": false, 
        "vegan": true, 
        "veryHealthy": false, 
        "weightWatcherSmartPoints": 7, 
        "analyzedInstructions": [
            {
                "steps": [
                    {
                        "equipment": [
                            {
                                "image": "oven.jpg", 
                                "id": 404784, 
                                "name": "oven"
                            }
                        ], 
                        "step": "Preheat oven to 35", 
                        "number": 1, 
                        "ingredients": []
                    }, 
                    {
                        "equipment": [
                            {
                                "image": "measuring-cup.jpg", 
                                "id": 404766, 
                                "name": "measuring cup"
                            }, 
                            {
                                "image": "roasting-pan.jpg", 
                                "id": 404646, 
                                "name": "baking pan"
                            }, 
                            {
                                "image": "chefs-knife.jpg", 
                                "id": 404745, 
                                "name": "knife"
                            }, 
                            {
                                "image": "bowl.jpg", 
                                "id": 404783, 
                                "name": "bowl"
                            }
                        ], 
                        "step": "Combine the first 3 ingredients in a medium bowl; spoon into an 8 x 8-inch baking dish coated with cooking spray. Lightly spoon the flour into a dry measuring cup, and level with a knife.", 
                        "number": 2, 
                        "ingredients": []
                    }, 
                    {
                        "equipment": [], 
                        "step": "Combine flour, oats, sugar, and oil, stirring with a fork until crumbly. Sprinkle over the apple mixture.", 
                        "number": 3, 
                        "ingredients": [
                            {
                                "image": "apple.jpg", 
                                "id": 9003, 
                                "name": "apple"
                            }, 
                            {
                                "image": "sugar-in-bowl.png", 
                                "id": 19335, 
                                "name": "sugar"
                            }, 
                            {
                                "image": "rolled-oats.jpg", 
                                "id": 8120, 
                                "name": "oats"
                            }, 
                            {
                                "image": "vegetable-oil.jpg", 
                                "id": 4582, 
                                "name": "cooking oil"
                            }
                        ]
                    }, 
                    {
                        "equipment": [], 
                        "step": "Bake at 350 for 40 minutes or until bubbly.", 
                        "length": {
                            "number": 40, 
                            "unit": "minutes"
                        }, 
                        "number": 4, 
                        "ingredients": []
                    }
                ], 
                "name": ""
            }
        ], 
        "winePairing": {}, 
        "aggregateLikes": 0, 
        "instructions": "Preheat oven to 350.                                                                                                Combine the first 3 ingredients in a medium bowl; spoon into an 8 x 8-inch baking dish coated with cooking spray. Lightly spoon the flour into a dry measuring cup, and level with a knife. Combine flour, oats, sugar, and oil, stirring with a fork until crumbly. Sprinkle over the apple mixture. Bake at 350 for 40 minutes or until bubbly.", 
        "spoonacularSourceUrl": "https://spoonacular.com/apple-cranberry-crisp-55263", 
        "dishTypes": [
            "side dish"
        ], 
        "occasions": [], 
        "vegetarian": true, 
        "ketogenic": false, 
        "readyInMinutes": 45, 
        "servings": 10, 
        "sustainable": false, 
        "dairyFree": true, 
        "whole30": false
    }
]

let model_output;

let global_photo;

class HomeScreen extends React.Component  {
    state = {
        text: "",
        imgUrl: "assets/icon.png",
    };

    async submitToModel(modelURL, imageURI, success) {
        ImageStore.getBase64ForTag(imageURI, data => {
            fetch(modelURL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data: data
                }),
            }).then(response => response.json()).then(success);
        }, reason => console.log(reason));
    }

    isImpossibleDuplicate(c) {
        if (c !== this.state.text.slice(-1)) return false;
        else return (c !== 'L' && c !== 'P') || (this.state.text.slice(-1) === this.state.text.slice(-2, -1));
    }

    async predict(uri) {
      // this.setState({text: this.state.text + 'x'})
        this.submitToModel(url, uri, response => {
            if (response[0] && response[0].payload[0]) {
                if (response[0].payload[0].displayName !== "Null") {
                    model_output = response[0].payload[0].json() // TODO get json from model output
                    // let character = response[0].payload[0].displayName;
                    // if (!this.isImpossibleDuplicate(character)) {
                    //     this.setState({text: this.state.text + character})
                    //     currentString += character;
                    // }
                }
                // else {
                //     if (!this.isImpossibleDuplicate(' ')) {
                //         this.setState({text: this.state.text + " "});
                //         // Expo.Speech.speak(currentString);
                //         currentString = "";
                //     }
                // }
            }
        }).then(() => {
            console.log("got here: " + uri)
        });
        // process model output
        // TODO .then api call with model output
        // store result in sample
    }

    render() {
        return (
            <View style={styles.container}>
                <CustomCamera ref={ref => this.customCamera = ref} onSnap={img => {
                    const manipulated = ImageManipulator.manipulateAsync(img.uri, [{
                        resize: {
                            width: 500,
                            height: 400
                        },

                    }, {
                        rotate: 0
                    }]);
                    manipulated.then((img) => {
                        this.state.imgUrl = img.uri;
                        // console.log("Resized " + img.uri + " to size " + img.width + " by " + img.height);
                        this.predict(img.uri);
                        // this.setState({imgUrl: img.uri});
                    });
                }}/>
                <View style={styles.bottomBox}>
                    {/* <Text>{currentString}</Text> */}
                    {/* <Image source={{uri: this.state.imgUrl}} style={{width: 300, height: 250}}/> */}
                    <Button title="Take Picture of Ingredients" style={{flex: 1}} onPress={() => {
                        if (this.customCamera) this.customCamera.snap()
                    }}/>
                    <Button title="View Recipes" onPress={() => this.props.navigation.navigate('Details')}/>
                </View>
            </View>
        );
    }
}

class CustomCamera extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentWillMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    async snap() {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({
                onPictureSaved: this.props.onSnap,
                skipProcessing: true
            })
            global_photo = photo;
        }
    }

    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <Camera style={styles.cameraView}
                            type={this.state.type}
                            ref={ref => {
                                this.camera = ref;
                            }}
                            pictureSize="2560x1440">
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 0.1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}>
                                <Text
                                    style={{fontSize: 18, marginBottom: 10, color: 'white'}}>
                                    {' '}Flip{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

class DetailsScreen extends React.Component {
    state = {
        text: sample,
    };

    process() {
        return this.state.text.map(function(item, i){
            return(
                <View style = {{alignItems: 'left'}} key={i}>
                    <Text style={{ marginBottom: 10, marginTop: 10, fontSize: 20 }} onPress={ ()=> Linking.openURL(item.sourceUrl) } >{item.title}</Text>
                    <TouchableHighlight onPress={ ()=> Linking.openURL(item.sourceUrl) }>
                        <Image source={{uri: item.image}} style={{width: 300, height: 250}} onPress={ ()=> Linking.openURL(item.sourceUrl) }/>
                    </TouchableHighlight>
                </View>
            );
        });
    }

    render() {
      return (
        <ScrollView style={{ flex: 1, alignItems: 'center', marginBottom: 50, marginTop: 20 }}>
            <Text style={{ flex: 1, fontSize: 30, marginBottom: 10, alignItems: 'center'}} >Suggested Recipes</Text>
            {this.process()}
            <Button
                title="Take another Image"
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

    // text: {
    //     flex: 1,
    //     fontSize: 30,
    //     marginBottom: 10,
    // },

    // smallerText: {
    //     flex: 1,
    //     fontSize: 20,
    // },
});