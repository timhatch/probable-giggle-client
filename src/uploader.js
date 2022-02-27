import React, {useState}  from "react"
import axios              from 'axios'

import {useFileUpload}    from 'use-file-upload'

import Chip               from '@material-ui/core/Chip'
import Snackbar           from '@material-ui/core/Snackbar'

const BASE_URL = process.env.REACT_APP_API_ENDPOINT
const UI_DELAY = 5000

function UploadFiles({url}) {
  const [file, selectFile]    = useFileUpload()
  const [message, setMessage] = useState(null)

  const handleSelect = () => {
    const formData = new FormData()
    selectFile({accept: 'application/json'}, ({source, name, size, file}) => {
      console.log({source, name, size, file})
      formData.append("file", file)
      axios.post(BASE_URL + url, formData)
           .then((res) => setMessage('upload success'))
           .catch((err) => setMessage('upload failed'))

    })
  }

  return (
    <div>
      <Chip label='upload file' style={{width: '6rem'}} onClick={handleSelect} />
      <span style={{marginLeft: '1rem', fontSize: 'small'}}>{file ? file.name : 'no file selected'}</span>
      <ConnectionStatusMessage {...{message, setMessage}} />
    </div>    
  )
}

export default UploadFiles

// Snackbar to indicate send success/failure
function ConnectionStatusMessage({message, setMessage}) {
  const handleClose = () => setMessage(null)
  const displayBar  = message ? true : false
  return (
    <Snackbar open={displayBar} autoHideDuration={UI_DELAY} onClose={handleClose} message={message} />
  )
}
