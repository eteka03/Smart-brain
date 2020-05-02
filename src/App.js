import React,{useState,useEffect} from 'react';


//components
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'

//mui stuff
import Container from '@material-ui/core/Container';

//clarifai stuff
import Clarifai from 'clarifai'

import Particles from 'react-particles-js';

import './App.css';
import  './App.scss'



const particleParams = {
  particles:{
    number:{
      value:20,
      density:{
        enable:true,
        value_area:700
      }
    }
  }
}


//build new clarifai client
const app = new Clarifai.App({
  apiKey:'d9063d1088a24d228ee4dbfab177ca12'
})


function App() {

  const[ inputUrl ,setInputUrl]= useState(-1)
  const [imageUrl , setImageurl] = useState('')
  const [box,setBox] = useState('')

  const calculateFaceLocation = data => {
      const face = data.outputs[0].data.regions[0].region_info.bounding_box

      const image = document.getElementById('inputImage')
      
      const width = Number(image.width)
      const height = Number(image.height)

     return {
       leftCol: face.left_col * width,
       topRow: face.top_row * height,
       rightCol: width - (face.right_col *  width),
       bottomRow: height - (face.bottom_row * height)
     }
  }


  

 const displayFaceBox = box =>{ console.log(box);setBox(box)}

  const handleChange  = event => {
      setInputUrl(event.target.value || -1)
  }
  
  

  const handleSubmit = () => {
  if(inputUrl === -1){ alert("enter an image url")}
  else{
      setImageurl(inputUrl)

    app.models
        .predict(Clarifai.DEMOGRAPHICS_MODEL, 
              inputUrl
        )
        .then(response => {
          displayFaceBox(calculateFaceLocation(response))
       
        }   
      
         )
         .catch(err => console.log(err));
  }
   
  }

  return (
    <Container maxWidth="false" disableGutters
    >
    <div className="App">
      <Particles params={particleParams} className="particles" />
      <Navigation />
       <Logo /> 
       <Rank />
       <ImageLinkForm inputChange ={handleChange} onSubmit={handleSubmit}/>
      <FaceRecognition box={box} imageUrl={imageUrl} />

    </div>


    </Container>
  );
}

export default App;
