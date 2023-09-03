from flask import Flask, render_template, jsonify, send_from_directory
import time
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-text')
def generate_text():
    time.sleep(5)
    return jsonify({
        "text": "This is some demo text that was loaded lazily."
    })

@app.route('/get-images')
def get_images():
    time.sleep(2)  # Simulate time taken to generate each image
    image_folder = os.path.join(app.static_folder, 'images')
    images = os.listdir(image_folder)
    image_paths = [f'/static/images/{img}' for img in images]
    return jsonify(image_paths)

if __name__ == '__main__':
    app.run(debug=True)
