import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

def generate_temporary_data(num_samples=100):
    np.random.seed(42)
    data = {
        'login_location': np.random.choice([0, 1], size=num_samples),
        'typing_speed': np.random.uniform(50, 200, size=num_samples),
        'transaction_pattern': np.random.uniform(0.1, 1.0, size=num_samples),
        'is_suspicious': np.random.choice([0, 1], size=num_samples, p=[0.7, 0.3])
    }
    return pd.DataFrame(data)

# Generate temporary data
data = generate_temporary_data()

# Features and target
X = data[['login_location', 'typing_speed', 'transaction_pattern']]
y = data['is_suspicious']

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Random Forest model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy}")

# Save the trained model
joblib.dump(model, 'model.pkl')
print("Model saved as model.pkl")
