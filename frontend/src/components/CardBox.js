import React from "react";
import { Badge, Button, Card, ProgressBar } from "react-bootstrap";


import { LinkContainer } from "react-router-bootstrap";

function CardBox({ data }) {
  return (
    <LinkContainer to={`/project/${data?._id}`}>
      <Card className=" card_box h-100">
        <Card.Img variant="top" bsPrefix="card-img" style={{maxHeight: '12rem',objectFit: "cover", objectPosition:"top"}} src={data?.imageLink} />
        <Card.Body className="p-3">
          <p className="fw-bolder text-success mb-0 fs-7">{data?.location}</p>

          <Card.Title className="flex-fill mb-0 text-truncate">
            {data?.title}
          </Card.Title>

          <Card.Text
            className="fw-light fs-7 my-2"
            style={{ textAlign: "justify" }}
          >
            {data?.description.length > 95
              ? `${data?.description.slice(0, 95)}...`
              : data?.description}
          </Card.Text>

          <div className="mb-2">
            <Badge className="me-2" bg="success">
              {data?.openedFor.includes("donate") && "Donation"}
            </Badge>
            <Badge className="me-2" bg="warning">
              {data?.openedFor.includes("sponsor") && "Sponsorship"}
            </Badge>
            <Badge className="me-2" bg="primary">
              {data?.openedFor.includes("volunteer") && "Volunteering"}
            </Badge>
          </div>

          {data?.donationAmount && (
            <div className="">
              <ProgressBar
                now={(data?.donatedAmount / data?.donationAmount) * 100}
                variant="success"
                className="rounded-pill"
              />
              <p className="fw-light fs-6 mb-0">
                <span className="fw-bold">${data?.donatedAmount} raised </span>
                of ${data?.donationAmount}
              </p>
            </div>
          )}

          {/* <Link to={`/project/${data._id}`}>
          <p className="text-success ">View Post</p>
        </Link> */}
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default CardBox;
