from keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/predict_image', methods=['POST'])
def process_image():
    data = request.json
    image_data = data['image']
    
    #convert data url to image
    newPrediction = data_url_to_image(image_data)

    #resize the image
    newPrediction = resize_image(newPrediction)

    #convert to grayscale
    newPrediction = convert_to_grayscale(newPrediction)

    #convert to numpy array
    newPrediction = image_to_numpy(newPrediction)

    #ensure correct dimensions
    newPrediction = ensure_correct_dimensions(newPrediction)

    #reshape image
    newPrediction = reshape_image(newPrediction)

    #predict
    newPrediction = newPrediction.reshape(1,48,48,1)
    newPrediction = newPrediction/255.0
    new_model = load_model("model_save.h5")
    pred = new_model.predict(newPrediction)

    return jsonify({'last_emotion': str(pred.argmax())})


def data_url_to_image(data_url):
    # Extract the base64 encoded string from the data URL
    base64_str = data_url.split(',')[1]
    
    # Decode the base64 string to bytes
    image_bytes = base64.b64decode(base64_str)
    
    # Convert bytes to a PIL Image
    image = Image.open(io.BytesIO(image_bytes))
    
    return image

def resize_image(image, target_size=(48, 48)):
    # Resize the image
    resized_image = image.resize(target_size, Image.Resampling.LANCZOS)
    return resized_image

def convert_to_grayscale(image):
    # Convert the image to grayscale
    grayscale_image = image.convert('L')
    return grayscale_image

def image_to_numpy(image):
    # Convert PIL Image to NumPy array
    numpy_array = np.array(image)
    return numpy_array

def ensure_correct_dimensions(numpy_array):
    # Ensure the array has the correct dimensions (48, 48, 1)
    if len(numpy_array.shape) == 2:
        # Add a channel dimension if the image is grayscale
        numpy_array = np.expand_dims(numpy_array, axis=-1)
    return numpy_array

def reshape_image(numpy_array):
    # Reshape the NumPy array to (1, 48, 48, 1)
    reshaped_array = numpy_array.reshape((1, 48, 48, 1))
    return reshaped_array


if __name__ == "__main__":
    app.run(debug=True, port = 8080)