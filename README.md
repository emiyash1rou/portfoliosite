# PORTFOLIO WEBSITE
## INSTALLATION
```
npm install express ejs body-parser mysql cookie-parser express-session
npm install -g nodemon
npm install --save-dev nodemon
npm install dotenv --save
npm install pg --save
```
###
Connecting to your database.
1. Paste this code to the index.js/app.js. Rename the database(in this case love is the database)
``` const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'love'
});
db.connect((err)=>{
    if (err) {
   console.log(err)
    }else{
        console.log("Connected to db")
    }
   
}) 
```
2. Ensure that the database exists in the mysql xampp.

