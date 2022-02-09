import React, {useRef, useState}  from "react"
import axios                      from 'axios'

import Chip                       from '@material-ui/core/Chip'
import Button                     from '@material-ui/core/Button'
import Snackbar                   from '@material-ui/core/Snackbar'

const BASE_URL = process.env.REACT_APP_API_ENDPOINT
const UI_DELAY = 2000

function UploadForm({url}) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [message, setMessage]           = useState(null)

  const submitForm = () => {
    const formData = new FormData()
    formData.append("file", selectedFile)
    // console.log(selectedFile)
    axios
      .post(BASE_URL + url, formData)
      .then((res) => { 
        setMessage('file uploaded')
        setTimeout(() => setSelectedFile(null), UI_DELAY)
      })        
      .catch((err) => {
        setMessage('file upload error')
        setTimeout(() => setSelectedFile(null), UI_DELAY)
      }) 
  }

  const cancelForm = () => setSelectedFile(null)

  // TODO: Disable the buttons if no file is selected
  return (
    <div style={{width: '20rem', backgroundColor: 'azure', padding: '2rem'}}>
      <form>
        <FileUploader selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <Button variant="outlined" onClick={submitForm} style={{marginRight: '2rem'}}>submit</Button>
        <Button variant="outlined" onClick={cancelForm}le={{marginRight: '2rem'}}>cancel</Button>
      </form>
      <ConnectionStatusMessage {...{message, setMessage}} />
    </div>
  )
}

export default UploadForm

// Uploader component
function FileUploader({selectedFile, setSelectedFile}) {
  const fileInput = useRef(null)
  const filename  = (selectedFile || {name: 'no file selected'}).name

  const handleClick = (e) => fileInput.current.click()

  const handleChange = (e) => {
    // console.log(isJSON(e.target.files[0]))
    setSelectedFile(e.target.files[0])
  }

  return (
    <div style={{margin: '0.5rem 0'}}>
      <input type="file" onChange={handleChange} ref={fileInput} style={{display: 'none'}}/>
      <Chip label='choose file' style={{width: '8rem'}} color='secondary' onClick={handleClick} />
      <span style={{marginLeft: '1rem', fontSize: 'small'}}>{filename}</span>
    </div>
  )
}


// Snackbar to indicate send success/failure
function ConnectionStatusMessage({message, setMessage}) {
  const handleClose = () => setMessage(null)
  const displayBar  = message ? true : false
  return (
    <Snackbar open={displayBar} autoHideDuration={UI_DELAY} onClose={handleClose} message={message} />
  )
}

// function isJSON(file) {
//   return file.type === 'application/json' ? true : false
// }
