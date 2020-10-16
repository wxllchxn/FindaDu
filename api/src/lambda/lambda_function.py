import json

def lambda_handler(event, context):
    
    parameters = event["queryStringParameters"]

    longitude = parameters["longitude"] # float, long
    latitude = parameters["latitude"] # float, lat
    radius = parameters["radius"] # float, km
    
    # Finding nearest bathrooms.
    nearestBathrooms = [
        {
            "name": "Starbucks",
            "image": "https://drive.google.com/file/d/1ciMB-h2n052jW7YOIoV01tc_R9aMgqkJ/view",
            "latitude": float(longitude) + float(radius),
            "longitude": float(longitude) + float(radius)
        },
        {
            "name": "CVS",
            "image": "https://drive.google.com/file/d/1Tq_yv7bMY6tQBFLC4JXSpGCFctDc8xdS/view",
            "latitude": float(longitude) + float(radius),
            "longitude": float(longitude) + float(radius)
        }
    ]
    
    result = json.dumps(nearestBathrooms)
    return {
        "statusCode": 200,
        "body": result
    }

