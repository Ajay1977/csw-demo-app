export const useIdleTimer = ({ timeout, onTimeout }) => {
  let timerInterval;

  const handleUserActivity = () => {
    updateTimer();
  };

  const startTimer = () => {
    updateTimer();
    timerInterval = setInterval(() => {
      if (Date.now() > getTimer()) {
        onTimeout();
        destroyTimer();
      }
    }, 1000);
  };

  const initTimer = () => {
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("scroll", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    startTimer();
  };

  const updateTimer = () =>
    localStorage.setItem("_expiryLimit", Date.now() + timeout * 1000);

  const getTimer = () =>
    parseInt(localStorage.getItem("_expiryLimit") || 0, 10);

  const destroyTimer = () => {
    clearInterval(timerInterval);
    localStorage.removeItem("_expiryLimit");
    window.removeEventListener("mousemove", handleUserActivity);
    window.removeEventListener("scroll", handleUserActivity);
    window.removeEventListener("keydown", handleUserActivity);
    window.removeEventListener("click", handleUserActivity);
  };

  return {
    initTimer,
    destroyTimer,
  };
};
