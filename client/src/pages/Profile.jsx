import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, setUser } = useContext(UserContext)
  const [profileData, setProfileData] = useState({
    name: '',
    userName: '',
    email: ''
  })
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        userName: user.userName || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/update-profile', profileData)
      setUser(data)
      toast.success('Profile updated!')
    } catch (err) {
      toast.error('Failed to update profile')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post('/logout')
      setUser(null)
      navigate('/login')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="center-container">
      <form onSubmit={handleUpdate}>
        <h2>User Profile</h2>
        <label>Name</label>
        <input
          type="text"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
        />

        <label>Username</label>
        <input
          type="text"
          value={profileData.userName}
          onChange={(e) => setProfileData({ ...profileData, userName: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          value={profileData.email}
          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
        />

        <button type="submit">Update Profile</button>
        <button type="button" onClick={handleLogout} style={{ backgroundColor: '#e84118', marginTop: '10px' }}>
          Logout
        </button>
      </form>
    </div>
  )
}

export default Profile
