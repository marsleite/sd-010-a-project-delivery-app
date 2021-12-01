import React, { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import paths from '../routesPaths/paths';
import { goRoute } from '../utils/utils';
import postUser from '../services/requests';

const usersRedirectPaths = {
  customer: 'customer/products',
  seller: 'seller/orders',
};

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [userType, setUserType] = useState('customer');

  const [loginErr, setLoginErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const STATUS = 200;

  function handleInputChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  async function validateLogin(userLogin) {
    const { message, data, status, token } = await postUser(userLogin, 'login');

    if (message) setLoginErr(message);
    if (status === STATUS) {
      const user = { token, ...data };

      localStorage.setItem('user', JSON.stringify(user));
      setUserType(user.role);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    const validateButton = document.querySelector('button');
    const { email, password } = userData;
    const validateEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
    const validatePassword = new RegExp(/[\w\D]{6}/g).test(password);

    if (validateEmail && validatePassword) {
      validateButton.disabled = false;
    } else {
      validateButton.disabled = true;
    }
  });

  const history = useHistory();

  return (
    <main>
      <section>
        {/* <img></img> */}
        <h1>Drink Delivery</h1>
      </section>
      <form>
        <input
          type="text"
          placeholder="Insira seu e-mail"
          data-testid="common_login__input-email"
          name="email"
          // value={ email }
          onChange={ handleInputChange }
        />
        <br />
        <input
          type="password"
          placeholder="Insira sua senha"
          data-testid="common_login__input-password"
          name="password"
          onChange={ handleInputChange }
        />
        <br />
        <button
          type="button"
          data-testid="common_login__button-login"
          onClick={ () => validateLogin(userData) }
        >
          Login
        </button>
        <br />
        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ () => goRoute(paths.routeRegister, history) }
        >
          Cadastre-se
        </button>
        <br />
        {
          loginErr && (
            <span
              data-testid="common_login__element-invalid-email"
            >
              { loginErr }
            </span>
          )
        }
        {
          isLoading && (
            <Redirect to={ usersRedirectPaths[userType] } />
          )
        }
      </form>
    </main>
  );
};

export default Login;
