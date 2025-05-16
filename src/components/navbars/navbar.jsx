import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">Mi Blog</div>
            <ul className="navbar-links">
                <li><a href="#">Posts</a></li>
                <li><a href="#">Comments</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;