import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Registration() {
  const navigate = useNavigate()
  const [data, setData] = useState({ name: '', userName: '', email: '', password: '' })

  const registerUser = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/register', data)
      if (res.data.error) {
        toast.error(res.data.error)
      } else {
        setData({})
        toast.success('Registration successful!')
        navigate('/dashboard')
      }
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  return (
    <div className="center-container">
      <form onSubmit={registerUser}>
        <h2>Register</h2>
        <label>Name</label>
        <input type="text" required placeholder="Full name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />

        <label>Username</label>
        <input type="text" required placeholder="Username" value={data.userName} onChange={(e) => setData({ ...data, userName: e.target.value })} />

        <label>Email</label>
        <input type="email" required placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />

        <label>Password</label>
        <input type="password" required placeholder="Password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />

        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Registration
