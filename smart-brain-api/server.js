const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const knex = require('knex')


//database connection
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'eteka',
      password : 'eteka',
      database : 'smart-brain;'
    }
  });



const app = express()


//middleware
app.use(express.json())
app.use(cors())






//all routes
app.get('/',(req,res)=>{
   
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

app.post('/register',(req,res)=>{
        const {email,pwd , name} = req.body;
         const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(pwd, salt);

        db.transaction(trx => {
            trx.insert({
                hash:hash,
                email:email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {

              return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    name:name,
                    joined:new Date()
                })
                .then(user =>{
                    res.json(user[0])
                    
                })
              
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('unable to register'))
        
   
        
       
})

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


app.listen(8000,()=>{
    console.log('app running on port 8000')
})