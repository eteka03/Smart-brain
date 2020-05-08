import React from 'react'

import {useHistory,Link} from 'react-router-dom'
//mui 
import { makeStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Button,
    Toolbar
} from '@material-ui/core'




const useStyles = makeStyles({

    appbar:{
        backgroundColor:'transparent',
        boxShadow:'none'
    },
    toolbar:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    button:{
        '&:hover':{
            backgroundColor:'white'
        },
        backgroundColor:'red',
       
    }
})

export default function Navigation({isAuthenticated,handleAuthentication,showLogin}) {
    const classes = useStyles()
    
    let history = useHistory()
    return (

      <AppBar position="static" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>

            {isAuthenticated ? <Button>Sign Out</Button>
                :

            (<><Button onClick={()=>history.push("/signin")}>Sign In</Button>
             <Button onClick={()=>history.push("/signup")}>Sign Up</Button></>)
        }
          </Toolbar>
      </AppBar>
    )
}
