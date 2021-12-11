import axios from "./axios"
import React,{useState,useEffect} from 'react'
import "./Row.css"
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl, isLargeRow}) {
    const [Movies, setMovies] = useState([])
    const [trailerUrl, setTrailerUrl] = useState("")
    useEffect(() => {
       async function fetchData() {
           const request=await axios.get(fetchUrl)
           setMovies(request.data.results)

          return request
       }
       fetchData()
      
    }, [fetchUrl])

    const opts = {
      height: "390",
      width: "100%",
      playerVars: {
        autoplay: 1,
      }
    }

    const handleClick = (movies) => {
      if(trailerUrl){
        setTrailerUrl('')
      }else {
        movieTrailer(movies.title || movies.name || movies.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch((error) => console.log(error))
      }
    }
    // console.log(setMovies)
    return (
        <div className="row">
           <h1>{title} </h1>
           <div className="row__posters">
        {Movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${ movie.poster_path }`}
            alt={movie.name}
          />
        ))}

      </div>
      <div style={{ padding: "40px"}}>
       {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>

        </div>
    )



}

export default Row
