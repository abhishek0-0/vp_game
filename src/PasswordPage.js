import React, { useState } from 'react';
import './PasswordPage.css';

// const PasswordPage = ({ onPasswordSubmit }) => {
//   const [password, setPassword] = useState('');

//   const handleSubmit = () => {
//     if (password.length === 4) {
//       onPasswordSubmit(password); // send to App.js
//     } else {
//       alert('Password must be exactly 4 characters!');
//     }
//   };

//   return (
//     <div className="password-container">
//       <div className="password-title"> Enter a 4-character Password</div>
//       <input
//         type="text"
//         maxLength={4}
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="password-input"
//         placeholder="e.g. abcd"
//       />
//       <br />
//       <button onClick={handleSubmit} className="submit-button">Submit</button>
//     </div>
//   );
// };

// export default PasswordPage;



const PasswordPage = ({ onPasswordSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (password.length !== 4) {
      setError('Password must be exactly 4 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    onPasswordSubmit(password);
  };

  return (
    <div className="password-container">
      <h2 className="password-title">🔐 Set a 4-character Password</h2>

      <div className="input-wrapper">
        <input
          className="password-input"
          type="password" 
          maxLength={4}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-wrapper">
        <input
          className="password-input"
          type="password"
          maxLength={4}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PasswordPage;
