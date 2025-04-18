import './App.css';
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/navbar';
import Home from '../src/pages/Home.jsx';
import Registration from '../src/pages/Registration.jsx';
import Login from '../src/pages/Login.jsx';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext.jsx';
import Dashboard from './pages/Dashboard.jsx';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path= '/registration' element={<Registration/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App;