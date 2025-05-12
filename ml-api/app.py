from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load the pre-trained ML model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')
model = joblib.load(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        features = [
            data['login_location'],
            data['typing_speed'],
            data['transaction_pattern']
        ]

        prediction = model.predict([features])
        risk_score = model.predict_proba([features])[0][1]  
        return jsonify({
            'prediction': int(prediction[0]),
            'risk_score': risk_score
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)