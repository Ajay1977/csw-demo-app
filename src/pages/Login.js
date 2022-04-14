import React, { useState } from "react";
import { Button } from "react-bootstrap";
// import { FacebookLogin } from "react-facebook-login";
import { Google } from "react-bootstrap-icons";
import GoogleLogin, { GoogleLogout, useGoogleLogout } from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleAuth } from "../helpers/useGoogleAuth";
import { setAuthUserDetails } from "../redux/actions/authUserActions";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onSignIn = (response) => {
    const { profileObj } = response;
    setError(false);

    if (profileObj) {
      dispatch(setAuthUserDetails(response.profileObj));
      localStorage.setItem(
        "googleUserDetails",
        JSON.stringify(response.profileObj)
      );
      navigate("/home");
    } else {
      setError(true);
    }
  };

  const { signIn } = useGoogleAuth({
    onSignIn: onSignIn,
  });

  return (
    <div className="container login-container">
      {!error && <h5>Please sign-in to proceed further.</h5>}
      <Button onClick={signIn} className="login-btn">
        <Google />
        Login
      </Button>
      {error && (
        <h5 style={{ color: "red", marginTop: "10px" }}>
          There is some issue while signing in. Please try again later
        </h5>
      )}
      {/* <Button onClick={signOut} className="login-btn">
        Logout
      </Button> */}
    </div>
  );
};
