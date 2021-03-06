require('dotenv').config()
const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')

//controllers
const register = require('./controllers/register')


//registering env
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//database connection
const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
        ssl:false,
    }
  });





const app = express()


//middleware
app.use(express.json())
app.use(cors())






//all routes
app.get('/',(req,res)=>{
   
    res.end('yes')
})


app.post('/signin' ,(req,res)=>{
    const {email,pwd} = req.body

    db.select('email','hash')
        .from('login')
        .where('email','=',email)
        .then(data => {
            
        const isValid = bcrypt.compareSync(pwd, data[0].hash);

      
        if(isValid){
         return  db.select('*').from('users')
                .where('email','=',email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
        }
        else{
          return  res.status(400).json('wrong crednetials')
        }

        })
        .catch(err => res.status(400).json('wrong credentials'))
    


})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id' ,(req,res)=>{
    const {id} = req.params

   db.select('*')
   .from('users')
   .where({id})
   .then(user => {
       if(user.length){
      res.json(user[0])
       }else{
           res.status(400).json('error getting user')
       }
   })
   .catch(err => console.log('error'))
})

app.put('/image',(req,res)=>{

    const {id} = req.body

   db('users').where('id','=',id)
     .increment('entries',1)
     .returning('entries')
     .then(entries=>{
         res.json(entries)
     })
     .catch(err => res.status(400).json('unable to get entries'))
})


app.listen(process.env.PORT,()=>{
    console.log(`àpp runnin on port 8000 ${process.env.PORT}`)
})