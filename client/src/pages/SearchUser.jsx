import { useState } from 'react'
import axios from 'axios'

function SearchUser() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query) return

    try {
      const { data } = await axios.get(`/search?query=${query}`)
      setResults(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="center-container">
      <div>
        <form onSubmit={handleSearch}>
          <h2>Search Users</h2>
          <input
            type="text"
            placeholder="Search by username"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>

        <ul>
          {results.map((user) => (
            <li key={user._id}>
              <strong>{user.userName}</strong> ({user.name}) – {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchUser
