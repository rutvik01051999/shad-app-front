// Layout.js
import { Outlet, Link, NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import "../css/navbar.css";
import { FaHeart, FaUserCircle ,FaBell } from 'react-icons/fa'; // Import the heart icon from react-icons
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("token"); // Assuming you're storing a token
    sessionStorage.removeItem("token"); // Clear session if used

    // Redirect to login page
    navigate("/login");
  };


  return (
    <div>
      {/* Common Layout: Header */}
        <Navbar expand="lg" className="custom-navbar">
          <Container>
            <Navbar.Brand as={Link} to="/" className="navbar-brand">
              MyApp
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav">
              <FaHeart style={{ fontSize: "24px", color: "yellow" }} />
            </Navbar.Toggle>
            <Navbar.Collapse id="navbar-nav">
              <Nav className="ms-auto">
                <Nav.Item>
                  <NavLink exact to="/" className="nav-link" activeClassName="active">
                    Home
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/about" className="nav-link" activeClassName="active">
                    About
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to="/contact" className="nav-link" activeClassName="active">
                    Contact
                  </NavLink>
                </Nav.Item>
                {!user && (
                  <Nav.Item>
                    <NavLink to="/login" className="nav-link" activeClassName="active">
                      Login
                    </NavLink>
                  </Nav.Item>

                )}

                {/* User Profile Dropdown */}
                {user && (
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="link" id="dropdown-user" className="text-white">
                      <FaUserCircle style={{ fontSize: "24px", color: "white" }} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/settings">Settings</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  
                )}

{user && (
                 <Nav.Item>
                 <NavLink
                   to="/login"
                   className={({ isActive }) =>
                     `nav-link d-flex align-items-center position-relative ${isActive ? 'active' : ''}`
                   }
                   style={{ fontSize: '1.1rem' }} // optional text size
                 >
                   <FaBell style={{ fontSize: '1.5rem' }} /> {/* Bigger icon */}
               
                   {/* Notification badge */}
                   <span
                     className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                     style={{ fontSize: '0.7rem' }}
                   >
                     5
                   </span>
               
                  
                 </NavLink>
               </Nav.Item>

                )}



              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      {/* Outlet to render matched child route component */}
      <main>
          <Outlet />
      </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} LoveConnect. All rights reserved.</p>
        </footer>
    </div>
  );
};

export default Layout;
