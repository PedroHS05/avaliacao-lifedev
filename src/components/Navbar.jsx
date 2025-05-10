import styles from './Navbar.module.css'
import { NavLink } from "react-router-dom"
import { useAuthContext } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'

const Navbar = () => {
  const { user } = useAuthContext()
  const { logout } = useAuthentication()

  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.links_list}>
          <NavLink to="/" className={styles.brand} activeClassName={styles.active}>
            <li><span>Life</span>Dev</li>
          </NavLink>
          
          {/* Links para usuários não autenticados */}
          {!user && (
            <>
              <NavLink to="/login" className={styles.link} activeClassName={styles.active}>
                <li>Login</li>
              </NavLink>
              <NavLink to="/register" className={styles.link} activeClassName={styles.active}>
                <li>Register</li>
              </NavLink>
            </>
          )}
          
          {/* Links para usuários autenticados */}
          {user && (
            <>
              <NavLink to="/dashboard" className={styles.link} activeClassName={styles.active}>
                <li>Dashboard</li>
              </NavLink>
              <NavLink to="/post/new" className={styles.link} activeClassName={styles.active}>
                <li>Novo Post</li>
              </NavLink>
              <NavLink to="/profile" className={styles.link} activeClassName={styles.active}>
                <li>Meu Perfil</li>
              </NavLink>
              <li className={styles.link} onClick={logout}>Logout</li>
            </>
          )}
        </ul>
      </nav>
    </>
  )
}

export default Navbar