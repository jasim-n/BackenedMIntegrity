const mongoose =require('mongoose')

const User = new mongoose.Schema({
 
  email: {
    type: String,
  },
  name:{type:String},
  password: {
      type: String,
     
      
    }
});
const Message = new mongoose.Schema({
    name: {
      type: String,
      
    },
    phoneNumber: {
      type: String,
     
    },
    email: {
      type: String,
       
    },
    message: {
        type: String,
       
        
      }
  });
  var Messages = mongoose.model("Message", Message);
const Users=mongoose.model('userdata',User)

module.exports.Users = Users;
module.exports.Messages = Messages;