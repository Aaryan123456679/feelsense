from keras.models import load_model
from PIL import Image
import numpy as np
import io
import base64
import sys
import zlib
from flask import Flask, request, jsonify

app = Flask(__name__)
@app.route('/api/predict_image', methods=['POST'])
def process_image():
    data = request.json
    image_data = data['image']
    compressed_image = base64.b64decode(image_data)
    decompressed_image = zlib.decompress(compressed_image)

    # Convert byte data to an image
    image = Image.open(io.BytesIO(decompressed_image))
    processed_image = process_data(image)
    return jsonify({'processed_image': processed_image})

def ef(image):
    feature = data_url_to_numpy(image);
    feature = feature.reshape(1,48,48,1)
    return feature/255.0


def process_data(image):
    # Your actual processing logic here
    new_model = load_model("model_save.h5")
    img = ef(image)
    pred = new_model.predict(img)
    
    return pred

# Main block to run the server if executed directly
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)