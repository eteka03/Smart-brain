const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')


const app = express()


//middleware
app.use(express.json())
app.use(cors())


//dummy database
const database ={
    users: [
        {
            id:"123",
            name:'lucia',
            email:'lucia@gmail.com',
            pwd:'lucia',
            entries:0,
            joined:new Date()
        },
        {
            id:"1234",
            name:'naomi',
            email:'naomi@gmail.com',
            pwd:'naomi',
            entries:0,
            joined:new Date()
        },
       
    ],
    login:[
        {
            id:'987',
            hash:'',
            email:'lucia@gmail.com'
        }
    ]
}



//all routes
app.get('/',(req,res)=>{
    console.log(database.users)
    res.send(database.users)
})


app.post('/signin' ,(req,res)=>{
    const {email,pwd} = req.body

   
    const data = database.users
                    .filter(user => user.email === email)

          if(data.length > 0) {
                
            bcrypt.compare(pwd,data[0].pwd, function(err, result) {
                // result == true
                if(result){
                    res.json("sucess")
                }
                else{
                    res.status('400').json("fail logging")
                }
            })

                
            } else{
                res.status('400').json("fail logging")
            }

})

app.post('/register',(req,res)=>{
        const {email,pwd , name} = req.body;
        const saltRounds = 10      
        
    
     
        bcrypt.hash(pwd, saltRounds)
                .then(hash => {
            

          
            database.users.push({
                id:'12345',
                name:name,
                email:email,
                pwd:hash,
                entries:0,
                joined:new Date()
            })

            const duplicate = database.users[database.users.length - 1]

            res.status(200).json(duplicate)
        }).catch(err => res.status(500).json('something went wrong'));
    

       
        
       
})

app.get('/profile/:id' ,(req,res)=>{
    const {id} = req.params

   const response = database.users
                            .filter(user => user.id === id)

    if(response.length > 0 ){
       
        return res.json(response[0])
    }
    else{
        return res.status(404).json('not found')
    }
})

app.post('/image',(req,res)=>{

    const {id} = req.body

    const response = database.users
                             .filter(user => user.id === id)
 
     if(response.length > 0 ){
        database.users.forEach(user => {
            if(user.id === id){
                user.entries++
                return res.json(user.entries)
            }
        });
         
     }
     else{
         return res.status(404).json('not found')
     }
})


app.listen(8000,()=>{
    console.log('app running on port 8000')
})