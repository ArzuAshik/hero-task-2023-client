import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteBillMutation } from "../../features/bill/billApi";
import UpdateBill from "../AddNewBill/AddNewBill";
import Button from "../Button/Button";
import LoaderDot from "../Loader/LoaderDot";
import Modal from "../Modal/Modal";
import styles from "./style.module.css";

export default function Row({ item }) {
  const { _id: id, name, email, phone, paidAmount, loading } = item;
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { search } = useSelector((state) => state.search);
  const { page } = useSelector((state) => state.page);
  const [deleteBill] = useDeleteBillMutation();

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setDeleteModal(false);
    deleteBill({ _id: id, page, search });
  };

  return (
    <>
      {open && (
        <UpdateBill values={item} handleClose={handleClose} open={open} />
      )}
      {deleteModal && (
        <Modal
          values={item}
          handleClose={() => setDeleteModal(false)}
          open={deleteModal}
        >
          <div>
            <h2>Are You Sure want to Delete?</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 16,
              }}
            >
              <Button onClick={() => setDeleteModal(false)} type="danger">
                No
              </Button>
              <Button onClick={handleDelete} type="success">
                Yes
              </Button>
            </div>
          </div>
        </Modal>
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
          <Button type="danger" onClick={() => setDeleteModal(true)}>
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}
