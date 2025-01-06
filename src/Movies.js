import React from 'react'
import { useGlobalContext } from './context'
import { NavLink } from 'react-router-dom'

const Movies = () => {
  const {movie, isLoading} = useGlobalContext()
  return (
    <>
    {movie.map((currMovie) => {
      if (isLoading) {
        return (
          <section className="movie-section ">
            <div className="loading">Loading....</div>;
          </section>
        );
      }
      return <div>
        <section className=' movie-page'>
          <div className='container grid grid-4-col'>{movie.map((currMovie) => {
            const {imdbID,Title,Poster} = currMovie
            const movieName = Title.substring(0,15)//for showing ... instead of fullname
            return(
              
              <NavLink to={`movie/${imdbID}`} key={imdbID}>
                <div className='card'>
                  <div className='card-info'>
                    <h2>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                    <img src={Poster}/>
                  </div>
                </div>
              </NavLink>
            )
          })}</div>
        </section>
      </div>
    }) }
    </>
  )
}

export default Movies