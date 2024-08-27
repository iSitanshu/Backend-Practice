import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [standup, setStandup] = useState([])
  
  axios.get('/detail/standup')
    .then((response)=>{setStandup(response.data)})
    .catch((error)=>{
    console.log(error);})

  return (
    <>
    <h3>Total number of standups are : {standup.length}</h3>
    {standup.map((comedian)=>(
      <div key={comedian.id}>
        <h3>Names of {comedian.id} is : {comedian.Name} And their age : {comedian.age}</h3>
      </div>
    ))} 
    </>
  )
}

export default App
