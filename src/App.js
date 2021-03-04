import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from "./components/SignIn/SignIn";
import Register from './components/Register/Register';
import './App.css';


const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

function App() {

  const [input, setInput] = useState(initialState.input);
  const [imageUrl, setImageUrl] = useState(initialState.imageUrl);
  const [box, setBox] = useState(initialState.box);
  const [route, setRoute] = useState(initialState.route);
  const [isSignedIn, setIsSignedIn] = useState(initialState.isSignedIn);
  const [user, setUser] = useState(initialState.user);



  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
    }
    );
  }


  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box1) => {
    console.log(box1);
    setBox(box1);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  }

  const onSubmit = () => {

    setImageUrl(input);

    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    }).then(response => response.json())
      .then((response) => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          }).then(response => response.json())
            .then(count => {
              console.log(count.entries);
              setUser(Object.assign(user, { entries: count.entries }));
            }).catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        console.log(err);
      });

  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      setBox(initialState.box);
      setImageUrl(initialState.imageUrl);
      setInput(initialState.input);
      setIsSignedIn(initialState.isSignedIn);
      setRoute(initialState.route);
      setUser(initialState.user);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  }

  return (
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home' ?
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div> : (
          route === 'signin' ? <SignIn onRouteChange={onRouteChange} loadUser={loadUser} /> :
            <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );

}

export default App;
