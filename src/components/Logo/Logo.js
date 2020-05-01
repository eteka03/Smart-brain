import React from 'react'

import Tilt from 'react-tilt'

import  './Logo.scss'
import brain from './brain.png'

export default function Logo() {
    return (
        <div className="logo-div" >
        <Tilt className="Tilt" options={{ max : 25 }} style={{borderStyle:'solid',boxShadow:'2px 5px', height: 150 , width:250 }} >
           <img style={{objectFit:'contain',paddingTop:10}} alt="logo" title="brain" src={brain} />
         </Tilt>
        </div>
    )
}
