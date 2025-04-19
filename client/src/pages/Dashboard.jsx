import { useContext } from 'react'
import { UserContext } from '../../context/userContext'

function Dashboard() {
  const { user } = useContext(UserContext)

  return (
    <div className="center-container">
      <div>
        <h1>Dashboard</h1>
        {user && <h2>Hello, {user.name} 👋</h2>}
      </div>
    </div>
  )
}

export default Dashboard
