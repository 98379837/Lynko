import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/registration">Register</Link>
      <Link to="/login">Log In</Link>
      <Link to="/search">Search</Link>
      <Link to="/profile">Profile</Link>

    </nav>
  )
}

export default Navbar
