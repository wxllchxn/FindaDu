import os
import json
import boto3
# import requests
from botocore.vendored import requests
import math

# Current and test for insomnia: 42.271861, -83.7305288, 0.276104728367224
temp_radius = 0.400 # temp. This closest one I found on the testing map.

lambda_tmp_directory = "/tmp"
s3_bucket_name = "findadu-images"

# def calculateDistance(latitude: float, longitude: float, bathroomLat:float, bathroomLong: float):
#     distance = math.sqrt(((latitude-bathroomLat)**2)+((longitude-bathroomLong)**2))
#     return distance

def getImageLinkfor(latitude: float, longitude:float):
    
    # Check if the S3 alreday has the image.
    # Image names are <lat><long>.jpg

    url = str("https://findadu-images.s3.amazonaws.com/") + str(latitude) + str(longitude) + ".jpg"
    response = requests.get(url)
    if response.status_code == 200:
        return url
    else:
        # If image doesn't exist, download the image from the google api given coordinates.
        url = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location={0},{1}&fov=80&heading=70&pitch=0&key=AIzaSyDlVPOT9oIOdIkVyoxZ2K8ofNDHmh19npE".format(latitude, longitude)
        response = requests.get(url)
        # print(response.headers.items())
        fileName = str(latitude) + str(longitude) + ".jpg"
        filePath = os.path.join(lambda_tmp_directory, fileName)
        with open(filePath, 'wb') as file:
            file.write(response.content)
        response.close()
        # Upload image to S3.
        client = boto3.client('s3')
        client.upload_file(filePath, s3_bucket_name, fileName, ExtraArgs={'ACL': 'public-read'})
        url = str("https://findadu-images.s3.amazonaws.com/") + str(latitude) + str(longitude) + ".jpg"
        return url

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
            
            bathroomImageLink = getImageLinkfor(latitude=bathroomLat, longitude=bathroomLong)
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
    
#     # bathrooms = findNearestBathroomsFrom(42.271861, -83.7305288, radius)
#     # for bathroom in bathrooms:
#     #     print(bathroom)

#     print(getImageLinkfor(latitude=42.271861, longitude=-83.7305288))
