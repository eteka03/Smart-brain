import React from 'react';


//components
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'

//mui stuff
import Container from '@material-ui/core/Container';

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

function App() {
  return (
    <Container maxWidth="false" disableGutters
    >
    <div className="App">
      <Particles params={particleParams} className="particles" />
      <Navigation />
       <Logo /> 
       <Rank />
       <ImageLinkForm />
      <FaceRecognition />

    </div>


    </Container>
  );
}

export default App;
