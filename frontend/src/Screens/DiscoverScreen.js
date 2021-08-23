import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CardBox from "../components/CardBox";
import NavBar from "../components/Navbar";
import { category, countryList, openedFor } from "../constants/data";

function DiscoverScreen() {
  const search = window.location.search.split("=")[1];
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [location, setLocation] = useState();
  const { projectList } = useSelector((state) => state.projects);
  

  const filteredProject = projectList?.filter((project) => {
    if (categoryFilter.length > 0) {
      if (
        location &&
        categoryFilter.includes(
          project.category.replace(/\s+/g, "").toLowerCase()
        ).location === location
      ) {
        return true;
      }
      if (
        categoryFilter.includes(
          project.category.replace(/\s+/g, "").toLowerCase()
        )
      ) {
        return true;
      }
    } else if (location) {
      if (project.location === location && typeFilter.length > 0) {
        const value = typeFilter.map((val) => project.openedFor.includes(val));

        return value[0] === true || value[1] === true || value[2] === true;
      } else if (location === project.location) {
        return true;
      }
    } else if (typeFilter.length > 0) {
      const value = typeFilter.map((val) => project.openedFor.includes(val));

      return value[0] === true || value[1] === true || value[2] === true;
    }
    return false;
  });

  console.log(filteredProject)

  const handleClear = () => {
      document.querySelectorAll('input[type="checkbox"]').forEach(val => val.checked = false)
    setLocation("");
    setTypeFilter([]);
    setCategoryFilter([]);
 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    category.forEach((cat) => {
      document.getElementById(
        cat.replace(/\s+/g, "").toLowerCase()
      ).checked = false;
    });
    if (search) document.getElementById(search).checked = true;
    search && setCategoryFilter([search]);
  }, [search]);

  return (
    <>
      <NavBar />
      <Container className="mt-5 py-5">
        <Row>
          <Col md={4}>
            <div className="bg-tan p-4 rounded-3">
              <h3>Filter By</h3>
              <div className="">
                <Form>
                  <Form.Group className="py-3 border border-start-0 border-end-0 border-muted">
                    <Form.Label className="fw-bold">Category</Form.Label>
                    {category.map((op) => (
                      <Form.Check
                        type="checkbox"
                        id={op.replace(/\s+/g, "").toLowerCase()}
                        label={op}
                        onChange={(e) => {
                          if (
                            e.target.checked &&
                            !categoryFilter.includes(e.target.id)
                          ) {
                            setCategoryFilter(
                              categoryFilter.concat(e.target.id)
                            );
                          } else if (
                            !e.target.checked &&
                            categoryFilter.includes(e.target.id)
                          ) {
                            setCategoryFilter(
                              categoryFilter.filter((i) => i !== e.target.id)
                            );
                          }
                        }}
                      />
                    ))}
                  </Form.Group>
                  <Form.Group className="py-3 pb-4 border border-start-0 border-top-0 border-end-0 border-muted">
                    <Form.Label className="fw-bold">Location</Form.Label>
                    <Form.Select
                      aria-label="location of your project"
                      name="location"
                      value={location}
                      required
                      onChange={(e) =>
                        e.target.value === "Choose your country"
                          ? setLocation("")
                          : setLocation(e.target.value)
                      }
                    >
                      <option>Choose your country</option>

                      {countryList.map((data) => (
                        <option value={data}>{data}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="py-3   border-muted">
                    <Form.Label className="fw-bold">Project Type</Form.Label>
                    {openedFor.map((op) => (
                      <Form.Check
                        type="checkbox"
                        id={op.value}
                        label={op.title}
                        onChange={(e) => {
                          if (
                            e.target.checked &&
                            !typeFilter.includes(e.target.id)
                          ) {
                            setTypeFilter(typeFilter.concat(e.target.id));
                          } else if (
                            !e.target.checked &&
                            typeFilter.includes(e.target.id)
                          ) {
                            setTypeFilter(
                              typeFilter.filter((i) => i !== e.target.id)
                            );
                          }
                        }}
                      />
                    ))}
                  </Form.Group>
                  <Button variant="danger" onClick={handleClear}>
                    Clear All Filters
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
          <Col md={8}>
            <Row md={3} className="gx-3  mb-5  ">
              {filteredProject.length >0 &&
              (categoryFilter.length > 0 || location || typeFilter.length > 0)
                ? filteredProject.map((project) => (
                    <Col className="mb-4">
                      <CardBox data={project} />
                    </Col>
                  ))
                : projectList?.map((project) => (
                    <Col className="mb-4">
                      <CardBox data={project} />
                    </Col>
                  ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DiscoverScreen;
