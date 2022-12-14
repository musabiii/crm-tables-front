import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/data-table";
import { IColumn } from "../models/models";
import { useLazyCreateClientQuery, useLazyDeleteClientQuery, useLazyGetClientsQuery, useLazyUpdateClientQuery } from "../store/crm.api";

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
  // const [fetchUpdateClient,{data:dataClient}] = useLazyUpdateClientQuery()

  // useEffect(() => {
  //   console.log("dataClient",dataClient)
  // }, [dataClient])


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
        fetchUpdate = {useLazyUpdateClientQuery}
        fetchCreate = {useLazyCreateClientQuery}
        fetchDelete = {useLazyDeleteClientQuery}
      />
    </div>
  );
}

