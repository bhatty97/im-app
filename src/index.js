import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup'
import DashboardComponent from './dashboard/dashboard'
const firebase = require("firebase");
require("firebase/firestore");

firebase.initializeApp({
  apiKey: "AIzaSyDXYXvj53-CgGNXInHK72UNaeTG3lsEa7I",
  authDomain: "im-app-2c5aa.firebaseapp.com",
  databaseURL: "https://im-app-2c5aa.firebaseio.com",
  projectId: "im-app-2c5aa",
  storageBucket: "im-app-2c5aa.appspot.com",
  messagingSenderId: "286139609720",
  appId: "1:286139609720:web:ffb6ce12f694ebe3ae338d",
  measurementId: "G-V285MV6MD7"
});

const routing = (
  <Router>
    <div id='routing-container'>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(
 routing,
  document.getElementById('root')
);
serviceWorker.unregister();
