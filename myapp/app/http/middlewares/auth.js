var jwt = require('jsonwebtoken');

function auth(req, res, next) {
	let token='';
	let header_authorization=req.headers.authorization ?? req.headers.Authorization ?? req.body.headers.Authorization ??  req.body.headers.authorization;
	if (header_authorization !=null) {
		let authorization_array = header_authorization.split(" ");
   	    token =authorization_array[1];
	}
	//console.log(header_authorization);
   	
   	jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
	  if (err) {
	   return res.json({'error':err,status:403}); 
	  }else{
	  	req.token_data=decoded;	  	
	  	return next();
	  }
	});

}

module.exports = auth