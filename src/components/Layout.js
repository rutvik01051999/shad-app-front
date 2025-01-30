// Layout.js
import { Outlet, Link,NavLink } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import "../css/navbar.css";
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons

const Layout = () => {
  return (
    <div>
      {/* Common Layout: Header */}
      <Container fluid>
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            MyApp
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav">
          <FaHeart style={{ fontSize: '24px', color: 'yellow' }} />
        </Navbar.Toggle>
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Nav.Item>
                <NavLink
                  exact
                  to="/"
                  className="nav-link"
                  activeClassName="active"
                >
                  Home
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/about"
                  className="nav-link"
                  activeClassName="active"
                >
                  About
                </NavLink>
              </Nav.Item>
              <Nav.Item>
                <NavLink
                  to="/contact"
                  className="nav-link"
                  activeClassName="active"
                >
                  Contact
                </NavLink>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
    


      {/* Outlet to render matched child route component */}
      <main>
      <Container fluid>
        <Outlet />
        </Container>
      </main>
     
      <Container fluid>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} LoveConnect. All rights reserved.</p>
      </footer>
      </Container>
    </div>
  );
};

export default Layout;
