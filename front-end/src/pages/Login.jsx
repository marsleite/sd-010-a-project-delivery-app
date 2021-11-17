/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { LockClosedIcon } from '@heroicons/react/solid';
import { userLogin } from '../redux/userSlice';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const url = 'http://localhost:3001';
  const dispatch = useDispatch();
  const store = useStore();
  const history = useHistory();

  const validations = () => {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const minPasswordLength = 6;
    if (!emailRegex.test(email) || password.length < minPasswordLength) {
      return true;
    }
    return false;
  };

  const makeLogin = async () => {
    validations();
    await axios
      .post(`${url}/login`, { email, password })
      .then((res) => {
        const { token, role } = res.data;
        dispatch(userLogin({ token, role }));
        console.log(userLogin);
        setShowError(false);
      })
      .catch((err) => setShowError(err));
  };

  const handleLogin = async () => {
    await makeLogin();
    if (store.getState().user.role === 'customer') history.push('/customer/products');
    if (store.getState().user.role === 'administrator') history.push('/admin/manage');
    if (store.getState().user.role === 'seller') history.push('/seller/orders');
  };

  return (
    <main
      className="min-h-full flex items-center justify-center
      py-12 px-4 sm:px-6 lg:px-8 w-full space-y-7 flex-col"
    >
      <h2 className="mt-6 text-center text-3xl font-extrabold text-purple-600">
        Delivery App
      </h2>
      <form className="mt-8 space-y-8 w-1/3">
        <div className="rounded-md shadow-sm -space-y-px">
          <input
            className="appearance-none rounded-none relative block w-full
            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
            rounded-t-md focus:outline-none focus:ring-indigo-500
            focus:border-indigo-500 focus:z-10 sm:text-sm"
            id="email"
            type="email"
            name="email"
            placeholder="Endereço de email"
            data-testid="common_login__input-email"
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2
            border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md
            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
            focus:z-10 sm:text-sm"
            id="password"
            type="password"
            name="password"
            value={ password }
            placeholder="Senha"
            data-testid="common_login__input-password"
            onChange={ (e) => setPassword(e.target.value) }
            required
          />
        </div>
        <span
          data-testid="common_login__element-invalid-email"
          style={ { color: 'red' } }
          hidden={ !showError }
        >
          Usuário ou senha inválidos
        </span>
        <div className="flex flex-row">
          <button
            type="button"
            className="group relative flex justify-center py-2 px-4 border
            border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500 w-2/3"
            disabled={ validations() }
            data-testid="common_login__button-login"
            onClick={ handleLogin }
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500
                group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            <p>
              Login
            </p>
          </button>
          <button
            type="button"
            className="group relative flex justify-center py-2 px-4 border
            border-transparent text-sm font-medium rounded-md text-white bg-indigo-600
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500 w-1/3 ml-3"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/register') }
          >
            Cadastrar
          </button>
        </div>
      </form>
    </main>
  );
}
