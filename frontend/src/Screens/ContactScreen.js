import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import Footer from "../components/Footer";
import NavBar from "../components/Navbar";

function ContactScreen() {
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    
  return (
    <>
      <NavBar />
      <Container className="my-5">
        <div className="mt-5 pt-5"></div>
        <div className="d-flex align-items-center py-5">
          <Col md={6}>
            <h1 className="display-4">
              Contact <span className="text-success">Us </span>
            </h1>
            <Col md={9}>
              <p className="text-secondary">
                We would love you hear from you. Let us know if you are facing
                any problems, have any questions or want to share feedback. We
                are always happy to help!
              </p>
            </Col>
            <Col md={9}>
              <Formik
                initialValues={{ email: "", fullname: "", description: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  /* and other goodies */
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mt-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        className={
                          errors.email &&
                          "border-danger focus-danger error_focus "
                        }
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        required
                      />
                      <p className="text-danger">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </Form.Group>
                    <Form.Group className="mt-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                      className={` ${
                        errors.description &&
                        touched.description &&
                        "border-danger focus-danger error_focus"
                      }`}
                      name="description"
                      as="textarea"
                      rows={5}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                      required
                    />
                    </Form.Group>
                 
                    <div className="d-grid mt-4">
                      <Button
                        type="submit"
                        variant='success'
                        disabled={
                          isSubmitting || Object.keys(errors).length > 0
                        }
                      >
                        Submit
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </Col>
          </Col>
          <Col md={6}>
            <img src="/contact.svg" alt="" style={{ width: "100%" }} />
          </Col>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default ContactScreen;
