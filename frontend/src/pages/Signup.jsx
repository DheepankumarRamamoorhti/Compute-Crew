import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      onSignup(email);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <h2 style={styles.green}>SIGN UP FOR FREE IN
