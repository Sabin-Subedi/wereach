import React from "react";
import { Container } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import { terms } from "../constants/terms";


function TermsScreen() {
  return (
    <>
      <NavBar />
      <div className="bg-tan">
        <Container className="py-5">
          <div className="pt-5 text-center">
              <div className="py-5">
            <h1>WeReach Terms </h1>
              </div>
          </div>
        </Container>
        </div>
        <Container className='py-5'>
            {
                terms.map(p => (
                    <div className='mb-5'>
                        <h3>{p.mainTitle}</h3>
                        {p.sub.map((sub,index) => (
                            <div className='my-3'>
                            <h6>{index+1}.{sub.subtitle}</h6>
                            <p>{sub.description}</p>
                            </div>
                        ))}
                    </div>
                ))
            }
        </Container>
     <Footer />
    </>
  );
}

export default TermsScreen;
