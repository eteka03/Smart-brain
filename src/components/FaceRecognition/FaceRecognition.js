import React from 'react'
import  './facerecognition.scss'

export default function FaceRecognition({imageUrl,box}) {
    return (
        <div className="face-div">
            <div style={{position:'relative' }}> 
                 {   imageUrl !== -1 ? <img height="auto" width="500px" id="inputImage" alt="nothing to show" title="" src={imageUrl}/> : ''}
            <div  style={{left:box.leftCol,top:box.topRow,right:box.rightCol,bottom: box.bottomRow}} className="bounding-box"></div>
            </div>
        </div>
    )
}
