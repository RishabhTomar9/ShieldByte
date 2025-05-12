import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email_alert(to_email, subject, message):
    try:
        # Email configuration
        sender_email = "titmediafusion@gmail.com"  
        sender_password = "Mediafusion@123##"    

        # Create email 
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))

        # Gmail SMTP server
        with smtplib.SMTP('smtp.gmail.com', 587) as server:  # Correct SMTP server for Gmail
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print("Email alert sent successfully.")
    except Exception as e:
        print(f"Failed to send email alert: {e}")

# Example usage for suspicious activity
if __name__ == '__main__':
    # Example suspicious activity detection
    suspicious_activity_detected = True  

    if suspicious_activity_detected:
        to_email = "pratul21oklife@gmail.com"
        subject = "Suspicious Activity Alert"
        message = "A suspicious activity has been detected in the system. Please review it immediately."
        send_email_alert(to_email, subject, message)