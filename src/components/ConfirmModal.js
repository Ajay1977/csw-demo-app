import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export const ConfirmModal = (props) => {
  const { show, onClose, logout } = props;
  const [timeoutSeconds, setTimeoutSeconds] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingSeconds = timeoutSeconds - 1;
      setTimeoutSeconds(remainingSeconds);
      if (remainingSeconds === 0) {
        logout();
      }
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} centered>
        <Modal.Body>
          You will be logged out due to inactivity in {timeoutSeconds} seconds.
          Please click continue to avoid logging out.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClose} className="link-button">
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
