var mongoose=require('mongoose')

let rentSchema=new mongoose.Schema({
    user_name:String,
    book_id:String,
    phone_number:String
});

let rents=mongoose.model("Renters",rentSchema);

module.exports=rents;