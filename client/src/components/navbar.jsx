import {Link} from 'react-router-dom'

function navbar() {
  return (
    <>
    <Link to='/home'>Home</Link>
    <Link to='/registration'>Register</Link>
    <Link to='/login'>Log in</Link>
    </>
  )
}

export default navbar