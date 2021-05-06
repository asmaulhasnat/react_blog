const db = require('../config/database');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
User = {
 async createUser(req,res,next){

      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;
      const { name, email, password }   = req.body;
	   db.query("select * from users where email='"+email+"'", function (error, results, fields) {
			  if (error) throw error;
			  if (results.length) {
			  	return res.json({'error':'Email already exits',status:422});
			  }else{
			  	 var sql = "INSERT INTO users (name, email,password) VALUES ('"+name+"', '"+email+"','"+password+"')";
				  db.query(sql, function (err, result) {	
				    if (err) throw err;
				    return res.json({'message':'Registration successfull',status:200});
				  });
			  }

		 });
     
   },
   login(req,res,next){


	   db.query("select * from users where email='"+req.body.email+"' limit 1", function (error, results, fields) {
		if (error) throw error;
			  if (results.length) {
			  	 bcrypt.compare(req.body.password,results[0].password, function(error, isMatch) {
				    if (isMatch) {
				    	//return res.json({'message':'passwoerd match',status:200});

				    	let jwt_token = jwt.sign({
							  user_id: results[0].id
						}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
				    	return res.json({'message':'login attemts successfull',access_token:jwt_token,status:200,user:{id:results[0].id,name:results[0].name}});	

				    }else{
				    	return res.json({'error':'passwoerd did not  match',status:422});
				    }
				  });

			  }else{
			  	return res.json({'error':'Email does not exits',status:422});
			  }
			  

	   });	

	//return res.json({'error':'Email does not exits',status:422});
   },
   logout(){
   	
   }
};

module.exports=User;
