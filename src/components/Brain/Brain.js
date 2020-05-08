import React from 'react'
import Logo from '../Logo/Logo'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../FaceRecognition/FaceRecognition'
import Rank from '../Rank/Rank'


export default function Brain({handleChange,box,imageUrl,handleSubmit}) {
    return (
        <div>
            
                <Logo /> 
       <Rank />
       <ImageLinkForm inputChange ={handleChange} onSubmit={handleSubmit}/>
      <FaceRecognition box={box} imageUrl={imageUrl} />
             
        </div>
    )
}
