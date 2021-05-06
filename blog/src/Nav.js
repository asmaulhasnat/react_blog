import React, {useContext} from 'react';
import { BrowserRouter as Router,Link } from 'react-router-dom';
import {UserContext} from './UserContext';
function Nav() {
const {Users,setUsers} =useContext(UserContext);
const handleClick =(e) =>{
localStorage.removeItem('user_data');
setUsers(null);
 }	

  return (
    <div>
    <nav className="nav bg-dark">
    <Link to="/" className='nav-link'>Home</Link>
    {Users !=null ?(<React.Fragment><Link to="/my-blog" className='nav-link'>My Blog </Link><a href='#!' className='nav-link' onClick={handleClick}>Log out</a></React.Fragment> 
   ):(<React.Fragment><Link to="/login" className='nav-link'>Login</Link><Link to="/register" className='nav-link'>Register</Link></React.Fragment>
    )}
    
     
	</nav>
      
    </div>
  );
}

export default Nav;