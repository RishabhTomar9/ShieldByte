import sqlite3

def init_db():
    try:
        print("Connecting to the database...")
        conn = sqlite3.connect('user_behavior.db')
        cursor = conn.cursor()

        # Behavior logs
        print("Creating 'user_behavior' table if it doesn't exist...")
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_behavior (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login_location TEXT,
            typing_speed REAL,
            transaction_pattern TEXT,
            risk_score REAL,
            flagged BOOLEAN
        )
        ''')

        # Flagged events
        print("Creating 'flagged_events' table if it doesn't exist...")
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS flagged_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER,
            alert_sent BOOLEAN
        )
        ''')

        conn.commit()
        print("Database initialized successfully!")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == '__main__':
    print("Starting database initialization...")
    init_db()
    print("Script execution completed.")