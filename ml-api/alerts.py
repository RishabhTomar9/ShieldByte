import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email_alert(to_email, subject, message):
    try:
        # Email configuration
        sender_email = "your_email@example.com"
        sender_password = "your_password"

        # Create email message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))

        #SMTP server
        with smtplib.SMTP('smtp.example.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print("Email alert sent successfully.")
    except Exception as e:
        print(f"Failed to send email alert: {e}")

# Example usage
if __name__ == '__main__':
    send_email_alert("admin@example.com", "Suspicious Activity Alert", "A suspicious activity has been detected.")
