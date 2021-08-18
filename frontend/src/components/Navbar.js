import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import Avatar from "./Avatar";

function NavBar() {
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="mb-5" bg="white" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/" className="me-auto text-success text-uppercase ">
          civics
        </Navbar.Brand>
        <Nav className="ms-auto align-middle">
          <NavDropdown
            className="mx-2"
            title="Projects"
            id="basic-nav-dropdown"
            align="end"
          >
            <NavDropdown.Item href="#action/3.1">Covid</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Development Work
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Health</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Animal</NavDropdown.Item>
          </NavDropdown>
          {userInfo ? (
            <div className="d-flex align-items-center">
              <LinkContainer to="/create/project">
                <Button variant="outline-success mx-2 me-4">
                  Start Project
                </Button>
              </LinkContainer>
              <p className="align-middle mb-0 mx-2">{userInfo.name}</p>
              <Avatar source={userInfo.avatar} desc={userInfo.name} />

              <NavDropdown
                className="text-whiterounded-circle text-white dropdown"
                id="setting"
                menuVariant="light"
              >
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className="fas fa-sign-out-alt mr-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Item className="mx-2 d-flex align-items-center">
                  Sign in
                </Nav.Item>
              </LinkContainer>
              <Link to="/register">
                <Button className="mx-2" variant="outline-success">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
