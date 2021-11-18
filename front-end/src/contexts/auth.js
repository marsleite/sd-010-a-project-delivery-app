import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useInputs from '../hooks/useInputs';
import useAlert from '../hooks/useAlert';
import loginSchema from '../schemas/login';
import api from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [values, setInputs] = useInputs({ email: '', password: '' });
  const [schemaStatus, setSchemaStatus] = useState({ valid: false, error: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [user, setUser] = useState({});
  const { Alert, alertMessage, alertType, isVisible, showAlert } = useAlert();
  const history = useHistory();

  useEffect(() => {
    showAlert(false);
    const { error } = loginSchema.validate(values);
    setButtonDisabled(error !== undefined);
    setSchemaStatus({ valid: error === undefined, error: error ? error.message : '' });
  }, [values, showAlert]);

  async function logIn(event) {
    event.preventDefault();
    try {
      if (!schemaStatus.valid) throw new Error(schemaStatus.error);
      const response = await api.post('/login', values);
      const { data } = response;
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
        token: data.token,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      history.push('/customer/products');
    } catch (error) {
      alertType('danger');
      alertMessage(error.message);
      showAlert(true);
    }
  }

  function logOut() {
    localStorage.removeItem('user');
    setUser({});
    history.push('/login');
  }

  return (
    <AuthContext.Provider
      value={ {
        logIn,
        logOut,
        isVisible,
        buttonDisabled,
        Alert,
        setInputs,
        user,
      } }
    >
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
