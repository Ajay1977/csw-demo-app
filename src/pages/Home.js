import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export const Home = () => {
  const authUserDetails = useSelector((state) => state.authUser);

  return (
    <div className="home-container">
      <Card>
        <Card.Body>
          <div className="row">
            <strong>Username:</strong>
            <span>{authUserDetails.username}</span>
          </div>
          <div className="row">
            <strong>Email ID:</strong>
            <span>{authUserDetails.emailId}</span>
          </div>
          <div className="row">
            <strong>Full Name:</strong>
            <span>{authUserDetails.fullName}</span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
