import axios from 'axios'
import React, { useEffect ,useState,useContext } from 'react';
import env from "react-dotenv";
import {UserContext,CommentContext} from './UserContext';
import { useHistory } from 'react-router-dom';
function CreateComment({post_id}) {
const  [Formdata,setFormdata] =useState([]);	
const  [error,setError] =useState([]);
const {commentcon,setcommentcon} = useContext(CommentContext);	
const {Users,setUsers} = useContext(UserContext);
const history=useHistory();
useEffect(() => {
    
  }, []);	
 const handleSubmit =(e) =>{
 	e.preventDefault();
 	
 	let data={...Formdata,...{['user_id']:Users.user.id,['post_id']:post_id}};
 	axios.post(`${env.API_URL}/users/comment/create`,data,{headers: {"Authorization" : `Bearer ${Users.access_token}`}})
      .then(res => {
      	if (res.data.status==200) {
      		data={...data,...{['name']:Users.user.name,['id']:res.data.data.insertId,['status']:'Active',['updated_at']:null}};
      		let new_data=commentcon.concat(data);
      		setcommentcon(new_data);
      	}
      	if (res.data.status==422) {
      		setError(res.data.error);
      		
      	}
      	if (res.data.status==403) {
      		localStorage.removeItem('user_data');
      		history.push('/login');
      		
      	}
     });
 }
 const handleChange =(value,key) =>{
 	setFormdata({...Formdata,...{[key]:value}});

 }

return (
<div>
	<form onSubmit={handleSubmit}>
<div className="mb-3">

<textarea className="form-control" placeholder="comment"   onChange={(e)=>{handleChange(e.target.value,'comment')}}></textarea>
<div className='text-right'>
<button  type='submit'>send</button>
</div>
</div>
</form>
</div>
);
}

export default CreateComment;