import React from 'react'
import styles from './Header.module.css'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Logo } from '../Assets/logo.svg'
import { ReactComponent as Detalhe } from '../Assets/detalheAtivo.svg'
import { UserContext } from '../Contexts/UserContext'
import useMedia from '../Hooks/useMedia'

const Header = () => {
  const { user, userLogout } = React.useContext(UserContext)
  const mobile = useMedia('(max-width: 38rem)')
  const [mobileMenu, setMobileMenu] = React.useState(false)
  const [menuadmin, setMenuadmin] = React.useState(false)
  const [menusair, setMenusair] = React.useState(false)
  const pathName = window.location.pathname
  // console.log('local: ', pathName)

  React.useEffect(() => {
    setMobileMenu(false)
    setMenuadmin(false)
    setMenusair(false)
  }, [pathName])

  return (
    <>
      <header className={`${styles.header} ${!user && styles.loggedIn}`}>
        <NavLink className={styles.logo} to="/" end aria-label="Logo - Home">
          <Logo />
          <h1>Monitora</h1>
        </NavLink>

        {user && mobile && (
          <button
            aria-label="Menu"
            className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
            onClick={() => setMobileMenu(!mobileMenu)}
          ></button>
        )}
        {user ? (
          <nav className={`${mobile ? styles.navMobile : styles.navegacao} ${mobileMenu && styles.navMobileActive}`}>
            <div className={styles.links}>
              {/* ${mobileMenu && styles.itemColaborador} */}
              <NavLink to="/colaborador" className={`${(nav) => (nav.isActive ? styles.active : ' ')} ${mobileMenu && styles.itemColaborador} `}>
                Colaborador
              </NavLink>
              {/* ${mobileMenu && styles.itemDescarte} */}
              <NavLink to="/descarte" className={`${(nav) => (nav.isActive ? styles.active : ' ')}  ${mobileMenu && styles.itemDescarte}`}>
                Descarte
              </NavLink>
              {/* ${mobileMenu && styles.itemEquipamento} */}
              <NavLink to="/equipamento" className={`${(nav) => (nav.isActive ? styles.active : ' ')}  ${mobileMenu && styles.itemEquipamento} `}>
                Equipamento
              </NavLink>
              {user.is_admin ? (
                <div className={`${mobileMenu ? styles.dropdown_mobile : styles.dropdown_menu}`}>
                  <NavLink to="#" onClick={() => setMenuadmin(!menuadmin)} className={menuadmin ? styles.active : ''}>
                    Admin
                    <Detalhe />
                  </NavLink>
                  {menuadmin && (
                    <div className={styles.submenu}>
                      <ul>
                        <li>
                          <NavLink to="/site">Site</NavLink>
                        </li>
                        <li>
                          <NavLink to="/admin">Usuário</NavLink>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className={styles.dropdown_menu}>
              <NavLink to="#" onClick={() => setMenusair(!menusair)} className={menusair ? styles.active : ''}>
                {user.login}
                <Detalhe />
              </NavLink>
              {menusair && (
                <div className={styles.submenu}>
                  <ul>
                    <li>
                      <NavLink to="/usuario">Perfil</NavLink>
                    </li>
                    <li>
                      <NavLink to="#" end onClick={userLogout}>
                        Sair
                      </NavLink>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <NavLink className={styles.login} to="/login" end>
            Login
          </NavLink>
        )}
      </header>
    </>
  )
}

export default Header
