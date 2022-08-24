import React, { useState } from "react";
import { Link } from "react-router-dom";
import Actions from "../components/actions";
import DataTable from "../components/data-table";
import { Filter } from "../components/filter";
import { Pagination } from "../components/pagination";
import Search from "../components/search";
import { useGetClientsQuery } from "../store/crm.api";
import { EOrder, IColumn } from "../models/models";
import { Sort } from "../components/sort";

export default function Clients() {
  const [sortCol, setSortCol] = useState("id");
  const [order, setOrder] = useState<EOrder>(EOrder.asc);
  const [filterCol, setFilterCol] = useState("id");
  const [filterCompare, setFilterCompare] = useState("=");
  const [filterValue, setFilterValue] = useState("");

  const [page, setPage] = useState(1);




  const { data } = useGetClientsQuery({
    sortCol,
    order,
    filterCol,
    filterCompare,
    filterValue,
    page,
  });

  const columns: IColumn[] = [
    {
      title: "id",
      visible: true,
    },
    {
      title: "title",
      visible: true,
    },
    {
      title: "inn",
      visible: true,
    },
    {
      title: "phone",
      visible: true,
    },
    {
      title: "mail",
      visible: true,
    },
    {
      title: "address",
      visible: true,
    },
  ];

  return (
    <div className="client page">
      <Link to="/" className="home-link">Home</Link>
      <Filter
        columns={columns}
        filterCol={filterCol}
        filterCompare={filterCompare}
        filterValue={filterValue}
        setFilterCol={setFilterCol}
        setFilterCompare={setFilterCompare}
        setFilterValue={setFilterValue}
      />
      <Sort
        sortCol={sortCol}
        order={order}
        setSortCol={setSortCol}
        setOrder={setOrder}
        columns={columns}
      />
      <Actions />
      <DataTable data={data ?? []} columns={columns} />
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
