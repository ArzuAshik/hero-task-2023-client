import React, { useState } from "react";
import UpdateBill from "../AddNewBill/AddNewBill";
import Button from "../Button/Button";
import LoaderDot from "../Loader/LoaderDot";
import styles from "./style.module.css";

export default function Row({ item }) {
  const { _id: id, name, email, phone, paidAmount, loading } = item;
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open && (
        <UpdateBill values={item} handleClose={handleClose} open={open} />
      )}
      <tr>
        <td className={styles.cell}>
          {loading ? (
            <div style={{ textAlign: "center" }}>
              <LoaderDot />
            </div>
          ) : (
            id
          )}
        </td>
        <td className={styles.cell}>{name}</td>
        <td className={styles.cell}>{email}</td>
        <td className={styles.cell}>{phone}</td>
        <td className={styles.cell}>{paidAmount}</td>
        <td className={styles.actionCell}>
          <Button type="primary" onClick={() => setOpen(true)}>
            Edit
          </Button>
        </td>
        <td className={styles.actionCell}>
          <Button type="danger">Delete</Button>
        </td>
      </tr>
    </>
  );
}
