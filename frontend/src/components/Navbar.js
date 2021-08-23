import React from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { category } from "../constants/data";
import Avatar from "react-avatar";

function NavBar() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="mb-5" bg="white" expand="lg" fixed="top">
      <Container fluid='md'>
        <LinkContainer to="/">
          <Navbar.Brand className=" space_letter text-success text-center text-uppercase mb-0 p-0">
            <img src="/logo.svg" alt="WEREACH" />
          </Navbar.Brand>
        </LinkContainer>


        <Navbar.Toggle aria-controls="basic-navbar-nav" className='d-lg-none' />
        <Navbar.Collapse id="basic-navbar-nav" className='d-lg-none' >
         
        <Nav className="ms-auto align-middle ">
          <LinkContainer to="/create/project">
            <Button variant="outline-success mx-2 ">Start Project</Button>
          </LinkContainer>
          <NavDropdown
            variant="success"
            
            title="Projects"
            id="basic-nav-dropdown"
            align="end"
          >
            {category &&
              category.map((cate) => (
                <LinkContainer
                  to={`/discover?category=${cate
                    .replace(/\s+/g, "")
                    .toLowerCase()}`}
                >
                  <NavDropdown.Item>{cate}</NavDropdown.Item>
                </LinkContainer>
              ))}
          </NavDropdown>
          {userInfo ? (
            <>
             
                {userInfo.isAdmin && (
                  <NavDropdown
                    className="text-whiterounded-circle text-white dropdown"
                    id="setting"
                    menuVariant="light"
                    title={`Admin`}
                  >
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>
                        <i className="fas fa-columns me-2"></i>Dashboard
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}

                <LinkContainer to={`/projects/${userInfo?.id}`}>
                  <Nav.Link className="pointer">My Projects</Nav.Link>
                </LinkContainer>

                <Nav.Link className="align-middle mb-0 d-none d-lg-inline-block">{userInfo.name}</Nav.Link>
                <Avatar
                className='d-none d-lg-inline-block'
                  name={userInfo.name}
                  round
                  size="40"
                  textSizeRatio={2}
                />

                <NavDropdown
                  className="text-whiterounded-circle text-white dropdown d-none d-lg-inline-block"
                  id="setting"
                  menuVariant="light"
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
            
                <Nav.Link className='d-lg-none' onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </Nav.Link>
            </>
          ) : (
            <>
              <LinkContainer to="/login">
                <Nav.Item className="mx-2 d-flex align-items-center pointer">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
