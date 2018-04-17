import React from 'react';
import {Route,Switch} from 'react-router-dom';
import HomePage from './Pages/HomePage';
import MoviePage from './Pages/MoviePage';

const Routes = () => (
    <Switch>
        <Route exact path = "/" component={HomePage}/>
        <Route path="/movie/:movieId" component={MoviePage}/>
    </Switch>
)

export default Routes;
