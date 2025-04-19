import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({ email: '', password: '' })

  const loginUser = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/login', data)
      if (res.data.error) {
        toast.error(res.data.error)
      } else {
        setData({})
        navigate('/dashboard')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="center-container">
      <form onSubmit={loginUser}>
        <h2>Login</h2>
        <label>Email</label>
        <input type="email" required placeholder="Enter email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

        <label>Password</label>
        <input type="password" required placeholder="Enter password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
