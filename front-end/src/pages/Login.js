import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { validateLogin } from '../components/ultility';
import Error from '../components/Error';

const datatestid = 'common_login__element-invalid-email';

export default function Login() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const sucessValidate = validateLogin(emailInput, passwordInput);
    setIsValid(sucessValidate);
  }, [emailInput, passwordInput]);

  const handleButtonClick = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:3001/login', {
      email: emailInput,
      password: passwordInput,
    })
      .then(((res) => {
        const { email, password } = res.data.user;
        dispatch(saveUser({ email, password }));
        history.push('/customer/products');
      }))
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <main>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          name="Login-email"
          className="email-input"
          placeholder="exemplo@email.com"
          onChange={ (e) => setEmailInput(e.target.value) }
          data-testid="common_login__input-email"
        />
        <input
          type="password"
          name="Login-password"
          className="password-input"
          placeholder="Digite a senha"
          onChange={ (e) => setPasswordInput(e.target.value) }
          data-testid="common_login__input-password"
        />
        <button
          type="submit"
          className="button-input"
          onClick={ (e) => handleButtonClick(e) }
          disabled={ !isValid }
          data-testid="common_login__button-login"
        >
          Login
        </button>
      </form>
      <button
        type="button"
        className="register-input"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Registre-se
      </button>
      <div>
        { error && <Error testeid={ datatestid }>Usuário ou Senha inválido</Error>}

      </div>
    </main>
  );
}
