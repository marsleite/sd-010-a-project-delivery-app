import React from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Auth from '../pages/Auth';
import ProtectedRoute from './ProtectedRoute';

export default function Routes() {
  return (
    <Switch>
      <Route path={ ['/login', '/register'] } component={ Auth } />
      <ProtectedRoute path={ ['/customer', '/'] }>
        <NavBar />
        <Route path="/customer/products" render={ () => <h1>Produtos</h1> } />
      </ProtectedRoute>
    </Switch>
  );
}
