import React, { useState } from 'react'
import './AddNote.css'
import {useHistory} from "react-router-dom"
import config from '../config';
import PropTypes from 'prop-types'

export default function AddNote({folders, setNotes}) {
    const [name, setNoteName] = useState('');
    const [content, setNoteContent] = useState('');
    const [error, setError] = useState(false);
    const [folderid, setFolder] = useState(folders[0].id)
    let history = useHistory();
    const validateNoteName = () => {
        const notename = name.trim();
        if (notename.length === 0) {
          return 'A note name is required';
        }
    };
    const handleAddNotes = (event) => {
        event.preventDefault()
        let today = new Date(),
            modified = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

            console.log('modified', modified)
        fetch(`${config.API_ENDPOINT}/notes`,  {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({name,modified,folderid: folderid,content})
        })
        .then(resp => resp.json())
        .then(data => {
            setNotes(data)
            setError(false)
            history.push(`/`)
        })
        .catch(function(error){
            setError(true)
            console.log(error)
        })

        
    }
    
  return (
    
    <form onSubmit={ (event)=>{handleAddNotes(event)} }>
        <h3 style={{color: "white", marginBottom: "5px"}}>Add a New Note:</h3>
        <h3>Name:</h3>
        <input type="text" name="notename" onChange={(event) => setNoteName(event.target.value)} /><br/>
        <h3>Content:</h3>        
        <textarea rows="10" cols="25" name="notename" onChange={(event) => setNoteContent(event.target.value)} /><br/>        
        <h3>Folder:</h3>
        <select placeholder="Select Folder" value={folderid} onChange={(event)=>{setFolder(event.target.value)}}>
            {
                folders.map((folder)=>{
                    return <option key={folder.id} value={folder.id}>{folder.name}</option> 
                })
            }
        </select>
        <br/>
        <input disabled={validateNoteName()} type="submit" value="Submit" />
        {error && <h1>An Error has occured</h1>}
    </form> 
  )
}
AddNote.propTypes = {
    setNotes: PropTypes.func.isRequired,
    folders: PropTypes.array.isRequired
}