import sqlite3

def init_db():
    conn = sqlite3.connect('user_behavior.db')
    cursor = conn.cursor()

    #Behavior logs
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
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS flagged_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER,
        alert_sent BOOLEAN
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
