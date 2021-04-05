import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { setAccessToken } from './accessToken';
import EventBoard from './components/board/EventBoard';
import OneEventLayout from './components/Event/OneEventLayout';
import LoginPage from './components/Login/LoginPage';
import LogoutBtn from './components/Logout/LogoutBtn';
import DataLoading from './components/widgets/DataLoading';

function App() {
    const [loading, setLoading] = useState(true);
    // refresh token when refresh you page
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
        return <DataLoading loading={loading} />;
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
                </ul>
            </nav>
            <Switch>
                <Route exact path="/">
                    <div>Home</div>
                    <LogoutBtn />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/board">
                    <EventBoard />
                </Route>
                <Route path="/event/:id">
                    <OneEventLayout />
                </Route>
                <Route path="*">
                    <div>not match</div>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
