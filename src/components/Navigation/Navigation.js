import React from 'react'

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

export default function Navigation() {
    const classes = useStyles()


    return (
      <AppBar position="static" className={classes.appbar}>
          <Toolbar className={classes.toolbar}>

            <Button className={classes.button}>Sign out</Button>
          </Toolbar>
      </AppBar>
    )
}
