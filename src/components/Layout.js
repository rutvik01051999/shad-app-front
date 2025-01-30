// Layout.js
import { Outlet, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import "../css/navbar.css";

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
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="nav-link">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar></Container>
    


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
