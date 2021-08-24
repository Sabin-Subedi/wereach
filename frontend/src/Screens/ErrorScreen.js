import React from "react";
import { Button, Col, Container } from "react-bootstrap";

import NavbrandNav from "../components/NavbrandNav";

function ErrorPage() {
  return (
    <>
      <NavbrandNav button={false} />
      <Container>
        <div className="d-flex flex-column align-items-center mb-3">
          <h1 className="fs-1">Sorry, page not found!</h1>
          <Col lg={5}>
            <p className="text-center">
              Sorry, we couldn’t find the page you’re looking for. Perhaps
              you’ve mistyped the URL? Be sure to check your spelling.
            </p>
          </Col>
        </div>
        <Col lg={5} className="mx-auto">
          <img src="/404.svg" alt="" srcset="" style={{ width: "100%" }} />

          <div className="d-flex justify-content-center">
            <a href='/'>
              <Button variant='outline-success' className="mt-4">
                Go Back to Home
              </Button>
            </a>
          </div>
        </Col>
      </Container>
    </>
  );
}

export default ErrorPage;
