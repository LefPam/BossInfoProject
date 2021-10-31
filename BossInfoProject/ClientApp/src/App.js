//import logo from './logo.svg';
//import './App.css';
import { Home } from './Home';
import { Book } from './Book';
import { About } from './About';
import { Admin } from './Admin';
import { Room } from './Room';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App container">
                <h3 className="d-flex justify-content-center m-3">
                    BossInfo Mini Project
                </h3>


                <nav className="navbar navbar-expand-sm bg-light navbar-dark justify-content-center">
                    <ul classname="navbar-nav" >

                        <NavLink className="btn btn-light btn-outline-primary" to="/home">
                            Home
                        </NavLink>
                  
                        <NavLink className="btn btn-light btn-outline-primary" to="/book">
                            Book
                        </NavLink>

                        <NavLink className="btn btn-light btn-outline-primary" to="/about">
                            About
                        </NavLink>

                        <NavLink className="btn btn-light btn-outline-primary" to="/admin">
                            Admin
                        </NavLink>

                        <NavLink className="btn btn-light btn-outline-primary" to="/room">
                            Rooms
                        </NavLink>

                    </ul>
                </nav>

                <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/book' component={Book} />
                    <Route path='/about' component={About} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/room' component={Room} />
                </Switch>

            </div>
        </BrowserRouter>
    );
}

export default App;
