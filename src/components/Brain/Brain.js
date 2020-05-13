import React from 'react'
import Logo from '../Logo/Logo'
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm'
import FaceRecognition from '../FaceRecognition/FaceRecognition'
import Rank from '../Rank/Rank'


export default function Brain({user,entries,handleChange,box,imageUrl,handleSubmit}) {
   
    return (
   
        <div>
           
                <Logo /> 
       <Rank user={user} entries={entries} />
       <ImageLinkForm inputChange ={handleChange} onSubmit={handleSubmit}/>
      <FaceRecognition box={box} imageUrl={imageUrl} />
             
        </div>
    )
}
