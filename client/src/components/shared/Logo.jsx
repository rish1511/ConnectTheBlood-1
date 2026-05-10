import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

export default function Logo() {
  return (
    <Link to={ROUTES.HOME} className="logo">
      <span>Connect The Blood</span>
    </Link>
  )
}
