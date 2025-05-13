import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
from sklearn.model_selection import GridSearchCV

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

# Define hyperparameter grid for Random Forest
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20, 30],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Perform Grid Search
print("Starting hyperparameter tuning...")
grid_search = GridSearchCV(estimator=RandomForestClassifier(random_state=42), param_grid=param_grid, cv=3, scoring='accuracy', n_jobs=-1)
grid_search.fit(X_train, y_train)

# Use the best model from Grid Search
best_model = grid_search.best_estimator_
print(f"Best Parameters: {grid_search.best_params_}")

# Evaluate the best model
y_pred = best_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Improved Model Accuracy: {accuracy}")

# Save the best model
joblib.dump(best_model, '../model.pkl')
print("Improved model saved as model.pkl")
