import { NavLink, useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { API_URL } from "./context";
import { useEffect, useState } from "react";

const SingleMovie = () => {
  const { id } = useParams();
  console.log(id);

  const [isloading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.Response === "True") {
        setMovie(data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let timerOut = setTimeout(() => {
      getMovie(`${API_URL}&i=${id}`);
    }, 1000);

    return () => clearTimeout(timerOut);
  }, [id]);

  if (isloading) {
    return (
      <div className="movie-section">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <section className="movie-section">
        <div className="movie-card">
          <figure>
            <img src={movie.Poster} alt="" />
          </figure>
          <div className="card-content">
            <p className="title">{movie.Title}</p>
            <p className="card-text">{movie.Released}</p>
            <p className="card-text actors">Actors: {movie.Actors}</p>
            <p className="card-text">{movie.Genre}</p>
            <p className="card-text plot">{movie.Plot}</p>
            <p className="card-text">Rating: {movie.imdbRating}*</p>
            <p className="card-text">Produced in {movie.Country}</p>
            <NavLink className="back-btn" to="/">Go Back</NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleMovie;
