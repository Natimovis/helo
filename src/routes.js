import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';
import Dashboard from './components/dashboard/Dashboard';
import Post from './components/post/Post';
import Form from './components/form/Form';
import Profile from './components/profile/Profile';

export default (
  <Switch>
    <Route component={Auth} exact path='/'/>
    <Route component={Dashboard} path='/dashboard'/>
    <Route component={Post} path='/post/:post_id' />
    <Route component={Form} path='/new'/>
    <Route component={Profile} path='/profile'/>
  </Switch>
)