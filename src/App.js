import React from 'react';
import './App.css';
import UserBoard from './components/UserBoard/UserBoard';
import BillBoard from './components/BillBoard/BillBoard';
import SummaryBoard from './components/SummaryBoard/SummaryBoard';

function App() {
    return (
        <div className="App">
            <SummaryBoard />
            <UserBoard />
            <BillBoard />
        </div>
    );
}

export default App;
