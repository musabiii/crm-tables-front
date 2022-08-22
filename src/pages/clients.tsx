import React from "react";
import { Link } from "react-router-dom";
import Actions from "../components/actions";
import DataTable from "../components/data-table";
import Filter from "../components/filter";
import Pagination from "../components/pagination";
import Search from "../components/search";
import { useGetClientsQuery, useLazyGetClientsQuery } from "../store/crm.api";
import {IColumn} from '../models/models'
import Sort from "../components/sort";

export default function Clients() {
  // const [fetchClients, { data, isFetching }] = useLazyGetClientsQuery();

  const { data } = useGetClientsQuery(null);



  const columns:IColumn[] = [
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
    <div>
      <Link to="/">Home</Link>
      <Search />
      <Filter />
      <Sort/>
      <Actions />
      <DataTable
        data={data ?? []}
        columns={columns}
      />
      <Pagination />
    </div>
  );
}
