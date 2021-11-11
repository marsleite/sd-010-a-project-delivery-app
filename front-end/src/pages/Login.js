import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async (userEmail, userPassword) => {
    const res = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: userEmail, password: userPassword }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="common_login__input-email"
        onChange={ (e) => setEmail(e.target.value) }
        value={ email }
        placeholder="email"
      />

      <input
        type="email"
        data-testid="common_login__input-password"
        onChange={ (e) => setPassword(e.target.value) }
        value={ password }
        placeholder="password"
      />

      <button
        type="button"
        data-testid="common_login__button-login"
        onClick={ () => handleClick(email, password) }
      >
        Entrar
      </button>

      <button
        type="button"
        data-testid="common_login__button-register"
        // onClick={ () => () }
      >
        Registrar-se
      </button>
    </div>
  );
}

export default Login;
