import React from "react";

const base = {
  border: "none",
  outline: "none",
  padding: "4px 8px",
  borderRadius: "4px",
  background: "gray",
  color: "black",
  fontSize: "1rem",
  cursor: "pointer",
  minWidth: "80px",
};
const style = {
  default: { ...base },
  primary: { ...base, background: "#cffafe", color: "#0ea5e9" },
  danger: { ...base, background: "#fee2e2", color: "#ef4444" },
  success: { ...base, background: "#ecfccb", color: "#84cc16" },
};
export default function Button({
  children,
  onClick = () => {},
  type = "default",
  submit,
}) {
  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      style={style[type]}
    >
      {children}
    </button>
  );
}
