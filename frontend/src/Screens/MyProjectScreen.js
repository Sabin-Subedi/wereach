import React, { useEffect, useState } from "react";
import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Table,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import Avatar from "../components/Avatar";
import Icon from "../components/Icon";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer"

function MyProjectScreen() {
  console.log(window.location.search);
  const search = window.location.search.split("=")[1];
  const { userInfo } = useSelector((state) => state.user);
  const { projectList } = useSelector((state) => state.projects);

  const filteredProject = projectList?.filter(
    (project) => project.user._id.toString() === userInfo.id.toString()
  );

  const [radio, setRadio] = useState(
    search ? search : filteredProject && filteredProject[0]?._id
  );

  const selectedProject = filteredProject?.find(
    (project) => project._id === radio
  );

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
        {filteredProject.length > 0 ? (
          <div className="pt-5 mt-5">
            <div className="row">
              <Col sm={3}>
                <div className="bg-light px-0 py-2 pb-0 rounded-3">
                  <h4 className="pt-3 px-3 mb-4">Your Projects</h4>

                  {filteredProject?.map((project, index) => (
                    <div className="pointer rounded-3">
                      <p
                        id={project?._id}
                        onClick={handleClick}
                        className="text-truncate text-capitalize tab_title my-0 p-2 px-4 rounded-1 "
                      >
                        {project.title}
                      </p>
                    </div>
                  ))}
                </div>
              </Col>
              <Col sm={9}>
                <div className="bg-light p-4 pb-2 rounded-3">
                  <h4 className="fw-normal">Latest Transaction</h4>
                  {selectedProject?.donationList?.donation?.length > 0 ? (
                    <Table hover responsive striped id="donation_list">
                      <thead>
                        <tr>
                          <th>S.N.</th>
                          <th>Donor</th>
                          <th>Email</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody className="mb-0">
                        {selectedProject?.donationList.donation.map(
                          (donation, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Avatar source={donation.user.avatar} />
                                  <span
                                    className="fw-bolder"
                                    style={{ marginLeft: "0.5rem" }}
                                  >
                                    {donation.user.name}
                                  </span>
                                </div>
                              </td>
                              <td>{donation.user.email}</td>
                              <td>${donation.amount}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  ) : (
                    <div className="text-center p-4 text-secondary">
                      <Icon
                        icon="fal fa-money-bill"
                        color="secondary"
                        className="fs-lg"
                      />
                      <p className="fs-2">No transaction yet</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-light mt-3 p-4 pb-2 rounded-3">
                  <h4 className="fw-normal">
                    Interested Volunteer List
                  </h4>
                  {selectedProject?.volunteerList?.volunteers?.length > 0 ? (
                    <Table id="volunteer_list">
                      <thead>
                        <tr>
                          <th>S.N.</th>
                          <th>Volunteer</th>
                          <th>Email</th>
                          <th>Role</th>
                        </tr>
                      </thead>

                      <tbody>
                        {selectedProject?.volunteerList.volunteers.map(
                          (volunteer, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <Avatar source={volunteer.user.avatar} />
                                  <span
                                    className="fw-bolder"
                                    style={{ marginLeft: "0.5rem" }}
                                  >
                                    {volunteer.user.name}
                                  </span>
                                </div>
                              </td>
                              <td>{volunteer.user.email}</td>
                              <td>
                                <Badge bg="primary">{volunteer.role}</Badge>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </Table>
                  ): (
                    <div className="text-center p-4 text-secondary">
                    <Icon
                      icon="fal fa-person-sign"
                      color="secondary"
                      className="fs-lg"
                    />
                    <p className="fs-2">No volunteers yet.</p>
                  </div>
                  )}
                </div>
                
              </Col>
            </div>
          </div>
        ) : (
          <h1>You haven't Created Any Project</h1>
        )}
      </Container>
      <div className='mt-5'>
      <Footer />
      </div>
      
    </div>
  );
}

export default MyProjectScreen;
