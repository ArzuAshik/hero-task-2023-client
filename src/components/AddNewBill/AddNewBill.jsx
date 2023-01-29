import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useAddBillMutation,
  useUpdateBillMutation
} from "../../features/bill/billApi";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";

const initialValue = { name: "", email: "", phone: "", paidAmount: "" };

export default function AddNewBill({ open, handleClose, values }) {
  const { page } = useSelector((state) => state.page);
  console.log(values);
  const [inputs, setInputs] = useState(values || initialValue);
  const [handleSave] = useAddBillMutation();
  const [handleUpdate] = useUpdateBillMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values) handleSave({ ...inputs, page });
    else handleUpdate({ page, _id: values._id, body: inputs, search: "" });
    handleClose();
  };

  const handleChange = (e) => {
    setInputs((currentValue) => {
      const newValue = { ...currentValue };
      newValue[e.target.name] = e.target.value;
      return newValue;
    });
  };

  if (!open) return null;

  return (
    <Modal onClose={handleClose} open={open}>
      <div>
        <h2>Add New Bill</h2>
        <form onSubmit={handleSubmit} style={{ minWidth: "50vw" }}>
          <Input
            value={inputs.name}
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Jhon Doe"
          />
          <Input
            value={inputs.email}
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="example@email.com"
          />
          <Input
            value={inputs.phone}
            onChange={handleChange}
            name="phone"
            type="text"
            placeholder="01xxxxxxxxx"
          />
          <Input
            value={inputs.paidAmount}
            name="paidAmount"
            onChange={handleChange}
            type="number"
            placeholder="Paid Amount"
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button submit type="success">
              Save
            </Button>
            <Button onClick={handleClose} type="danger">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
