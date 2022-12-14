import { useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../components/data-table";
import { IColumn } from "../models/models";
import {
  useGetClientOptionsQuery,
  useGetServiceOptionsQuery,
  useLazyCreateDocumentQuery,
  useLazyDeleteDocumentQuery,
  useLazyGetClientOptionsQuery,
  useLazyGetDocumentsQuery,
  useLazyGetServicesQuery,
  useLazyUpdateDocumentQuery,
} from "../store/crm.api";

export default function Documents() {

      // const {data:clientOptionsData} = useGetClientOptionsQuery({title:'a'})
      // console.log("clientOptionsData",clientOptionsData);
      const {data:serviceOptionsData} = useGetServiceOptionsQuery({title:'M'})
      console.log("serviceOptionsData",serviceOptionsData);
      // useGetServiceOptionsQuery


  const columnsList: IColumn[] = [
    {
      title: "id",
      visible: true,
      width: 50,
    },
    {
      title: "date",
      visible: true,
      width: 200,
    },
    {
      title: "client_id",
      visible: false,
      width: 200,
    },
    {
      title: "service_id",
      visible: false,
      width: 200,
    },
    {
      title: "client_title",
      visible: true,
      width: 200,
      getOptions:useGetClientOptionsQuery
    },
    {
      title: "service_title",
      visible: true,
      width: 200,
      getOptions:useGetServiceOptionsQuery
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

  const [fetchData, { data }] = useLazyGetDocumentsQuery();
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
        fetchData={fetchData}
        data={data ?? []}
        changeVisibleColumns={changeVisible}
        fetchUpdate={useLazyUpdateDocumentQuery}
        fetchCreate={useLazyCreateDocumentQuery}
        fetchDelete = {useLazyDeleteDocumentQuery}
      />
    </div>
  );
}
