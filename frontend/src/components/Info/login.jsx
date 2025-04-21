import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email); // Proceed to app
    }
  };

  return (
    <div style={styles.container}>
      {/* Left Section - Login Form */}
      <div style={styles.left}>
        <h2 style={styles.heading}>WELCOME BACK!</h2>
        <p style={styles.subText}>Log in to access your saved summaries and preferences.</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <h3 style={styles.sectionTitle}>LOGIN</h3>

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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button type="submit" style={styles.button}>LOG IN</button>
        </form>

        <p style={styles.disclaimer}>
          Forgot your password? <a href="#">Reset it here</a>.
        </p>
      </div>

      {/* Right Section - Features */}
      <div style={styles.right}>
        <h3 style={styles.sectionTitle}>🔐 Why log in?</h3>
        <ul style={styles.features}>
          <li>💾 Save research summaries</li>
          <li>📥 Download past summaries</li>
          <li>🔔 Get personalized recommendations</li>
          <li>📈 View reading history</li>
          <li>🛡️ Enhanced data security</li>
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
    fontSize: '15px',
    lineHeight: '2em',
    color: '#333'
  }
};

export default Login;
