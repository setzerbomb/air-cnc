import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Spot from './pages/Spot';
import Dashboard from './pages/Dashboard';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/dashboard" component={Dashboard}></Route>
                <Route path="/spot" component={Spot}></Route>
            </Switch>
        </BrowserRouter>
    )
}