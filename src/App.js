import React,{useState,useEffect} from 'react';

import {
BrowserRouter as Router,
Switch,
Route
} from 'react-router-dom'


//components
import Navigation from './components/Navigation/Navigation'
import Brain from './components/Brain/Brain'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'

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
  const [user,setUser] = useState('')
   const [entries,setEntries] = useState(0)

  const calculateFaceLocation = data => {
      const face = data.outputs[0].data.regions[0].region_info.bounding_box

      const image = document.getElementById('inputImage')
      
      const width = Number(image.width)
      const height = Number(image.height)

      console.log("face",face)
      console.log(height,width)
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
  
  const updateEntries = () => {
    fetch('https://lit-bastion-18332.herokuapp.com/image',{
        method:'put',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({id:user.id})
      })
      .then(resp => resp.json())
      .then(entries => {
        if(entries.length > 0){
         setEntries(entries[0])
        }
        else{
         alert('error')
        }
      })
      .catch(err => console.log('error',err))
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
         .then(()=>updateEntries())
         .catch(err => console.log(err));
  }
   
  }

  const handleUser = loaduser => {
    setEntries(loaduser.entries)
    setUser(loaduser)
  }

 
  return (

    <Router>
<Container maxWidth="false" disableGutters
    >
    <div className="App">
      <Particles params={particleParams} className="particles" />
        <Navigation />
</div>
</Container>
        <Switch>

          <Route path="/" exact >
            {()=><h1>welcome</h1>}
          </Route>
            <Route path="/signin">
              <Signin handleUser={handleUser} />
            </Route>

            <Route path="/signup">
                <Register handleUser={handleUser} />
            </Route>

            <Route path="/brain/:name">
            <Brain user={user} entries={entries} handleChange={handleChange} handleSubmit={handleSubmit} imageUrl={imageUrl} box={box}/>
            </Route>
        </Switch>

    </Router>

    
   
  );
}

export default App;




