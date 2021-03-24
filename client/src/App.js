import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { setAccessToken } from './accessToken';
import Layout from './components/Event/Layout';
import LoginPage from './components/Login/LoginPage';
import DataLoading from './components/widgets/DataLoading';

function App() {
    const [loading, setLoading] = useState(true);

    // refresh token all app refresh
    useEffect(() => {
        fetch('http://localhost:4000/refresh_token', {
            method: 'post',
            credentials: 'include',
        })
            .then((e) => e.json())
            .then((data) => {
                setAccessToken(data.accessToken);
            });
        setLoading(false);
    }, []);

    if (loading) {
        return <DataLoading />;
    }

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
