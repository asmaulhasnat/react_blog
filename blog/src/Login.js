import axios from 'axios'
import React, { useEffect ,useState,useContext } from 'react';
import env from "react-dotenv";
import { useHistory } from 'react-router-dom';
import {UserContext} from './UserContext';
function Login() {
const  [Formdata,setFormdata] =useState([]);	
const  [error,setError] =useState([]);
const {Users,setUsers} =useContext(UserContext);
const history=useHistory();

 const handleSubmit =(e) =>{
 	e.preventDefault();
 	axios.post(`${env.API_URL}/users/signin`,Formdata)
      .then(res => {
      	if (res.data.status==200) {
      		setError('');
      		localStorage.setItem('user_data', JSON.stringify(res.data));
      		setUsers(JSON.parse(localStorage.getItem('user_data')));
      		history.push('/my-blog');
      	}
      	if (res.data.status==422) {
      		setError(res.data.error);
      	}
     });
 }
 const handleChange =(value,key) =>{
 	setFormdata({...Formdata,...{[key]:value}});

 }

return (
<div>
<div className="card bg-secondary mt-3 ml-5 mr-5">
    		<div className="card-header">
		    Login Form<br/>
		    {error != '' ? (<span className='bg-danger'>{error}</span>):''}
		 	</div>
		 	<div className="card-body">
		 	<form onSubmit={handleSubmit}>
		 	<div className="mb-3">
			  <label htmlFor="email" className="form-label">Email address / User Name</label>
			  <input type="email" className="form-control" id="email" placeholder="Enter email or user name" onChange={(e)=>{handleChange(e.target.value,'email')}}/>
			</div>
			<div className="mb-3">
			  <label htmlFor="password" className="form-label">Password</label>
			  <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={(e)=>{handleChange(e.target.value,'password')}}/>
			</div>
			<button type="submit" className="btn btn-dark">Submit</button>
			</form>
		 	</div>

	</div>
</div>
);
}

export default Login;