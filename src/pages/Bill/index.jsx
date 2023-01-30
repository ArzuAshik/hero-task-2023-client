import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewBill from "../../components/AddNewBill/AddNewBill";
import Button from "../../components/Button/Button";
import LoaderGlass from "../../components/Loader/LoaderGlass";
import Pagination from "../../components/Pagination/Pagination";
import Table from "../../components/Table/Table";
import { useGetBillsQuery } from "../../features/bill/billApi";
import { setPage } from "../../features/page/pageSlice";
import { setSearch } from "../../features/search/searchSlice";
import DefaultLayout from "../../layout/DefaultLayout";
import styles from "./style.module.css";

export default function Bill() {
  const [searchInput, setSearchInput] = useState("");

  const { page } = useSelector((state) => state.page);
  const { search } = useSelector((state) => state.search);
  const { isFetching, isError, data } = useGetBillsQuery({
    search,
    page,
  });
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleSearch = () => {
    dispatch(setSearch(searchInput));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    dispatch(setPage(1));
    dispatch(setSearch(""));
    setSearchInput("");
    setOpen(true);
  };

  if (isFetching)
    return (
      <DefaultLayout>
        <LoaderGlass fullScreen />
      </DefaultLayout>
    );

  if (!isFetching && isError)
    return (
      <DefaultLayout>
        <h2 style={{ color: "red", textAlign: "center" }}>Loading Failed.</h2>
      </DefaultLayout>
    );

  return (
    <DefaultLayout>
      {open && <AddNewBill handleClose={handleClose} open={open} />}
      <div className="container">
        <div className={styles.header}>
          <h3>Bill logs</h3>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onBlur={handleSearch}
            style={{
              flexGrow: 1,
              maxWidth: 400,
              padding: 4,
              marginRight: "auto",
            }}
            type="text"
            placeholder="Search"
          />
          <Button onClick={handleOpen} type="primary">
            Add New Bill
          </Button>
        </div>
        <Table data={data.data} />
        <Pagination count={data.totalPage} />
      </div>
    </DefaultLayout>
  );
}
