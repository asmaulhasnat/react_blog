const User = require('../../models/User')

function authController() {
    return {
        login(req, res, next) {
          
            const { email, password }   = req.body
            if(!email || !password) {
                return res.json({ error: 'All fields are required',status:422 });
            }
            return User.login(req, res, next);

           
        },
      async Register(req, res, next) {

         const { name, email, password }   = req.body
         if(!name || !email || !password) {
             return res.json({ error: 'All fields are required',status:422 });
         }

         return User.createUser(req,res, next);

        },
        logout(req, res) {
         return res.json({ message:'Logout',status:200 });
        }
    }
}

module.exports = authController