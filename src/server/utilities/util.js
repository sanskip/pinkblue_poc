
var jwt = require("jsonwebtoken");
 
var self = module.exports = {

    generateToken:function(userid){
      const payload = {
      user: userid 
    };
        var token = jwt.sign(payload, 'superSecret');
        
      return token;
    },
    verifyToken:function(token){
      
      try {
     
        var decoded = jwt.verify(token, 'superSecret');
        return true;
      } catch(err) {
        
        console.log(err)
        return false;
        
      }
    },
    responseSuccessObj:function(message,data){
      return {
        "success": {
        status:true,
        code:200,
        message:message,
        data:data
        }
      }

    },
    responseErrorObj:function(message,data){
      return {
          "error": {
          status:false,
          "code": 500,
          "message": message
          }
          }

    }
}