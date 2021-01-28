import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


const intialValues = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
  }

const AddMovieForm = ({updateList,setUpdateList}) => {
    const { push } = useHistory()
    const [values, setValues] = useState(intialValues)

    const handleChnages = (evt) => {
        setValues({...values,[evt.target.name]: evt.target.value})
    }

    const addActors = (evt) => {
        evt.preventDefault();
        setValues({...values.stars.push(evt.targe.value)})
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        const newMovie = {...values}
        axios
        .post(`http://localhost:5000/api/movies`, newMovie)
        .then(res => {
            console.log(res)
            setUpdateList(!updateList)
            push("/")
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title
                <input type="text" name="title" value={values.title} onChange={handleChnages}/>
            </label>
            <br/>
            <label htmlFor="director">Director
                <input type="text" name="director" value={values.director} onChange={handleChnages}/>
            </label>
            <br/>
            <label htmlFor="metascore">Metascore
                <input type="text" name="metascore" value={values.metascore} onChange={handleChnages}/>
            </label>
            <br/>
            <label htmlFor="stars">Stars
                <input type="text" name="stars" value={values.stars} onChange={handleChnages}/>
                <button onClick={addActors}>add Actor</button>
            </label>
            <br/>
            <button>add movie</button>
        </form>
        </>
    )
}

export default AddMovieForm;