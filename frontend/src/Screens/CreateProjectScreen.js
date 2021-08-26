import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import NavbrandNav from "../components/NavbrandNav";
import UploadModal from "../components/uploadModal";
import { category, countryList, openedFor } from "../constants/data";
import useLocation from "../hooks/useLocation";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../actions/projectActions";
import { useHistory } from "react-router-dom";

function CreateProjectScreen() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [image, setimage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { location } = useLocation();
  const { projectCreated } = useSelector((state) => state.createProject);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    projectCreated && history.push("/");
    dispatch({
      type: 'PROJECT_CREATE_RESET'
    })
    
  },[projectCreated,history,dispatch])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      setModalShow(true);
      const { data } = await axios.post("/upload", formData, config);

      if (data.imagePath) {
        setimage(data.imagePath);
        setUploading(false);
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <NavbrandNav />
      <Container className='mb-5'>
        <Col sm={8} lg={6} className="mx-auto">
          <h2 className="text-center mb-4">Start your project now.</h2>
          <Formik
            initialValues={{
              title: "",
              description: "",
              category: "Health and Disease",
              location: "",
              videoLink: "",
              openedFor: [],
              volunteerCommunityLink: "",
            }}
            validate={(values) => {
              const errors = {};

              if (values.description.length < 150) {
                errors.description =
                  "Description must be at least 150 characters long.";
              }

              if (!values.location) {
                errors.location = "Please select a location";
              }

              if (
                values.openedFor.includes("donate") &&
                !values.donationAmount
              ) {
                errors.donationAmount = "Donation amount is required";
              } else if (
                values.openedFor.includes("volunteer") &&
                !values.volunteerNumber
              ) {
                errors.volunteerNumber =
                  "Volunteer no required to open project for volunteering.";
              }

              if (values.openedFor.length === 0) {
                errors.openedFor = "Please select at least one category";
              }

              if (values.title.length < 5) {
                errors.title = "Title must be at least 5 characters long.";
              }

              if (
                values.volunteerCommunityLink &&
                !/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
                  values.volunteerCommunityLink
                )
              ) {
                errors.volunteerCommunityLink = "Invalid URL";
              }

              if (
                values.videoLink.length > 1 &&
                !/^[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
                  values.videoLink
                )
              ) {
                errors.videoLink = "Invalid URL";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              const token = localStorage.getItem("token");
              console.log({
                ...values,
                imageLink: image,
              });
              dispatch(
                createProject(token, {
                  ...values,
                  imageLink: image,
                })
              );

             
              setSubmitting(false);
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
              setFieldValue,

              /* and other goodies */
            }) => (
              <>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Title of Project</Form.Label>
                    <Form.Control
                      className={` ${
                        errors.title &&
                        touched.title &&
                        "border-danger focus-danger error_focus"
                      }`}
                      type="text"
                      name="title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                      required
                    />
                    <span className="text-danger">
                      {" "}
                      {errors.title && touched.title && errors.title}
                    </span>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Description of the Project</Form.Label>
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
                    <span className="text-danger">
                      {" "}
                      {errors.description &&
                        touched.description &&
                        errors.description}
                    </span>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Category of your project</Form.Label>
                    <Form.Select
                      aria-label="Category of your project"
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                      required
                    >
                      {category.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>Location</Form.Label>
                    <Form.Select
                      className={
                        errors.location &&
                        "border-danger focus-danger error_focus "
                      }
                      aria-label="location of your project"
                      name="location"
                      value={values.location}
                      required
                      onChange={handleChange}
                    >
                      <option className={errors.location && "text-danger"}>
                        Choose your country
                      </option>

                      {countryList.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </Form.Select>
                    <p className="text-danger">{errors.location}</p>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Image of your project</Form.Label>
                    <Form.Control
                      type="file"
                      name="imageFile"
                      accept="image/png,  image/jpeg,image/jpg"
                      onChange={(e) => {
                        uploadFileHandler(e);
                      }}
                      required
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>
                      Video link about your project{" "}
                      <span className="text-muted">(optional)</span>
                    </Form.Label>
                    <Form.Control
                      className={` ${
                        errors.videoLink &&
                        touched.videoLink &&
                        "border-danger focus-danger error_focus"
                      }`}
                      type="text"
                      name="videoLink"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.videoLink}
            
                    />
                    <p className="text-danger">
                      {errors.videoLink &&
                        touched.videoLink &&
                        errors.videoLink}
                    </p>
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>OpenedFor</Form.Label>
                    {openedFor.map((op) => (
                      <Form.Check
                        type="checkbox"
                        className={` ${
                          errors.openedFor &&
                          touched.openedFor &&
                          "error_checkbox"
                        }`}
                        id={op.value}
                        label={op.title}
                        onChange={(e) => {
                          if (
                            e.target.checked &&
                            !values.openedFor.includes(e.target.id)
                          ) {
                            setFieldValue(
                              "openedFor",
                              values.openedFor.concat(e.target.id)
                            );
                          } else if (
                            !e.target.checked &&
                            values.openedFor.includes(e.target.id)
                          ) {
                            setFieldValue(
                              "openedFor",
                              values.openedFor.filter((i) => i !== e.target.id)
                            );
                          }
                        }}
                      />
                    ))}
                    <p className="text-danger">{errors.openedFor}</p>
                  </Form.Group>
                  {values.openedFor.includes("donate") && (
                    <Form.Group className="mt-2">
                      <Form.Label>Amount to be raised (in $)</Form.Label>
                      <Form.Control
                        className={` ${
                          errors.donationAmount &&
                          touched.donationAmount &&
                          "border-danger focus-danger error_focus"
                        }`}
                        type="number"
                        name="donationAmount"
                        onChange={handleChange}
                        required={values.openedFor.includes("donate")}
                        onBlur={handleBlur}
                        value={values.donationAmount}
                      />
                      <p className="text-danger">
                        {errors.donationAmount &&
                          touched.donationAmount &&
                          errors.donationAmount}
                      </p>
                    </Form.Group>
                  )}
                  {values.openedFor.includes("volunteer") && (
                    <>
                      <Form.Group className="mt-2">
                        <Form.Label>No of volunteers required:</Form.Label>
                        <Form.Control
                          className={` ${
                            errors.volunteerNumber &&
                            touched.volunteerNumber &&
                            "border-danger focus-danger error_focus"
                          }`}
                          type="number"
                          name="volunteerNumber"
                          onChange={handleChange}
                          required={values.openedFor.includes("volunteer")}
                          onBlur={handleBlur}
                          value={values.volunteerNumber}
                        />
                        <p className="text-danger">
                          {errors.volunteerNumber &&
                            touched.volunteerNumber &&
                            errors.volunteerNumber}
                        </p>
                      </Form.Group>

                      <Form.Group className="mt-2">
                        <Form.Label>Volunteer community link:</Form.Label>
                        <Form.Control
                          className={` ${
                            errors.volunteerCommunityLink &&
                            touched.volunteerCommunityLink &&
                            "border-danger focus-danger error_focus"
                          }`}
                          type="text"
                          name="volunteerCommunityLink"
                          onChange={handleChange}
                          required={values.openedFor.includes("volunteer")}
                          onBlur={handleBlur}
                          value={values.volunteerCommunityLink}
                        />
                        <p className="text-danger">
                          {errors.volunteerCommunityLink &&
                            touched.volunteerCommunityLink &&
                            errors.volunteerCommunityLink}
                        </p>
                      </Form.Group>
                    </>
                  )}
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
                <UploadModal
                  show={modalShow}
                  image={image}
                  loading={uploading}
                  onHide={() => setModalShow(false)}
                />
              </>
            )}
          </Formik>
        </Col>
      </Container>
    </>
  );
}

export default CreateProjectScreen;
