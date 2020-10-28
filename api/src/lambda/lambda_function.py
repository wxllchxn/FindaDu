import json
from botocore.vendored import requests
import math

# Current and test for insomnia: 42.271861, -83.7305288, 0.276104728367224
temp_radius = 0.400 # temp. This closest one I found on the testing map.

# def calculateDistance(latitude: float, longitude: float, bathroomLat:float, bathroomLong: float):
#     distance = math.sqrt(((latitude-bathroomLat)**2)+((longitude-bathroomLong)**2))
#     return distance


def findNearestBathroomsFrom(latitude: float, longitude: float, radius: float):
    url = "https://www.refugerestrooms.org/api/v1/restrooms/by_location?lat={0}&lng={1}".format(latitude, longitude)
    response = requests.get(url)
        
    bathroomData = json.loads(response.text)
    bathroomObjects = []
    # if latitude != 42.271861:
    #     bathroomObjects.append({"nope": 3})
        # return bathroomObjects
    for bathroomDatum in bathroomData:
        if float(bathroomDatum["distance"]) <= radius:
            bathroomName = str(bathroomDatum["name"])
            bathroomLat = float(bathroomDatum["latitude"])
            bathroomLong = float(bathroomDatum["longitude"])
            bathroomImageLink = str("https://findadu-images.s3.amazonaws.com/starbucks-bathroom.jpg")
            bathroomObject = {
                "name": bathroomName,
                "image": bathroomImageLink,
                "latitude": bathroomLat,
                "longitude": bathroomLong
            }
            bathroomObjects.append(bathroomObject)
    return bathroomObjects


def lambda_handler(event, context):

    parameters = event["queryStringParameters"]

    latitude = float(parameters["latitude"]) # float, lat
    longitude = float(parameters["longitude"]) # float, long
    # radius = parameters["radius"] # float, km
    
    # Finding nearest bathrooms.
    nearestBathrooms = findNearestBathroomsFrom(latitude=latitude, longitude=longitude, radius=temp_radius)
    
    result = json.dumps(nearestBathrooms)
    
    return {
        "statusCode": 200,
        "body": result,
        "isBase64Encoded": False,
        "headers": {'Content-Type': 'application/json'}
    }
    

# if __name__ == "__main__":
#     bathrooms = findNearestBathroomsFrom(42.271861, -83.7305288, radius)
#     for bathroom in bathrooms:
#         print(bathroom)
