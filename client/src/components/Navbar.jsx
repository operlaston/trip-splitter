import { Link } from "react-router"
import '../styles/Navbar.css'
import useAuth from '../store/authStore'
import { logout } from "../api/loginService"

const Navbar = () => {
  const setUser = useAuth(state => state.setUser)

  const handleLogout = async () => {
    try {
      await logout()
    }
    catch (e) {
      console.error(e)
    }
    setUser(null)
  }

  return (
    <nav>
      <div className="nav-inner-wrapper">
        <Link to='/'>
          TripSplit
        </Link>
        <div className="nav-buttons-wrapper">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
