import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Layout from './components/Event/Layout';
import LoginPage from './components/Login/LoginPage';

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">home</Link>
                    </li>
                    <li>
                        <Link to="/login">login</Link>
                    </li>
                    <li>
                        <Link to="/board">board</Link>
                    </li>
                    <li>
                        <Link to="/event">event</Link>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route exact path="/">
                    <div>home</div>
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/board">
                    <div>all event</div>
                </Route>
                <Route path="/event">
                    <Layout />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
