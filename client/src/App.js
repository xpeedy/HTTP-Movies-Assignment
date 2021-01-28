import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateForm from "./Movies/UpdateMovie";

const App = () => {
  
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [updateList, setUpdateList] = useState(true);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [updateList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/" render={
        props => {
        return(<div><MovieList {...props} movies={movieList} /></div>)
        }
      }>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id" render={
        props => {
        return(<UpdateForm {...props} setMovieList={setMovieList} updateList={updateList} setUpdateList={setUpdateList}/>)
        }
      }>
      </Route>
    </>
  );
};

export default App;
