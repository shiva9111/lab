import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [token, setToken] = useState('');
  const [authToken, setAuthToken] = useState('');

  const register = async () => {
    await axios.post('http://localhost:5000/api/auth/register', { email, password });
    alert('User registered. Now enable MFA.');
  };

  const enableMFA = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/enable-mfa', { email });
    setQrCode(res.data.qrCodeUrl);
  };

  const verifyMFA = async () => {
    const res = await axios.post('http://localhost:5000/api/auth/verify-mfa', { email, token });
    setAuthToken(res.data.token);
  };

  return (
    <div>
      <h2>Multi-Factor Authentication (MFA)</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={register}>Register</button>
      <button onClick={enableMFA}>Enable MFA</button>
      {qrCode && <img src={qrCode} alt="Scan QR Code" />}
      <input type="text" placeholder="Enter MFA Token" onChange={(e) => setToken(e.target.value)} />
      <button onClick={verifyMFA}>Verify MFA</button>
      {authToken && <p>Authenticated! Token: {authToken}</p>}
    </div>
  );
}

export default App;
