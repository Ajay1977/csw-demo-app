import { useGoogleLogin, useGoogleLogout } from "react-google-login";

export const useGoogleAuth = ({ onSignIn, onSignOut }) => {
  const handleLogin = (response) => {
    return onSignIn(response);
  };

  const handleLogout = (response) => {
    return onSignOut(response);
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onSuccess: handleLogin,
    onFailure: handleLogin,
  });

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: handleLogout,
    onFailure: handleLogout,
  });

  return {
    signIn,
    signOut,
  };
};
