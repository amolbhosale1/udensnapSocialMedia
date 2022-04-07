import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Alert = () => {
  const { alerts } = useSelector(state => state.notifications);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);

 
  return show ? (
    <div className={`${alert.type || "error"}`}>
      <div>
        <div>{alert.message || ""}</div>
      </div>
    </div>
  ) : null;
};

export default Alert;

