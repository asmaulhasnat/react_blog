import axios from 'axios'
import React, { useEffect ,useState,useContext } from 'react';
import Viewcomment from './Viewcomment'
import env from "react-dotenv";
import {UserContext,CommentContext} from './UserContext';
import Moment from 'moment';
import { useHistory } from 'react-router-dom';
function Home() {
const [posts,setPosts] =useState([]);	
const [commentPostId,setCommentPostId] =useState([]);	
const [Commetdata,setCommetdata] =useState([]);	
const [commentcon,setcommentcon]=useState([])
const {Users,setUsers} = useContext(UserContext);

const [perpage,setPerpage]=useState(localStorage.getItem('perpage') ?? 2)
const [pageno,setPageno]=useState(1);
const [hideLoad,setHideLoad]=useState(true);

const  [Formdata,setFormdata] =useState([]);	
const  [error,setError] =useState([]);
const history=useHistory();

 useEffect(() => {

    getPost(1,localStorage.getItem('perpage'));
  }, []);
 function showComment(post_id){
 	setCommentPostId(post_id);
 	axios.post(`${env.API_URL}/get-comment`,{post_id:post_id})
      .then(res => {
      	
      	setCommetdata(res.data.data);
      	setcommentcon(res.data.data);

   });

 }
 function hidComment(post_id){
 	setCommentPostId(0);
 }
 

 function getPost(page_Number=1,perpage=2){
 	axios.post(`${env.API_URL}/all-post`,{page_Number:page_Number,perpage:perpage})
      .then(res => {
      	setPosts(res.data.data);

    });

 }
  const handleSubmit =(e,post_info) =>{
 	e.preventDefault();
 	let data={...post_info,...Formdata};
 

 	axios.post(`${env.API_URL}/users/post/update`,data,{headers: {"Authorization" : `Bearer ${Users.access_token}`}})
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

 const handleLoad =(e) =>{
 	e.preventDefault();
 	let page_no =pageno+1;
 	console.log(page_no)
 	let data={page_Number:page_no,perpage:perpage}

 	axios.post(`${env.API_URL}/all-post`,data)
      .then(res => {
      	if (res.data.status==200) {
      		if (res.data.data.length==0) {
      			setHideLoad(false);
      		}
      		
      		let new_data=posts.concat(res.data.data);
      		setPosts(new_data);
      		setPageno(page_no);
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
 	if (key=='perpage') {
 		localStorage.setItem('perpage',value);	
 		getPost(1,value)
 	}

 }


  return (
    <div>
	    <div className='container mt-3'>
	    {
	    	 (posts.length>0) ?<form className="form-inline">
	    	<label htmlFor="perpage">Per page:</label>
	    	<select defaultValue={perpage}  onChange={(e)=>{handleChange(e.target.value,'perpage')}}>
	    	<option value='2'> 2 </option>
	    	<option value='5'> 5 </option>
	    	<option value='10'> 10 </option>
	    	<option value='20'>20</option></select>

	    	</form>:''
	    }
	    {	  

	    	    posts.map(data=>(
	    		<div className="card mt-3 bg-secondary" key={data.id}>
	    		<div className="card-header ">
	    		<div className='text-right'> Posted By : {data.name} <br/> Posted On : {Moment(data.created_at).format('d MMM YYYY')}</div>
			  </div>
			  <div className="card-body">
			    <blockquote className="blockquote mb-0">
			      <form onSubmit={(e) => {handleSubmit(e, data);}}>	
			      <p className='text-left'>Post Title : <input type='text' onChange={(e)=>{handleChange(e.target.value,'post_title')}} className='form-control' defaultValue={data.post_title}/> </p> 	
			      <p className='text-left'> Post Description : <textarea onChange={(e)=>{handleChange(e.target.value,'post_description')}} className='form-control' defaultValue={data.post_description}></textarea></p>
			      <div className='text-right'>
			      {(Users !=null && Users.user.id==data.user_id) ?<button >Save</button>:''}
			      </div>
			      </form>
			      <br/>	
			      {
			      	 commentPostId ==data.id ? <CommentContext.Provider value={{commentcon,setcommentcon}}><Viewcomment post_id={commentPostId}/></CommentContext.Provider>:''
			      }

			       <footer className="blockquote-footer">
		      	   {commentPostId !=data.id ? <button onClick={()=>showComment(data.id)}   className="btn btn-dark">Show</button>:''}
		      	   {commentPostId ==data.id ?<button onClick={()=>hidComment(data.id)}   className="btn btn-dark">Hide</button>:''}</footer>
			      
			    </blockquote>

			  </div>
			  </div>
	    		))
	    	}
	    	<br/>
	    	{
	    		(posts.length>0 && hideLoad ==true) ?(<button className='btn btn-primary' onClick={(e)=>{handleLoad(e)}}> Load More</button>) :''
	    	}
		  
		</div>
      
    </div>
  );

}

export default Home;