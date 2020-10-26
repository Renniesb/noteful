import React, { useState } from 'react';
import './AddFolder.css'
import {useHistory} from "react-router-dom"
import config from '../config';
import PropTypes from 'prop-types';

export default function AddFolder({setFolders}) {
    const [name, setFolderName] = useState('');
    const [error, setError] = useState(false);
    let history = useHistory();
    const validateFolderName = () => {
        const foldername = name.trim();
        if (foldername.length === 0) {
          return 'A folder name is required';
        }
    }
    const handleAddFolder = (event) => {
        event.preventDefault()
        fetch(`${config.API_ENDPOINT}/folders`,  {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name})
        })
        .then(resp => resp.json())
        .then(data => {
            setFolders(data)
            setError(false)
            history.push(`/`)
        })
        .catch(function(error){
            setError(true)
            console.log(error)
        })

        
    }
    
  return (
    <form onSubmit={ (event)=>{handleAddFolder(event)} }>
        <h3 style={{color: "white", marginBottom: "5px"}}>Add a New Folder:</h3>
        <input type="text" name="foldername" onChange={(event) => setFolderName(event.target.value)} /><br/>        
        <input disabled={validateFolderName()} type="submit" value="Submit" />
        {error && <h1>An Error has occured</h1>}
    </form> 
  )
}

AddFolder.propTypes = {
    value: PropTypes.array.isRequired
}