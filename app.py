from flask import Flask, request, jsonify, send_from_directory
import pickle
import re
import os

app = Flask(__name__)

# Try loading model artifacts if they exist; otherwise fall back to heuristic
vector = None
model = None
try:
    if os.path.exists('vectorizer.pkl'):
        vector = pickle.load(open('vectorizer.pkl', 'rb'))
    if os.path.exists('phishing.pkl'):
        model = pickle.load(open('phishing.pkl', 'rb'))
except Exception:
    vector = None
    model = None


def heuristic_predict(url: str) -> str:
    checks = ["@", "login", "verify", "update"]
    if any(tok in url for tok in checks) or len(url) > 50:
        return 'bad'
    return 'good'


def predict_url(url: str) -> (str, str):
    cleaned_url = re.sub(r'https?://(www\.)?', '', url)
    if model is not None and vector is not None:
        try:
            pred = model.predict(vector.transform([cleaned_url]))[0]
        except Exception:
            pred = heuristic_predict(cleaned_url)
    else:
        pred = heuristic_predict(cleaned_url)

    if pred == 'bad':
        return 'bad', "Don't Click — site is not safe"
    if pred == 'good':
        return 'good', 'Site appears safe'
    return 'unknown', 'Unable to classify'


@app.route('/', methods=['GET'])
def index():
    return send_from_directory('.', 'index.html')


@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.get_json() or request.form
    url = data.get('url')
    if not url:
        return jsonify({'error': 'no url provided'}), 400

    label, message = predict_url(url)
    return jsonify({'prediction': label, 'message': message})


@app.route('/<path:filename>')
def serve_file(filename):
    return send_from_directory('.', filename)


if __name__ == '__main__':
    app.run(debug=True)
