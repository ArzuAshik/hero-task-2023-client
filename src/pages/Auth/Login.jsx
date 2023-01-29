import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import DefaultLayout from "../../layout/DefaultLayout";
import styles from "./style.module.css";

export default function Login() {
  const [handleLogin, { isSuccess }] = useLoginMutation();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(inputs);
  };

  const handleChange = (e) => {
    setInputs((currentValue) => {
      const newValue = { ...currentValue };
      newValue[e.target.name] = e.target.value;
      return newValue;
    });
  };

  useEffect(() => {
    if (!isSuccess) return;
    navigate("/");
  }, [isSuccess, navigate]);

  return (
    <DefaultLayout>
      <div className={styles.login}>
        <div className={styles.card}>
          <header className={styles.title}>Login</header>
          <main className={styles.main}>
            <form onSubmit={handleSubmit}>
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
              <button className={styles.btn} type="submit">
                Login
              </button>
            </form>
          </main>
          <footer>
            <Link to="/register" className={styles.link}>
              Don't have an account? Sign Up
            </Link>
          </footer>
        </div>
      </div>
    </DefaultLayout>
  );
}
