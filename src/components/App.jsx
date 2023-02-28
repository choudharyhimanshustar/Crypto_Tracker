/* App for tracking cryptocoins */
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './Header';
import Home from './Home';
import Coins from './Coins';
import { makeStyles } from '@material-ui/core';



function App() {
  /* Used react-router-dom for creating various pages. Like for eg, different page for home and different page for coins.
  <BrowserRouter/>,<Routes/> and <Route/> are all inside react-router-dom */


 const useStyles=makeStyles(()=>({
  App:{
    backgroundColor:'#14161a',
    color:'white',
    minHeight:'100vh',
    width:"100%"
  }
 }))

const appClass=useStyles();

  return (
    <BrowserRouter>
      <div className={appClass.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/coins/:id" element={<Coins />} />
        </Routes>

      </div>

    </BrowserRouter>

  )
}

export default App