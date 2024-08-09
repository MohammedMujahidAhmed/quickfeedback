import React from 'react';
import { Html, Head, Preview, Body, Container, Heading, Text, Button, Hr } from '@react-email/components';

interface verificationEmailProps {
  username: string;
  otp: string;
}

const verificationEmail: React.FC<verificationEmailProps> = ({ username, otp }) => {
  return (
    <Html>
      <Head />
      <Preview>Your OTP for Account Verification</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Hello, {username}!</Heading>
          <Text style={styles.text}>We received a request to verify your account. Use the following OTP to complete the process:</Text>
          <Text style={styles.otp}>{otp}</Text>
          <Text style={styles.text}>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</Text>
          <Button style={styles.button} href="#">Verify Account</Button>
          <Hr style={styles.hr} />
          <Text style={styles.footer}>If you did not request this, please ignore this email.</Text>
          <Text style={styles.footer}>Thank you for choosing our service!</Text>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: '#f4f4f7',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  heading: {
    color: '#333333',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  text: {
    color: '#555555',
    fontSize: '16px',
    marginBottom: '20px',
  },
  otp: {
    color: '#007BFF',
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center' as 'center',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#ffffff',
    textDecoration: 'none',
    padding: '12px 24px',
    borderRadius: '4px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  hr: {
    border: 'none',
    borderTop: '1px solid #dddddd',
    margin: '20px 0',
  },
  footer: {
    color: '#888888',
    fontSize: '12px',
    textAlign: 'center' as 'center',
  },
};

export default verificationEmail;