import React from 'react'

import './Rank.scss'
//mui stuff
import {
    Typography,
    makeStyles
}from '@material-ui/core'



const usestyles = makeStyles({
    typography:{
        fontWeight:'700',
        color:'white',
        fontSize:'1.5rem',
    },
    rank:{
                
            color:'white',         
            paddingTop:'0.5rem'
    }
})

export default function Rank({user,entries}) {
    const classes = usestyles()
    return (
        <div className={`${classes.rank}  rank-div`}>
          <Typography className={classes.typography} align="center" variant='h4' >{`${user.name}, your current rank is...`}</Typography>  
    <Typography className={classes.typography} align="center" variant='h5'>{entries}</Typography>
        </div>
    )
}
