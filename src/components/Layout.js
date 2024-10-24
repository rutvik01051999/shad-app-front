// Layout.js
import { Outlet, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';

const Layout = () => {
  return (
    <div>
      {/* Common Layout: Header */}


      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/login">login</Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


     

      {/* Outlet to render matched child route component */}
      <main>
        <Outlet />
      </main>
      <Container>
      {/* Common Layout: Footer */}
      <footer>
        <p>© 2024 My Website</p>
      </footer>
      </Container>
    </div>
  );
};

export default Layout;
