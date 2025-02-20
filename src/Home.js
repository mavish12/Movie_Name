//import React, { useContext } from 'react'
//import { AppContext } from './context'      //since we already created a global function so we need not call the AppContext again and again instead we can us ethe global function everywhere we want
// import {useGlobalContext} from './context'
import React from "react";
import Movies from './Movies'
import Search from './Search'
const Home = () => {
  //const name = useContext(AppContext)  //accepts context object from context that is returned from React.createContext 

 
  return (
    <>
    {/* We need to show the search page and movies page inside this Home.js page */}
    <Search/>
    <Movies/>
   
    {/* This will give the data that the "value" inside AppContext will contain in the context.js*/}
    </>
  )
}

export default Home