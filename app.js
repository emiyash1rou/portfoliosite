const express= require('express');
var bodyParser = require('body-parser');
var app = express();
const path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const { start } = require('repl');
const mysql= require('mysql');
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 5000;
// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!",saveUninitialized:true, resave: false}));

app.use(express.static(path.join(__dirname, '/public')));
// Postgres start
// const { Pool } = require('pg')
// const pool = new Pool({
//     host:"localhost",
//     user:"postgres",
//     port:"5432",
//     password:"admin1",
//     database:"portfoliowebsite",
//     // ssl: {
//     //   rejectUnauthorized: false
//     // }
//   })
  
//   pool.connect((err)=>{
//     if (err) {
//    console.log(err)
//     }else{
//         console.log("Connected to pgsql")
//     }

// })
// Postgres end

// mysql start
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'portfolio'
  });
  db.connect((err)=>{
      if (err) {
     console.log(err)
      }else{
          console.log("Connected to db")
      }
     
  })
//   mysql end
app.get("/user_homepage",(req,res)=>{
    if (req.session.userid!=null){
        const sql=`SELECT * FROM portfolio.projects;`
        db.query(sql, (err, results) => {
            if (results.length!=0){
                
            res.render("user_homepage",{projects:results,error:null})
        }else{
            res.render("user_homepage",{projects:null,error:null})
        }
        })
    }
  
    
    })
app.all("/signin",(req,res)=>{
    //check post
    if(req.method=="POST"){
        
        const params=req.body
        const sql= `SELECT id,username,fname,lname,contactno,email,role FROM users WHERE username="${params.username}" and password= "${params.password}"`
        db.query(sql,(err,results)=>{
            if (err) throw err;
            console.log(results)
            if (results.length==0){
                res.render("signin",{error:true})
 
            }else{
                var session=req.session
                session.userid={id:results[0].id}
                console.log("Signed In"+session)
                res.redirect("/user_homepage")
            }
        })
    }else{
        res.render("signin",{error:false})
    }
 
   
})
app.get("/projects",(req,res)=>{

    const sql=`SELECT * FROM portfolio.projects;`
    db.query(sql, (err, results) => {
        if (results.length!=0){

        res.render("projects",{projects:results,error:null})
    }else{
        res.render("projects",{projects:null,error:null})
    }
    })
   
    })

app.get("/main",(req,res)=>{
    res.render("landing")
    })

app.get("/",(req,res)=>{
    res.redirect("/main")
    })
app.listen(process.env.PORT || port, () => console.log(`Example app listening at http://localhost:${port}`));