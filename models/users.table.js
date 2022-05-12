var mongoose=require('mongoose')

let userSchema=new mongoose.Schema({
    user_name:String,
    password:String,
    phone_number:String,
    role:String
});

let user=mongoose.model("users",userSchema);

module.exports=user;