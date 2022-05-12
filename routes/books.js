const express=require('express')
const path=require('path')
const mongoose=require('mongoose') 
const router=express.Router()
var books=require("../models/books.table")

router.get("/",(req,res)=>{
    if(req.session.userid){
        res.render('add_books',{title:"Add Books"})
        }
        else
        res.redirect("/login");
})


router.get("/add",(req,res)=>{
    if(req.session.userid){
    res.render('add_books',{title:"Add Books"})
    }
    else
    res.redirect("/login");
})
router.post("/add",(req,res)=>{
    if(req.session.userid){
    
    books.find({book_name:req.body.name},(err,response)=>{
        if(response.length!=0)
        res.render('add_books',{message:"Book Already Exists",title:"Add Books"})
        else{
            let add=new books({
                book_name:req.body.name,
                book_id:req.body.id,
                avalaibility:"Yes"
            });
            add.save((err,add)=>{
                if(err)
                console.log(err)
                else{
                    res.render('add_books',{message:"Result Succesful",title:"Add Books"})
                }
                 });
                }
        
        })
    }
    else
    res.redirect("/login");
    });


router.get("/delete",(req,res)=>{
    if(req.session.userid)
    {
    books.findByIdAndDelete({_id:req.query.id},(err,response)=>{
        res.redirect('/');
    });
}
else
res.redirect('/login');
});


module.exports=router;