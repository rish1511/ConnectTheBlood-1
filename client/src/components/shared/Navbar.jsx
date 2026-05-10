import { Link } from 'react-router-dom'
import Logo from './Logo'
import { ROUTES } from '../../constants/routes'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Logo />
      </div>
      <nav className="bg-amber-300">
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.LOGIN}>Login</Link>
        <Link to={ROUTES.SIGNUP}>Signup</Link>
      </nav>
    </header>
  )
}
