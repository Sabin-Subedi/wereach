import React, { useEffect, useState } from "react";
import { Button, CardGroup, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";
import { getAllProjects } from "../actions/projectActions";
import CardBox from "../components/CardBox";
import CategoryIconsBox from "../components/CategoryIconsBox";
import Footer from "../components/Footer";
import Icon from "../components/Icon";
import NavBar from "../components/Navbar";
import VideoModal from "../components/VideoModal";
import useLocation from "../hooks/useLocation";
import ScrollToTop from "react-scroll-to-top";

function HomeScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const { location } = useLocation();
  const { userInfo } = useSelector((state) => state.user);
  const { projectList } = useSelector((state) => state.projects);

  const filterProjectByLocation = projectList?.filter(
    (project) =>
      project.location.toString().trim().toLowerCase() ===
      location.toString().trim().toLowerCase()
  );


  useEffect(() => {
    if(!userInfo?.emailVerified){
       history.push("/verify-otp")
    }
}, [userInfo,history])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!projectList) {
      history.push("/404");
    }
  }, [projectList, location, history]);

  return (
    <>
      <ScrollToTop color="#198754" smooth />
      <NavBar />
      <section>
        <div className="hero_wrapper d-flex align-items-center justify-content-start">
          <div className="hero_banner"></div>

          <Container fluid='md'>
            <div className="hero_content position-relative mt-5">
              <h1>
                Be the part of the change in society involving in the projects
                near you.
              </h1>
              <p className="fs-4 fw-light text-muted">Get Started Today</p>
              <div className="d-flex flex-wrap align-items-center">
                <LinkContainer to={userInfo ? '/create/project' : '/login'}>
                  <Button variant="success" className="fw-bold py-3 px-4 mb-2">
                    Start Your Project
                  </Button>
                </LinkContainer>
                <div
                  className="d-flex flex-row align-items-center text-muted fs-4 fw-light pointer ms-lg-4"
                  onClick={() => setModalShow(true)}
                >
                  <Icon icon="fal fa-play-circle" size={1} color="muted" />
                  <p className="mb-0">Watch Video</p>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <VideoModal show={modalShow} onHide={() => setModalShow(false)} />
      <Container fluid='md'>
        
            <div className="py-5">
              <h2 className="fw-bolder">Top Donation Projects</h2>
              <Row xs={1} sm={2} lg={4} className="gx-3 gy-4 mb-5 mt-3">
                {[...Array(4).keys()].map((num) => (
                  <Col className="">
                    <CardBox
                      data={
                        projectList?.sort((first, second) => {
                          if (first?.donatedAmount > second?.donatedAmount) {
                            return -1;
                          }
                          return 1;
                        })[num]
                      }
                    />
                  </Col>
                ))}
              </Row>
              <div className="text-end">
                <LinkContainer to="/discover">
                  <p className="fs-5 text-muted pointer ">
                    See More <Icon color="muted" icon="fal fa-chevron-right" />
                  </p>
                </LinkContainer>
              </div>
            </div>
        
      </Container>
      <div className="category">
        <CategoryIconsBox />
      </div>

      <Container fluid='md' >
        {location && filterProjectByLocation ? (
          <div className="mt-5">
            <h2 className="fw-bolder">Projects in {location}</h2>
            <Row xs={1} sm={2} lg={4} className="g-4 mb-5 mt-3">
              {[...Array(8).keys()].map((num) => (
                <Col className="">
                  <CardBox data={filterProjectByLocation[num]} />
                </Col>
              ))}
            </Row>
          </div>
        ) : (
          projectList && (
            <div className="mt-5">
              <h2 className="fw-bolder">Latest Projects</h2>
              <Row xs={1} sm={2} lg={4} className="g-4 mb-5 mt-3">
                {[...Array(8).keys()].map((num) => (
                  <Col className="">
                    <CardBox data={projectList[num]} />
                  </Col>
                ))}
              </Row>
            </div>
          )
        )}
        <div className="text-end">
          <LinkContainer to="/discover">
            <p className="fs-5 text-muted pointer ">
              See More <Icon color="muted" icon="fal fa-chevron-right" />
            </p>
          </LinkContainer>
        </div>
      </Container>
      <div className="category">
        <CategoryIconsBox />
      </div>
      <Container fluid='md' className="py-5">
        <div className="d-flex flex-column align-items-center">
          <h5 className="fw-light mb-4">Ready to start your project?</h5>
          <div>
          <LinkContainer to={userInfo ? '/create/project' : '/login'}>
                  <Button variant="success" className="fw-bold py-3 px-4">
                    Start Your Project
                  </Button>
                </LinkContainer>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default HomeScreen;
