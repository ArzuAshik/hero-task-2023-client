import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { userLoggedOut } from "../../features/auth/authSlice";
import { useGetBillsQuery } from "../../features/bill/billApi";
import styles from "./style.module.css";

export default function DefaultLayout({ children }) {
  const { page } = useSelector((state) => state.page);
  const { search } = useSelector((state) => state.search);
  const { isFetching, isError, data } = useGetBillsQuery({
    search,
    page,
  });
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <header className={styles.header}>
        <h2>
          <Link to="/">Power-Hack</Link>
        </h2>
        {accessToken && (
          <>
            {!isFetching && isError ? (
              <h4>Paid Total: Loading Failed.</h4>
            ) : (
              <h4>Paid Total: {isFetching ? "Loading" : data?.paidTotal}</h4>
            )}
            <Button
              onClick={() => {
                dispatch(userLoggedOut());
              }}
              type="danger"
            >
              Logout
            </Button>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
