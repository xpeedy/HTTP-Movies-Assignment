import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";



const initialState = {
    title:"",
    director:"",
    metascore:"",
    stars: [],
}


const UpdateForm = (props) => {
    const {push} = useHistory();
    const [ state, setState ] = useState(initialState);
    const { id } = useParams();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setState(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const handleChanges = (evt) => {
        evt.persist();
        setState({...state,[evt.target.name]: evt.target.value})
    };

    const submit = (evt) => {
        evt.preventDefault();
        axios
        // .put(`http://localhost:5000/api/update-movie/${id}`)
        .put(`http://localhost:5000/api/movies/${id}`, state)
        .then(res => {
            console.log(res)
            console.log(res.data)
            props.setUpdateList(!props.updateList)
            // props.setMovieList(res.data)
            push(`/`)
        })
        .catch(err => {
            console.log(err)
        })
    }
    

    return(
        <>
        <form onSubmit={submit}>
            <label htmlFor="title" >Title
                <input type="text" name="title" value={state.title} onChange={handleChanges} />
            </label>
            <br/>
            <label htmlFor="director">Director
                <input type="text" name="director" value={state.director} onChange={handleChanges} />
            </label>
            <br/>
            <label htmlFor="metascore">Metascore
                <input type="text" name="metascore" value={state.metascore} onChange={handleChanges} />
            </label>
            {/* <br/>
            <label htmlFor="stars">Stars
                <input type="text" name="stars" value={state.stars} onChange={handleChanges} />
            </label> */}
            <button>save</button>
        </form>
        </>
    )
}

export default UpdateForm;