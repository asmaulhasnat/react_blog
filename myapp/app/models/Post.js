const db = require('../config/database');
//var jwt = require('jsonwebtoken');

Post = {
 async getUsersPost(req,res,next){

 	   let Records_Per_page= req.body.perpage ?? 2;
 	   let page_Number= req.body.page_Number ?? 1;
       let offset_value = (page_Number-1) * Records_Per_page;		
	   db.query(`SELECT posts.*,users.name,COUNT(comments.id) as count_comment from posts JOIN users ON users.id=posts.user_id LEFT JOIN comments on comments.post_id=posts.id where posts.user_id='${req.token_data.user_id}' GROUP by posts.id  ORDER BY posts.id ASC limit ${Records_Per_page} OFFSET ${offset_value}`, function (error, results, fields) {
			  if (error) throw error;
			  	return res.json({'message':'Post',data:results,status:200});
		 });
     
   },
   async getPost(req,res,next){
   	   let Records_Per_page= req.body.perpage ?? 2;
 	   let page_Number= req.body.page_Number ?? 1;
       let offset_value = (page_Number-1) * Records_Per_page;	
	   db.query(`SELECT posts.*,users.name,COUNT(comments.id) as count_comment from posts JOIN users ON users.id=posts.user_id LEFT JOIN comments on comments.post_id=posts.id where posts.expiration_date>=CURRENT_DATE() AND posts.post_status='active' GROUP by posts.id ORDER BY posts.id ASC limit ${Records_Per_page} OFFSET ${offset_value}`, function (error, results, fields) {
			  if (error) throw error;
			  	return res.json({'message':'Post',data:results,status:200});
		 });
     
   },
   
  async  createPost(req,res,next){

	   	var sql = "INSERT INTO posts (user_id, post_title,post_description,post_status,expiration_date) VALUES ('"+req.token_data.user_id+"', '"+req.body.post_title+"','"+req.body.post_description+"','"+req.body.post_status+"','"+req.body.expiration_date+"')";
					  db.query(sql, function (error, result) {	
	    if (error) throw error;
	    return res.json({'message':'Post created successfull',data:result,status:200});
	});

   },
   async editPost(req,res,next){
	   db.query("select * from posts where user_id='"+req.token_data.user_id+"' and id='"+req.body.id+"'", function (error, results, fields) {
			  if (error) throw error;
			  	return res.json({'message':'Post',data:results,status:200});
		 });
     
   },
   async updatePost(req,res,next){
	   db.query("Update posts set post_title='"+req.body.post_title+"' , post_description='"+req.body.post_description+"' , post_status='"+req.body.post_status+"' ,expiration_date='"+req.body.expiration_date+"'  where user_id='"+req.token_data.user_id+"' and id='"+req.body.id+"'", function (error, result) {
			  if (error) throw error;
	    return res.json({'message':'Post Updated successfull',status:200});
		 });
     
   },
   async deletePost(req,res,next){
	   db.query("Delete   from posts   where user_id='"+req.token_data.user_id+"' and id='"+req.body.id+"'", function (error, result) {
		if (error) throw error;
	    return res.json({'message':'Post deleted successfull',status:200});
		});
     
   }
};

module.exports=Post;
