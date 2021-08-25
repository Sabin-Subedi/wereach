
import moment from "moment";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Badge, Button, Col, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { getAllUser } from "../actions/authActions";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import NavBar from "../components/Navbar";
import useDeleteUser from "../hooks/useDeleteUser";

const sideBar = ["projects", "users", "messages"];

function DashboardScreen() {
  const history = useHistory();
  const search = window.location.search.split("=")[1];
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { projectList } = useSelector((state) => state.adminProjectList);
  const { userLists } = useSelector((state) => state.allUser);
  const {deleteUser} = useDeleteUser()

  const [radio, setRadio] = useState(sideBar[0]);

  useEffect(() => {setRadio(search)},[search])

  useEffect(() => {
    const token = localStorage.getItem("token");
    token && dispatch(getAllUser(token));
  }, [dispatch]);

  useEffect(() => {
    console.log("hello");
    if (userInfo && !userInfo.isAdmin) {
      history.push("/");
    }
  }, [history, userInfo]);

  useEffect(() => {
    document
      .querySelectorAll(".tab_title")
      .forEach((e) => e?.classList.remove("active_ta"));
    document.getElementById(radio)?.classList.add("active_ta");
  }, [radio]);

  const handleClick = (e) => {
    setRadio(e.target.id);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <div className="pt-5 mt-5">
          <div className="row">
            <Col sm={3}>
              <div className="bg-light px-0 py-2 pb-0 rounded-3">
                <h4 className="pt-3 px-3 mb-4">Dashboard</h4>

                {sideBar.map((project, index) => (
                  <div key={index} className="pointer rounded-3">
                    <p
                      id={project}
                      onClick={handleClick}
                      className="text-truncate text-capitalize tab_title my-0 p-2 px-4 rounded-1 "
                    >
                      {project}
                    </p>
                  </div>
                ))}
              </div>
            </Col>
            <Col sm={9}>
              {radio === "projects" && (
                <div className=" px-4 pb-2 rounded-3">
                  <h3 className="fw-normal">Projects</h3>
                  {projectList && (
                    <Table id="volunteer_list" striped hover responsive>
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Project Name</th>
                          <th scope="col">Project Owner</th>
                          <th>Category</th>
                          <th scope="col">Verified</th>
                          <th scope="col">Created At</th>
                        </tr>
                      </thead>

                      <tbody>
                        {projectList?.map((project, index) => (
                          <LinkContainer to={`/admin/project/${project._id}`}>
                            <tr className="pointer">
                              <td
                                className="text-truncate"
                                style={{ maxWidth: "12rem" }}
                              >
                                {project?._id}
                              </td>
                              <td
                                style={{ maxWidth: "12rem" }}
                                className="text-truncate"
                              >
                                {project.title}
                              </td>
                              <td>
                                <div className="d-flex align-items-center text-truncate">
                                  <Avatar
                                    className="d-none d-lg-inline-block"
                                    name={project.user.name}
                                    round
                                    size="40"
                                    textSizeRatio={2}
                                  />
                                  <span
                                    className="fw-bolder"
                                    style={{ marginLeft: "0.5rem" }}
                                  >
                                    {project.user.name}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <Badge bg="primary">{project.category}</Badge>
                              </td>
                              <td>
                                {project?.isVerified ? (
                                  <Icon
                                    icon="fad fa-badge-check"
                                    color="success"
                                    size={5}
                                    className="ms-3"
                                  />
                                ) : (
                                  <Icon
                                    icon="fad fa-times-circle"
                                    color="danger"
                                    size={5}
                                    className="ms-3"
                                  />
                                )}
                              </td>
                              <td style={{ maxWidth: "15rem" }}>
                                {moment(project.createdAt).format("LLL")}
                              </td>
                            </tr>
                          </LinkContainer>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              )}
              {radio === "users" && (
                <div className=" px-4 pb-2 rounded-3">
                  <h3 className="fw-normal">Users</h3>
                  {userLists && (
                    <Table id="volunteer_list" striped hover responsive>
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">User</th>
                          <th scope="col">Email</th>
                          <th scope="col">Verified</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {userLists?.map((user, index) => (
                          <tr className="pointer">
                            <td className="text-truncate">{user?._id}</td>

                            <td>
                              <div className="d-flex align-items-center text-truncate">
                                <Avatar
                                  className="d-none d-lg-inline-block"
                                  name={user.name}
                                  round
                                  size="40"
                                  textSizeRatio={2}
                                />
                                <span
                                  className="fw-bolder"
                                  style={{ marginLeft: "0.5rem" }}
                                >
                                  {user.name}
                                </span>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>
                              {user?.emailVerified ? (
                                <Icon
                                  icon="fad fa-badge-check"
                                  color="success"
                                  size={5}
                                  className="ms-3"
                                />
                              ) : (
                                <Icon
                                  icon="fad fa-times-circle"
                                  color="danger"
                                  size={5}
                                  className="ms-3"
                                />
                              )}
                            </td>
                            <td>
                              <Button variant='danger' onClick={() => window.confirm(`Are you sure you want to delete ${user?.name}?`) && deleteUser(user?._id)}>Delete</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </div>
              )}
            </Col>
          </div>
        </div>
      </Container>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}

export default DashboardScreen;
