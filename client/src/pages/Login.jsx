import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password} = data
    try {
      const {data} = await axios.post('/login', {
        email,
        password
      });
      if(data.error){
        toast.error(data.error)
      } else {
        setData({});
        navigate('/dashboard')
      }
    } catch (error) {
      
    }
  }

  return (
    <>
    <form onSubmit={loginUser}>

    <label>Email</label>
      <input type="email" placeholder='Enter Email...' required value={data.email} onChange={(e)=> setData({...data, email: e.target.value})}/>

      <label>Password</label>
      <input type="Password" placeholder='Enter Password...' required value={data.password} onChange={(e)=> setData({...data, password: e.target.value})}/>
    
      <button type='submit'>Login</button>
    </form>
    </>
  )
}

export default Login