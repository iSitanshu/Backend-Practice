import {SnackbarProvider} from 'notistack';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from './Components/Homepage';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';
import Login from './Components/Login';


const App = () => {
  return (
    <div>
      <SnackbarProvider>
        <BrowserRouter>

          <Navbar/>

          <Routes>

            <Route path='/' element={<Homepage/>}/>
            <Route path='/Signup' element={<Signup/>}/>
            <Route path='/Login' element={<Login/>}/>
            
          </Routes>

        </BrowserRouter>
      </SnackbarProvider>
    </div>
  )
}

export default App;