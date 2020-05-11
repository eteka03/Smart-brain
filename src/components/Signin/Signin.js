import React,{useState,useRef} from 'react'
import './Signin.scss'

import {useHistory,Link} from 'react-router-dom'

//boostrap stuff
import {
     Button,
    Form,
    
} from 'react-bootstrap'

//mui stuff
import Typography from '@material-ui/core/Typography'

export default function Signin({handleUser}) {

    let history = useHistory()
    const [email,setEmail] = useState('')
    const [pwd,setPwd] = useState('')
 

    const handleChange = e => {
      if(e.target.type === "email"){    
         setEmail(e.target.value)
      }
      else{
        setPwd(e.target.value)
      }
    }

    const verifyIdentity = (e) => {
      e.preventDefault()

      fetch('http://localhost:8000/signin',{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,pwd})
      })
      .then(resp => resp.json())
      .then(data => {
        if(data === 'sucess'){
         handleUser('eteka')
        }
        else{
         alert('error')
        }
      })
      .then(()=>history.push('/brain/eteka'))
      .catch(err => console.log('error',err))
    }

    return (
        <div style={{display:'flex',justifyContent:'center',padding:'10px'}}>
            <Form style={{textAlign:'center',width:"40%",padding:'10px',boxShadow:'black 0px 0px 40px -13px'}}>
<Typography variant="h3" >Sign In</Typography>
  <Form.Group controlId="formBasicEmail">
    <Form.Label >Email</Form.Label>
    <Form.Control onChange={handleChange} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control onChange={handleChange} type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button onClick={verifyIdentity} variant="primary" type="submit">
   Sign in
  </Button>
  <Link to="/signup">
      <a style={{display:'block',textAlign:"center"}}>Register</a>
      </Link>
</Form>
        </div>
    )
}
