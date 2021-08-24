import { Formik } from "formik";
import React, { useEffect } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { login } from "../actions/authActions";
import { auth } from "../firebase";

function SignInScreen() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userInfo, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo) {
      console.log("hello");
      history.push("/");
    }
  }, [userInfo, history]);

  const signIn = (values, setSubmitting) => {
    setTimeout(() => {
      dispatch(login(values));
      setSubmitting(false);
    }, 400);
  };

  return (
    <main
      className="container d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <Col xs={12} sm={8} lg={4} className="mx-auto">
        <LinkContainer to="/">
          <div className="d-flex justify-content-center">
            <img src="/wereach.svg" alt="WEREACH" />
          </div>
        </LinkContainer>

        <div className="shadow rounded-3 p-5">
          <h2 className="text-center">Sign In</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              signIn(values, setSubmitting);
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
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    className={` ${
                      errors.email &&
                      touched.email &&
                      "border-danger focus-danger"
                    }`}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <span className="text-danger">
                    {" "}
                    {errors.email && touched.email && errors.email}
                  </span>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <p className="text-center mt-5">
          New to WeReach? <Link to="/register">Join Now</Link>
        </p>
      </Col>
    </main>
  );
}

export default SignInScreen;
