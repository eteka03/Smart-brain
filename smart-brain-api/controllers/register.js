//register controller

const  handleRegister = (req,res,db,bcrypt)=>{
    const {email,pwd , name} = req.body;

    if(!email || !pwd || !name){
        return res.status(400).json('incorrect form submission')
    }
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
    .catch(err => res.status(400).json({'ERROR':err,'env':process.env.DATABASE_URL}))
    

    
   
}

module.exports = {
    handleRegister:handleRegister
}

