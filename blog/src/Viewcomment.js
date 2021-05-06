import axios from 'axios'
import React, { useEffect ,useState,useContext} from 'react';
import CreateComment from './CreateComment';
import {UserContext,CommentContext} from './UserContext';
import { useHistory } from 'react-router-dom';
import env from "react-dotenv";
import Moment from 'moment';
function Viewcomment({post_id}) {
const {commentcon,setcommentcon} = useContext(CommentContext);	
const {Users,setUsers} = useContext(UserContext);
const  [Formdata,setFormdata] =useState([]);	
const  [error,setError] =useState([]);
const history=useHistory();	


 const handleSubmit =(e,comment_info) =>{
 	e.preventDefault();
 	console.log(Formdata);
 
 	let data={...comment_info,...Formdata};
 	console.log(data);

 	axios.post(`${env.API_URL}/users/comment/update`,data,{headers: {"Authorization" : `Bearer ${Users.access_token}`}})
      .then(res => {
      	if (res.data.status==200) {
      		alert('Data Updated !');
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
    <div>{commentcon.length>0 ?(
    	commentcon.map((data, i)=>(
    		<div className="card" key={data.id}>
	    		<div className="card-header text-sm-right">
			    Comment by : {data.name} <br/> Comment On : {Moment(data.created_at).format('d MMM YYYY')}
			 	</div>
			 	<div className="card-body text-left">
				 	<form  onSubmit={(e) => {handleSubmit(e, data);}}>
				 	<textarea className='form-control' onChange={(e)=>{handleChange(e.target.value,'comment')}}  defaultValue={data.comment}></textarea>
				 	<div className='text-right'>
				 	{(Users !=null && Users.user.id==data.user_id) ?<button >Save</button>:''}
				 	</div>
				 	</form>

			 	</div>
			 	{commentcon.length==(i+1) ? <CreateComment post_id={data.post_id}/>:''}
			</div>

     ))):(<div className="card">
	    		<div className="card-header">
			    Comment by : Me
			 	</div>
			 	<div className="card-body">
			 	<p></p>
			 	</div>
			 	<CreateComment post_id={post_id}/>
			</div>)
    }
    	

      
    </div>
  );

}

export default Viewcomment;