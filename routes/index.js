var express = require('express');
const req = require('express/lib/request');
const mongoose=require('mongoose') 
const router=express.Router()
var books=require("../models/books.table")
var users=require("../models/users.table")
var md5=require('md5')

/* GET home page. */
router.get("/",(req,res)=>{
  if(req.session.userid)
  {
  books.find({},(error,response)=>{
    res.render('index',{data:response,title:"Library Manager",role:req.session.role});
  });
  }
  else
  {
    res.redirect("/login");
  }
});

router.get("/login",(req,res)=>{
  if(!req.session.userid){
    res.locals.x='/login';
    res.render('login',{title:"Login"});
  }
  else
  res.redirect("/");
})

router.post("/login",(req,res)=>{
  users.find({user_name:req.body.username,password:md5(req.body.userpass)},(err,response)=>{
    if(response.length==0)
      {
        res.render("login",{err:"Y",title:"Login"})
      }
    else
    {
      req.session.role=response[0].role;
      req.session.userid=req.body.username;
      res.redirect("/");
    }
  })
})

router.get("/register",(err,res)=>{
  res.locals.x='/register';
  res.render("register",{title:"Registration"});
})


router.post("/register",(req,res)=>{
  req.session.userid=req.body.username;
  let user_table=new users({
    user_name:req.body.username,
    password:md5(req.body.userpass),
    phone_number:req.body.userphno,
    role:"Customer"
  })
  user_table.save((err,response)=>{
    if(err)
    console.log(err)
    else{
        res.redirect('/');
    }   
  })
})
router.get("/logout",(req,res)=>
{
  req.session.destroy();
  res.redirect("/login");
  
})
module.exports = router;
