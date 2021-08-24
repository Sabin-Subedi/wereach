import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function NavbrandNav({ button = true }) {
  return (
    <Navbar className="py-3 " bg="white" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-success text-uppercase ">
          <img src="/logo.svg" alt="WEREACH" />
          </Navbar.Brand>
        </LinkContainer>
        {button && (
          <Link to="/">
            <Button className="mx-2 px-5 py-2" variant="outline-secondary">
              Back
            </Button>
          </Link>
        )}
      </Container>
    </Navbar>
  );
}

export default NavbrandNav;
