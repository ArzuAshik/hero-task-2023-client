import React from "react";
import styles from "./style.module.css";

export default function Input({
  type = "text",
  placeholder = "",
  onChange = () => {},
  value = "",
  name = "",
}) {
  return (
    <input
      className={styles.input}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}
