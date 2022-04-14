import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CSWLogo from "../../assets/images/logo1.webp";
import { useIdleTimer } from "../../helpers/useIdleTimer";
import {
  setLogoutStatus,
  setAuthUserDetails,
} from "../../redux/actions/authUserActions";
import { setSelectedUser } from "../../redux/actions/userListActions";
import { ConfirmModal } from "../ConfirmModal";

export const CSWNavbar = (props) => {
  const { navList } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authUserDetails = useSelector((state) => state.authUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleTimeout = () => {
    setShowLogoutModal(true);
  };

  const timer = useIdleTimer({
    timeout: 59,
    onTimeout: handleTimeout,
  });

  const logout = () => {
    window.localStorage.clear();
    dispatch(setLogoutStatus());
    dispatch(setSelectedUser(""));
    timer.destroyTimer();
    navigate("/");
  };

  const handleContinueLogin = () => {
    timer.destroyTimer();
    timer.initTimer();
    setShowLogoutModal(false);
  };

  useEffect(() => {
    if (!!authUserDetails) {
      const storedUserDetails =
        localStorage.getItem("googleUserDetails") &&
        JSON.parse(localStorage.getItem("googleUserDetails"));
      if (storedUserDetails) {
        dispatch(setAuthUserDetails(storedUserDetails));
      } else {
        logout();
      }
    }
    timer.initTimer();
  }, []);

  const userProfile = () => {
    return (
      <div className="navbar-user-profile">
        <img
          src={authUserDetails.profilePic}
          alt="user-profile-pic"
          referrerPolicy="no-referrer"
        />
        {authUserDetails.username}
      </div>
    );
  };

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand to="/" className="navbar-logo">
            <img src={CSWLogo} alt="CSW Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {navList.map((navItem, index) => (
                <Link
                  to={navItem.path}
                  key={`${navItem.id}_${index}`}
                  className={`navbar-nav-link ${
                    location.pathname === navItem.path && "active"
                  }`}
                >
                  {navItem.name}
                </Link>
              ))}
            </Nav>
            <Nav>
              <NavDropdown title={userProfile()} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showLogoutModal ? (
        <ConfirmModal
          logout={logout}
          show={showLogoutModal}
          onClose={handleContinueLogin}
        />
      ) : null}
    </>
  );
};
