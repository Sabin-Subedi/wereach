import { Formik } from "formik";
import React from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import NavbrandNav from "../components/NavbrandNav";
import { category } from "../constants/data";

function CreateProjectScreen() {
  return (
    <>
      <NavbrandNav />
      <Container>
        <Col md={4}>
          <Formik
            initialValues={{
              title: "",
              description: "",
              category: "",
              imageLink: "",
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
            onSubmit={(values, { setSubmitting }) => {}}
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
                <Form.Group>
                  <Form.Label>Title of Project</Form.Label>
                  <Form.Control
                    className={` ${
                      errors.title &&
                      touched.title &&
                      "border-danger focus-danger"
                    }`}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <span className="text-danger">
                    {" "}
                    {errors.title && touched.title && errors.title}
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
                <Form.Group className="mt-2">
                  <Form.Label>Category of your project</Form.Label>
                  <Form.Select
                    aria-label="Category of your project"
                    name="category"
                  >
                    <option>Project Category:</option>
                    {category.map((data) => (
                      <option value={data}>{data}</option>
                    ))}
                  </Form.Select>
                  {errors.password && touched.password && errors.password}
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button
                    type="submit"
                    variant="success"
                    disabled={isSubmitting}
                  >
                    Create Project
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Container>
    </>
  );
}

export default CreateProjectScreen;
