import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { category } from "../constants/data";
import Avatar from "./Avatar";

function NavBar() {
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="mb-5" bg="white" expand="lg" fixed="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="me-auto text-success text-uppercase ">
            civics
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ms-auto align-middle">
          <NavDropdown
          variant="success"
            className="mx-2"
            title="Projects"
            id="basic-nav-dropdown"
            align="end"
          >
            {category && category.map((cate) => (
              <LinkContainer to={`/discover?category=${cate.replace(/\s+/g, '').toLowerCase()}`}>

                <NavDropdown.Item >{cate}</NavDropdown.Item>
              </LinkContainer>

            ))}
            
          </NavDropdown>
          {userInfo ? (
            <>
            <div className="d-flex align-items-center">
            {userInfo.isAdmin && <NavDropdown
                className="text-whiterounded-circle text-white dropdown"
                id="setting"
                menuVariant="light"
                title={`Admin`}
              >
                <LinkContainer to='/admin/dashboard'>
                <NavDropdown.Item>
                  <i className="fas fa-columns me-2"></i>Dashboard
                </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>}


              <LinkContainer to="/create/project">
                <Button variant="outline-success mx-2 ">
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
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
              </>
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
