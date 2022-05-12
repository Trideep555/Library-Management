const express=require('express')
const path=require('path')
const mongoose=require('mongoose') 
const router=express.Router()
var rent=require("../models/rent_table")
var books=require("../models/books.table")
var users=require("../models/users.table")

router.get("/:id",(req,res)=>{
    if(req.session.userid){
    if(req.params.id!="return")
    {
    books.find({book_id:req.params.id},(err,response)=>{
        if(response.length!=0)
        res.render('rent_books',{id: response[0].book_id,title:"Rent Books"});
        else
        res.redirect("/");
        
    });
    }
    else
    {
        books.find({book_id:req.params.id},(err,response)=>{
            res.render('return_books',{title:"Return Books"});
        });
    }
}
else
        res.redirect("/login");
})


router.post("/:id",(req,res)=>{
    if(req.session.userid){
    if(req.params.id!="return")
    {
    let renter=new rent({
        user_name:req.body.name,
        book_id:req.body.id,
        phone_number:req.body.phno
    });
    books.update({book_id:req.body.id},{avalaibility:"No"},(err,response)=>{
        if(err)
        console.log(err);
    })
    renter.save((err,response)=>{
        if(err)
        console.log(err)
        else{
            res.redirect('/');
        }
        
    })
    }
    else{

        books.find({book_id:req.body.bookid},(err,response)=>{
            if(response.length==0)
            {
                res.render("return_books",{message:"w",title:"Return Books"});
                return;
            }
            
            rent.find({book_id:req.body.bookid},(err,response2)=>{
            if(response2.length==0){
            res.render("return_books",{message:"r",title:"Return Books"});
            return;
            }
            rent.find({user_name:req.session.userid},(err,response3)=>{
                if(response3.length==0)
                {
                    res.render("return_books",{message:"n",title:"Return Books"});
                    return;
                }    
                
            rent.deleteOne({book_id:req.body.bookid},(err,response)=>{
            console.log("Deleted");
            })
            books.update({book_id:req.body.bookid},{avalaibility:"Yes"},(err,response)=>{
            if(err)
            console.log(err);
            else{
                res.redirect('/');
            }
        })
        })
    })
    })
}
    }
    else
        res.redirect("/login");
    })



module.exports=router;