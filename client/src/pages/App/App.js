import React, { Component } from 'react';
import {
    Route,
    Switch,
    Link
} from "react-router-dom";
import './App.css';

import CreateUser from "../Create-user/Create-user";
import DeleteUser from "../Delete-user/Delete-user";
import ListUsers from "../List-users/List-users";

const Header = () => (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light  bg-light">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link"  to="/create-user">Add user</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/delete-user">Delete user</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/list-users">List users</Link>
                </li>
            </ul>
        </nav>
    </div>
)


class App extends Component {
    state = {
        response: ''
    };

    render() {
        return (
                <div className="App">
                    <Header/>
                    <div className='container' >
                        <Switch>
                            <Route  path="/create-user" component={CreateUser}/>
                            <Route  path="/delete-user" component={DeleteUser}/>
                            <Route  path="/list-users" component={ListUsers}/>
                        </Switch>
                         <p className="App-intro">{this.state.response}</p>
                    </div>

                </div>
        );
    }
}

export default App;