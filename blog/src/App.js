import './App.css';
import'bootstrap/dist/css/bootstrap.min.css';
import $ from'jquery';
import Popper from'popper.js';
import'bootstrap/dist/js/bootstrap.bundle.min';
import React ,{ useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Myblog from './Myblog';
import {UserContext} from './UserContext';

function App() {
  const [Users,setUsers]=useState(JSON.parse(localStorage.getItem('user_data')))
  return (
   <Router> 
    <div className="App">
        <UserContext.Provider value={{Users,setUsers}}>

        <Nav/>
        <Switch>
        <Route path='/' exact  component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/my-blog' exact component={Myblog}/>
        </Switch>
        </UserContext.Provider>
        
    </div>
    </Router>
  );
}

export default App;
