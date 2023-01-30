import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useRegisterMutation } from "../../features/auth/authApi";
import DefaultLayout from "../../layout/DefaultLayout";
import { errorAlert } from "../../utils";
import styles from "./style.module.css";

const initialValue = { name: "", email: "", password: "" };
const schema = yup.object({
  password: yup
    .string("")
    .required("password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least 1 lowercase character")
    .matches(/[A-Z]/, "Password must contain at least 1 uppercase character"),
  email: yup.string("").required("email is required.").email("invalid email."),
  name: yup.string().required("name is required").min(4, "Name is too short"),
});

export default function Register() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState(initialValue);
  const [handleRegister, { isLoading, isSuccess }] = useRegisterMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(inputs)
      .then(() => {
        handleRegister(inputs);
      })
      .catch((err) => {
        errorAlert(err?.errors[0]);
      });
  };

  const handleChange = (e) => {
    setInputs((currentValue) => {
      const newValue = { ...currentValue };
      newValue[e.target.name] = e.target.value;
      return newValue;
    });
  };

  const resetForm = () => {
    setInputs(initialValue);
  };

  useEffect(() => {
    if (!isSuccess) return;
    resetForm();
    navigate("/login");
  }, [isSuccess, navigate]);

  return (
    <DefaultLayout>
      <div className={styles.login}>
        <div className={styles.card}>
          <header className={styles.title}>Sign Up</header>
          <main className={styles.main}>
            <form onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                placeholder="Jhon Doe"
                name="name"
                value={inputs.name}
                onChange={handleChange}
              />
              <input
                className={styles.input}
                type="email"
                placeholder="example@mail.com"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <button disabled={isLoading} className={styles.btn} type="submit">
                Sign Up
              </button>
            </form>
          </main>
          <footer>
            <Link to="/login" className={styles.link}>
              Already have an account? Login
            </Link>
          </footer>
        </div>
      </div>
    </DefaultLayout>
  );
}
