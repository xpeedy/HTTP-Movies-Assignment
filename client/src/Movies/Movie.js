import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, updateList, setUpdateList }) {
  const {push} = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();
  

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleEdit = () => {
    push(`/update-movie/${movie.id}`)
  }

  const handleDelete = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(res => {
      setUpdateList(!updateList)
      push("/")
    })
    .catch(err => {
      console.log(err)
    })

  }

  useEffect(() => {
    fetchMovie(params.id);
    console.log(params)
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleEdit}>update</button>
      <button onClick={()=>{handleDelete(movie.id)}}>delete</button>
    </div>
  );
}

export default Movie;
