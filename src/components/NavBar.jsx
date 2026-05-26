import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Ambiently</div>

        <div className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            About
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Search
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
