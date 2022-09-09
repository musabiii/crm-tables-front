import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Actions } from "../components/actions";
import DataTable from "../components/data-table";
import { EClientColumns, IClient, IColumn, TClient } from "../models/models";
import { useLazyGetClientsQuery } from "../store/crm.api";

export default function Clients() {



  const columnsList: IColumn[] = [
    {
      title: "id",
      visible: true,
      width:50
    },
    {
      title: "title",
      visible: true,
      width: 200
    },
    {
      title: "inn",
      visible: true,
      width: 200
    },
    {
      title: "phone",
      visible: true,
      width: 200
    },
    {
      title: "mail",
      visible: true,
      width: 200
    },
    {
      title: "address",
      visible: true,
      width: 200
    },
  ];

  const [columns, setColumns] = useState<IColumn[]>(columnsList);


  const changeVisible = (col: IColumn) => {
    setColumns((cols) => {
      const index = cols.findIndex((el) => el.title === col.title);
      cols[index] = col;
      return [...cols];
    });
  };

  const [fetchData, { data }] = useLazyGetClientsQuery();

  return (
    <div className="client page">
      <Link to="/" className="home-link">
        Home
      </Link>
      {/* <Actions columns={columns} changeVisible={changeVisible} handleShowModal = {()=>{}}/> */}
      <DataTable
        columns={columns}
        // lazyFetch = {useLazyGetClientsQuery}
        fetchData = {fetchData}
        data = {data??[]}
        changeVisibleColumns = {changeVisible}
      />
    </div>
  );
}

