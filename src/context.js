//context(warehouse(where everything we need is stored we just need to order))
//Provider(delivery Boy(if and delivery boye will be present then only we will receive our order))
//Consumer/(useContext) (you/me/us)
import React, { useContext, useEffect, useState } from "react";

export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;
//We will use the    &s=Titanic    in the useEffect because it is nothing but search query
//So as we used the env to hide our data,we need to use ${process.env.REACT_APP_} to get the API data
//https://www.omdbapi.com/?apikey=727bbdc1&s=titanic

const AppContext = React.createContext();

//Since delivery Partner should be available everywhere so
//We need to Wrap all the things present in index with this |||||Approvider
//we need to create a provider function

const AppProvider = ({ children }) => {
  //state
  const [isloading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [iserror, setIserror] = useState({ show: "false", msg: "" });
  const [query, setQuery] = useState("titanic");

  const getMovie = async (url) => {
    setIsLoading(true)
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setMovie(data.Search);
        setIsLoading(false);
        setIserror({
          show: false,
          msg: "",
        });
      } else {
        setIserror({
          show: true,
          msg: data.Error,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovie(`${API_URL}&s=${query}`);
      //since we will add the search query here so we need to keep this inside``
    }, 1000);

    return () => clearTimeout(timerOut);
    //we need to return the setTimeout inside clearTimeout so that it donot request the API everytime we type anything
  }, [query]);
  //we need to pass the query inside the[] because we need to update the array as the query get changed
  return (
    <AppContext.Provider value={{ isloading, iserror, movie, query, setQuery }}>
      {/* the value gives what data we want from the context(warehouse) */}
      {children}
      {/* children spelling should be exactly like this and this childern is for getting all the childern values */}
    </AppContext.Provider>
  );
};

//global custom hooks
//      We created this so that we need not call the AppProvider again and again everywhere

const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider, useGlobalContext };
