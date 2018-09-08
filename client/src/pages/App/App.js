import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router
} from "react-router-dom";
import './App.css';

import CreateUser from "../Create-user/Create-user";


class App extends Component {
    state = {
        response: ''
    };

    render() {
        return (
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">USER MANAGER</h1>
                    </header>

                    <div className='container' >
                        <Router>
                            <Route  path="/" component={CreateUser}/>
                        </Router>
                         <p className="App-intro">{this.state.response}</p>
                    </div>

                </div>
        );
    }
}

export default App;