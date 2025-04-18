import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

function Registration() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    userName: '',
    email: '',
    password: '',
  })

  const registerUser = async (e) => {
    e.preventDefault();
    const {name, userName, email, password} = data

    try {
      const {data} = await axios.post('/register', {
        name, userName, email, password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Registered Successful. Welcome to Lynko!')
        navigate('/dashboard')
      }
    } catch (error) {
      
    }
  }

  return (
    <>
    <form onSubmit={registerUser}>
      <label>Name</label>
      <input type="text" placeholder='Enter Name...' required value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
      
      <label>User Name</label>
      <input type="text" placeholder='Enter User Name...' required value={data.userName} onChange={(e) => setData({...data, userName: e.target.value})} />
      
      <label>Email</label>
      <input type="email" placeholder='Enter Email...' required value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>

      <label>Password</label>
      <input type="Password" placeholder='Enter Password...' required value={data.password} onChange={(e)=> setData({...data, password:e.target.value})}/>

      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default Registration