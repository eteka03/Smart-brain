import React from 'react'

//mui stuff
import {
    Button,
    Input,
    Typography,
    makeStyles
} from '@material-ui/core'


import './imagelinkform.scss'

const usestyles = makeStyles({
    typography:{
        fontWeight:'600',
        fontSize:'1.3rem',
        lineHeight:'5'

    },
    input:{
        width:'75%',
        display:'block',
        marginLeft:'15%',
        marginBottom:'25px',
        paddingRight:'10px'
        
    },
    button:{
        '&:hover':{
            backgroundColor:'black',
            color:'white'
        },
        backgroundColor:'purple',
        width:'50%',
        
    }
})

export default function ImageLinkForm () {

    const classes = usestyles()

    return (
        <div className="imagelinkform-div">
            <Typography className={classes.typography}>
                {'This magic brain will detect faces in your pictures.Try it'}
            </Typography>

            <div className="input-div">
                <Input className={classes.input} type="text" style={{backgroundColor:'white',width:'75%'}}  placeholder="enter image url"/>
               <Button className={classes.button}> Detect</Button>
            </div>
        </div>
    )
}
