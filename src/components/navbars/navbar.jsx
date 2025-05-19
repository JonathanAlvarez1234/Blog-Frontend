import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Mi Blog</div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Cursos</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;