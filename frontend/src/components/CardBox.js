import React from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Icon from "./Icon";
import moment from "moment";
import Avatar from "./Avatar";
import ProgressBar from "react-customizable-progressbar";
import { LinkContainer } from "react-router-bootstrap";

function CardBox({ data }) {
  return (
    <LinkContainer to={`/project/${data._id}`}>
      <Card className=" my-4 card_box">
        <Card.Img
          variant="top"
          bsPrefix="card-img"
          src="https://risingnepaldaily.com/banner_image/5f0278f1db835_DRS_Melamchi1.jpg"
        />
        <Card.Body className="p-4">
          <Badge bg="success" size="lg" className="mb-2">
            {data.category}
          </Badge>
          <Card.Title className="flex-fill mb-0">{data.title}</Card.Title>

          <p className="text-secondary my-0 ">
            Posted On: {moment(data.createdAt).format("LL")}
          </p>
          {console.log(data.description.length)}
          <Card.Text style={{ textAlign: "justify" }}>
            {data.description.length > 95
              ? `${data.description.slice(0, 95)}....`
              : data.description}
          </Card.Text>
          <div className="d-flex align-items-center justify-content-between">
            {data.donationAmount && (
              <div className="d-flex align-items-center ">
                <ProgressBar
                  className="fs-8"
                  progress={(data.donatedAmount / data.donationAmount) * 100}
                  radius={25}
                  strokeWidth={6}
                  trackStrokeWidth={6}
                  strokeColor="#02a95c"
                >
                  <div className="indicator">
                    <div>
                      {(data.donatedAmount / data.donationAmount) * 100}%
                    </div>
                  </div>
                </ProgressBar>
                <div>
                  <p className="text-secondary mb-0">Raised</p>
                  <p className="mb-0 fs-5">
                    ${new Intl.NumberFormat().format(data.donatedAmount)}
                  </p>
                </div>
              </div>
            )}

            <div className="d-flex">
              {data.donationAmount && (
                <Icon
                  className="mx-0"
                  icon="far fa-horizontal-rule rotate-90"
                  size={3}
                  color="secondary"
                />
              )}
              <div>
                <p className="mb-0 fs-6 fw-normal text-secondary" sty>
                  Created By
                </p>
                <p className="mb-0 fw-light fs-5 ">{data?.user?.name}</p>
              </div>
            </div>
          </div>

          {/* <Link to={`/project/${data._id}`}>
          <p className="text-success ">View Post</p>
        </Link> */}
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default CardBox;
