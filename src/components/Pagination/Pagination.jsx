import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/page/pageSlice";
import Button from "../Button/Button";
import styles from "./style.module.css";

export default function Pagination({ count = 0 }) {
  const list = new Array(count).fill(0);

  const { page } = useSelector((state) => state.page);
  const dispatch = useDispatch();

  const navigatePage = (page) => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={styles.container}>
      {list.map((_, index) => (
        <span
          className={Number(page) === index + 1 ? styles.active : ""}
          key={index}
          onClick={() => navigatePage(index)}
        >
          <Button>{index + 1}</Button>
        </span>
      ))}
    </div>
  );
}
