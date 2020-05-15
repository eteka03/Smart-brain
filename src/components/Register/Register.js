import React,{useState} from 'react'

import {useHistory,Link} from 'react-router-dom'
//boostrap stuff
import {
    Button,
   Form,
   
} from 'react-bootstrap'


//mui stuff
import Typography from '@material-ui/core/Typography'


export default function Register({handleUser}) {

    let history = useHistory()
    const [email,setEmail] = useState('')
    const [pwd,setPwd] = useState('')
    const [name,setName] = useState('')
    
    const handleChange = e => {
        if(e.target.type === "email"){    
           setEmail(e.target.value)
        }
        else if(e.target.type === "password"){
          setPwd(e.target.value)
        }else{
            setName(e.target.value)
        }
      }

      const registrer = e =>{
          e.preventDefault()

          fetch('https://lit-bastion-18332.herokuapp.com/register',{
              method:'post',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({email,pwd,name})
          })
          .then(resp => resp.json())
          .then(user => {
            if(user.id){
             handleUser(user)
             history.push(`/brain/${user.name}`)
            }
            else{
             alert('error')
            }
          })
          .catch(err => console.log('error',err))
      }


    return (
        <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
        <Form style={{textAlign:'center',width:"40%",padding:'10px',boxShadow:'black 0px 0px 40px -13px'}}>
<Typography variant="h3" >Register</Typography>
<Form.Group controlId="formBasicEmail">
<Form.Label >Email</Form.Label>
<Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
<Form.Text className="text-muted">
  We'll never share your email with anyone else.
</Form.Text>
</Form.Group>

<Form.Group controlId="formName">
<Form.Label >Name</Form.Label>
<Form.Control onChange={handleChange} type="text" placeholder="Enter name" />
</Form.Group>


<Form.Group controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control onChange={handleChange} type="password" placeholder="Password" />
</Form.Group>
<Form.Group controlId="formBasicCheckbox">
<Form.Check type="checkbox" label="Check me out" />
</Form.Group>
<Button onClick={registrer} variant="primary" type="submit">
Sign in
</Button>

</Form>
    </div>
    )
}
