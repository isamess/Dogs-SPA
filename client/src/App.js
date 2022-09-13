import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from './components/Home/Home'; 
import DogCreated from '../src/components/DogCreated/DogCreated';
import Details from './components/Details/Details'


function App() {
  return (
    <React.Fragment>
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path= "/" component= {LandingPage}></Route>
      <Route exact path= "/home" component= {Home}></Route>
      <Route path= "/dog" component= {DogCreated}></Route>
      <Route exact path= "/:id" component= {Details }></Route>
    </Switch>
    </div>
    </BrowserRouter> 
    </React.Fragment>
  );
}

export default App;
