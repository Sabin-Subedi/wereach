import React from "react";
import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <Spinner
        className="align-self-center"
        animation="border"
        variant="success"
      />
      <p className="mt-2 fs-6 text-success">Loading ...</p>
    </div>
  );
}

export default Loader;
