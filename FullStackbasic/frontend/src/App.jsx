import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [jokes, setJokes] = useState([])
  useEffect(() => {
    axios.get('/api/jokes')
      .then((response) => {
        setJokes(response.data)
      })
      .catch((error) => {
        console.log('error::',error);
      })
  })

  return (
    <>
    <h1>Chai aur fullStack</h1>
    <p>Jokes : {jokes.length}</p>
    {jokes.map((joke) => (
      <div key={joke.id}>
      <h3>{joke.title}</h3>
      <h5>{joke.content}</h5>
      </div>
    ))}
    </>
  )
}

export default App
