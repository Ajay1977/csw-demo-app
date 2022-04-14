import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, setUserList } from "../redux/actions/userListActions";
import StaticUserData from "../assets/data/userList.json";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";

export const UserDetails = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.usersList.selectedUser);
  const [showFormatted, setShowFormatted] = useState(true);

  useEffect(() => {
    if (userDetails === undefined || userDetails?.id === undefined) {
      const storedUserId = localStorage.getItem("selectedUserId");
      if (storedUserId) {
        dispatch(setUserList(StaticUserData));
        dispatch(setSelectedUser(storedUserId));
        localStorage.setItem("selectedUserId", storedUserId);
      }
    }
  }, []);

  return (
    <div className="home-container">
      <Card>
        <Card.Body>
          {userDetails && userDetails.id ? (
            <>
              <Button
                className="home-button"
                onClick={() => setShowFormatted(!showFormatted)}
              >
                Show {showFormatted ? "JSON" : "Formatted"}
              </Button>
              {showFormatted
                ? Object.keys(userDetails).map((userDetailsKey, index) => (
                    <div className="row" key={`${userDetails.id}_${index}`}>
                      <strong>{userDetailsKey.toUpperCase()}:</strong>
                      <span>{userDetails[userDetailsKey]}</span>
                    </div>
                  ))
                : JSON.stringify(userDetails)}
            </>
          ) : (
            <>
              <h5>
                Please select any user from User's List to view the details
              </h5>
              <Link to="/list" className="link-btn btn btn-primary">
                Go to User's List
                <ArrowRight />
              </Link>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
