const db = require('../config/database');
//var jwt = require('jsonwebtoken');

Comment = {
 async getUsersComment(req,res,next){
	   db.query("select * from comments where user_id='"+req.token_data.user_id+"'", function (error, results, fields) {
			  if (error) throw error;
			  	return res.json({'message':'Post',data:results,status:200});
		 });
     
   },
   async getComment(req,res,next){
	   db.query("select comments.*,users.name from comments join users on users.id=comments.user_id where post_id='"+req.body.post_id+"'", function (error, results, fields) {
			  if (error) throw error;
			  	return res.json({'message':'Comment',data:results,status:200});
		 });
     
   },
   
  async  createComment(req,res,next){

	   	var sql = "INSERT INTO comments  (user_id, post_id,parent_id,comment,status,created_at,updated_at) VALUES ('"+req.token_data.user_id+"', '"+req.body.post_id+"','"+req.body.parent_id+"','"+req.body.comment+"','Active',now(),now())";
					  db.query(sql, function (error, result) {	
	    if (error) throw error;
	    return res.json({'message':'Comment created successfull',data:result,status:200});
	});

   },
   async editComment(req,res,next){
	   db.query("select * from comments where user_id='"+req.token_data.user_id+"' and id='"+req.body.id+"'", function (error, results, fields) {
			  if (error) throw error;
			  	return res.json({'message':'Comment',data:results,status:200});
		 });
     
   },
   async updateComment(req,res,next){
	   db.query("Update comments set comment='"+req.body.comment+"' , status='"+req.body.status+"' where user_id='"+req.token_data.user_id+"' and id='"+req.body.id+"'", function (error, result) {
			  if (error) throw error;
	    return res.json({'message':'Post Updated successfull',status:200});
		 });
     
   },
   async deleteComment(req,res,next){
	   db.query("Delete   from comments   where user_id='"+req.token_data.user_id+"' and id='"+req.body.id+"'", function (error, result) {
		if (error) throw error;
	    return res.json({'message':'Comment deleted successfull',status:200});
		});
     
   }
};

module.exports=Comment;
