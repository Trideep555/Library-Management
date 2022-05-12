var mongoose=require('mongoose')

let booksSchema=new mongoose.Schema({
    book_name:String,
    book_id:String,
    avalaibility:String
});

let books=mongoose.model("Books",booksSchema);

module.exports=books;