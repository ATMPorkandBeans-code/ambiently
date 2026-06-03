import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import styles from "../styles/NavBar.module.css";

function NavBar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout().then(() => navigate("/"));
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>Ambiently</div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={closeMenu}
          >
            About
          </NavLink>

          <NavLink
            to="/search"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
            onClick={closeMenu}
          >
            Search
          </NavLink>

          {user ? (
            <div className={styles.authSection}>
              <span className={styles.username}>Hi, {user.username}</span>
              <button className={styles.logoutButton} onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
              onClick={closeMenu}
            >
              Login / Sign Up
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
