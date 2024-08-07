import React from "react";
const Alert = (props) => {
  const Capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <>
      <div style={{ height: "auto" }}>
        {props.alert && (
          <div
            className={`alert alert-${props.alert.type} alert-dismissable fade show`}
            role="alert"
          >
            <strong>{Capitalize(props.alert.type)}:</strong>{" "}
            <span style={{ fontSize: "1.2em", fontWeight: "bolder" }}>
              {props.alert.msg}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Alert;
