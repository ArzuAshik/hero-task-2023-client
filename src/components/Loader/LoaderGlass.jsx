import React from "react";

export default function LoaderGlass({ fullScreen }) {
  if (fullScreen)
    return (
      <div
        style={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "lightgray",
        }}
      >
        <div className="lds-hourglass"></div>
      </div>
    );

  return <div className="lds-hourglass"></div>;
}
