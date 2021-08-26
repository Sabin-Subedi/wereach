import React, { useEffect, useRef } from "react";
import { Col, Container } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";
import FeatureBox from "../components/FeatureBox";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import Team from "../components/Team";

function AboutUsScreen() {
    const team= useRef()
    const hash = window.location.hash.split('#')[1]
    const about = useRef()
    
    useEffect(() => {
        hash === 'team' ? team.current.scrollIntoView() : about.current.scrollIntoView()
    }, [hash])
   
  return (
    <div>
        <ScrollToTop color="#198754" smooth />
      <NavBar />
      <Container className="py-5">
        <Col ref={about} className="py-5 mt-5 text-center px-5">
          <h1>About WeReach</h1>
          <img src="/wereach.png" alt="Wereach" style={{maxWidth: '100%'}}/>
          <p className='fs-5 text-secondary mt-4'>
            Everyone has a part of them that hopes for a better world. Helping
            someone, fixing a community, or even changing a nation. We at
            WeREACH think that everyone should be able to benefit from your
            inspiration. We do this because it's the only way change happens.{" "}
          </p>
          <p className='fs-5 text-secondary'>
            As a result, we make it easy for people to be inspired and put their
            compassion into action through our website. We've established a
            community of donors, sponsors and volunteers and helped project
            creators successfully complete their project with proper management,
            research, planning, funding and manpower. Our aim is to reach the
            unreached in all over the world.
          </p>
        </Col>
        
     
      </Container>
      <div className="features">
        <FeatureBox />
      </div>
      <div ref={team}>

        <Team />
      </div>

        <Footer />
    </div>
  );
}

export default AboutUsScreen;
