import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function NavbrandNav() {
  return (
    <Navbar className="mb-5 py-3 " bg="white" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="text-success text-uppercase ">
          civics
        </Navbar.Brand>

        <Link to="/">
          <Button className="mx-2 px-5 py-2" variant="outline-secondary">
            Back
          </Button>
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavbrandNav;
