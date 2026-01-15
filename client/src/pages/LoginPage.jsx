import '../styles/LoginPage.css'
import useAuth from '../store/authStore'

const handleLogin = () => {
  // TODO
}

const handleSignup = () => {
  // TODO
}

const LoginPage = () => {
  const isSignup = useAuth(state => state.isSignup)

  return (
    <div className="login-page-container">
      {isSignup ? <Signup /> : <Login />}
    </div>
  )
}

const Login = () => {
  const setSignup = useAuth(state => state.setSignup)
  return (
    <form onSubmit={handleLogin} className="login-container">
      <h1 className="login-header">
        Login
      </h1>
      <div className="login-inputs-container">
        <input className="login-input" placeholder="Username" type="text" />
        <input className="login-input" placeholder="Password" type="password" />
      </div>
      <div className="login-bottom-container">
        <button type="submit" className="login-button">Log in</button>
        <div className="login-switch-text">
          Don't have an account? Sign up <span className="login-signup-switch" onClick={setSignup}>here</span>
        </div>
      </div>
    </form>
  )
}

const Signup = () => {
  const setLogin = useAuth(state => state.setLogin)
  return (
    <form onSubmit={handleSignup} className="login-container">
      <h1 className="login-header">
        Signup
      </h1>
      <div className="login-inputs-container">
        <input className="login-input" placeholder="Name" type="text" />
        <input className="login-input" placeholder="Username" type="text" />
        <input className="login-input" placeholder="Password" type="password" />
      </div>
      <div className="login-bottom-container">
        <button type="submit" className="login-button">Sign up</button>
        <div className="login-switch-text">
          Already have an account? Log in <span className="login-signup-switch" onClick={setLogin}>here</span>
        </div>
      </div>
    </form>
  )
}

export default LoginPage
