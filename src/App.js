import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Skeleton from './Pages/Skeleton';
import Routes from './Routes.js';

class App extends Component {
  render() {
    return (
        <Router>
            <Skeleton>
                <Routes/>
            </Skeleton>
        </Router>
    );
  }
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


export default App;
