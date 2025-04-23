import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password) {
      onSignup(email); // Proceed to app
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Section - Signup Form */}
      <div style={styles.left}>
        <h2 style={styles.heading}>SIGN UP FOR FREE IN LESS THAN A MINUTE</h2>
        <p style={styles.subText}>Unlimited access to research summaries in 3 easy steps:</p>

        <form onSubmit={handleSignup} style={styles.form}>
          <h3 style={styles.sectionTitle}>CREATE ACCOUNT</h3>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>CREATE FREE ACCOUNT</button>
        </form>

        <p style={styles.disclaimer}>
          By clicking continue, you agree to our <a href="#">T&Cs</a> and <a href="#">Privacy Policy</a>.
        </p>
      </div>

      {/* Right Section - Features */}
      <div style={styles.right}>
        <h3 style={styles.sectionTitle}>✅ What you get:</h3>
        <ul style={styles.features}>
          <li style={styles.featureItem}>🔍 Summarize articles in seconds</li>
          <li style={styles.featureItem}>📚 Access to 100+ academic sources</li>
          <li style={styles.featureItem}>💡 Unlimited free summaries</li>
          <li style={styles.featureItem}>🤖 AI-enhanced suggestions</li>
          <li style={styles.featureItem}>📝 Save summaries to your account</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: '40px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f9fbfd',
    minHeight: '100vh',
    justifyContent: 'center',
    gap: '40px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  left: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    flex: 1,
    maxWidth: '480px',
    minWidth: '300px',
  },
  right: {
    padding: '20px',
    flex: 1,
    minWidth: '300px',
    maxWidth: '400px',
  },
  heading: {
    color: '#2ecc71',
    fontSize: '20px',
    marginBottom: '8px',
  },
  subText: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#2ecc71',
    border: 'none',
    color: 'white',
    fontSize: '15px',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  sectionTitle: {
    marginBottom: '10px',
    color: '#333',
  },
  disclaimer: {
    marginTop: '14px',
    fontSize: '12px',
    color: '#777'
  },
  features: {
    listStyleType: 'none',
    paddingLeft: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  featureItem: {
    backgroundColor: '#1e3a8a',
    color: 'white',
    padding: '12px 16px',
    borderRadius: '10px',
    boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
  }
};

export default Signup;
