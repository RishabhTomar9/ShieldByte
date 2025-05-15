from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load the pre-trained ML model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    model = None
    print(f"Failed to load model: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    try:
        # Get JSON data from request
        data = request.get_json(force=True)
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        # Validate input keys and types
        required_keys = ['login_location', 'typing_speed', 'transaction_pattern']
        for key in required_keys:
            if key not in data:
                return jsonify({'error': f'Missing key: {key}'}), 400
        try:
            features = [
                float(data['login_location']),
                float(data['typing_speed']),
                float(data['transaction_pattern'])
            ]
        except Exception:
            return jsonify({'error': 'All input values must be numeric.'}), 400

        prediction = model.predict([features])
        risk_score = model.predict_proba([features])[0][1]
        return jsonify({
            'prediction': int(prediction[0]),
            'risk_score': float(risk_score)
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5001)