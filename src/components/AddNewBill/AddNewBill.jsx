import React, { useState } from "react";
import { useSelector } from "react-redux";
import * as yup from "yup";
import {
  useAddBillMutation,
  useUpdateBillMutation
} from "../../features/bill/billApi";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";

const initialValue = { name: "", email: "", phone: "", paidAmount: "" };
const schema = yup.object({
  paidAmount: yup.number("Number only").min(1, "minimum bill 1tk"),
  phone: yup
    .string("")
    .required("phone is required")
    .min(11, "phone number should 11 digit")
    .max(11, "phone number should 11 digit")
    .matches(/^(?:\+88|88)?(01[3-9]\d{8})$/, "Invalid Phone Number."),
  email: yup.string("").required("email is required.").email("invalid email."),
  name: yup.string().required("name is required").min(4, "Name is too short"),
});

export default function AddNewBill({ open, handleClose, values }) {
  const { page } = useSelector((state) => state.page);
  const { search } = useSelector((state) => state.search);
  const [inputs, setInputs] = useState(values || initialValue);
  const [errors, setErrors] = useState("");
  const [handleSave] = useAddBillMutation();
  const [handleUpdate] = useUpdateBillMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    schema
      .validate(inputs)
      .then(() => {
        if (!values) handleSave({ ...inputs, page, search });
        else handleUpdate({ page, _id: values._id, body: inputs, search });
        setErrors("");
        handleClose();
      })
      .catch((err) => {
        setErrors(err?.errors[0]);
      });
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
          {errors && (
            <p style={{ color: "red", padding: 8, textAlign: "center" }}>
              {errors}
            </p>
          )}
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
