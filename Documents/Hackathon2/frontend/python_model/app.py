from flask import Flask, request, jsonify
from face_recognition_model import recognize_faces  # Import from your notebook logic

app = Flask(__name__)

@app.route('/recognize', methods=['POST'])
def recognize():
    # Logic to recognize face from uploaded image or webcam stream
    matched_images = recognize_faces()
    return jsonify({"images": matched_images})

if __name__ == '__main__':
    app.run(port=5001)
