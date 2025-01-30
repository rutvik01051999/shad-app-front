import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link ,useLocation} from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
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
  );
};

export default NavigationBar;
