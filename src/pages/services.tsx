import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/data-table";
import { IColumn } from "../models/models";
import { useLazyCreateServiceQuery, useLazyDeleteServiceQuery, useLazyGetServicesQuery, useLazyUpdateServiceQuery } from "../store/crm.api";

export default function Services() {



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
      title: "price",
      visible: true,
      width: 200
    },
    {
      title: "duration",
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

  const [fetchData, { data }] = useLazyGetServicesQuery();
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
        fetchUpdate = {useLazyUpdateServiceQuery}
        fetchCreate = {useLazyCreateServiceQuery}
        fetchDelete = {useLazyDeleteServiceQuery}
      />
    </div>
  );
}

