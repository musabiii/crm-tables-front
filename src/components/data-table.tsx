import React, { useEffect, useState } from "react";
import { EActionType, EOrder, IColumn, IRowBase } from "../models/models";
import { Actions } from "./actions";
import { ColumnsVisible } from "./columns-visible";
import { Filter } from "./filter";
import { Modal } from "./modal";
import { Pagination } from "./pagination";

interface IDataTable {
  columns: IColumn[];
  fetchData: Function;
  data: any[];
  changeVisibleColumns: Function;
  fetchUpdate:Function
}

export default function DataTable(props: IDataTable): JSX.Element {
  const { columns, fetchData, data, changeVisibleColumns,fetchUpdate } = props;

  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedRowObj, setSelectedRowObj] = useState({});

  const [sortCol, setSortCol] = useState("id");
  const [order, setOrder] = useState<EOrder>(EOrder.asc);
  const [filterCol, setFilterCol] = useState("id");
  const [filterCompare, setFilterCompare] = useState("=");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState(false);

  const [showColumns, setShowColumns] = useState(false);

  const [actionType, setActionType] = useState<EActionType>(EActionType.open);



  const fetchOptions = () => {
    return {
      sortCol,
      order,
      filterCol,
      filterCompare,
      filterValue,
      page,
    };
  };

  // const [fetchUpdateDirect,{data:dataRow}] = fetchUpdate()

  // useEffect(() => {
  //   console.log(dataRow)
  //   fetchData(fetchOptions());
  // }, [dataRow])


  useEffect(() => {
    console.log("use effect [fetch]Data(fetchOptions()");
    fetchData(fetchOptions());
    setSelectedRow(0);
  }, [sortCol, order, filterCol, filterCompare, filterValue, page]);

  useEffect(() => {
    fetchData(fetchOptions());
  }, []);

  const sortType = (col: string) => {
    if (sortCol === col) {
      return order;
    }
    return null;
  };

  useEffect(() => {
    if (selectedRow) {
      const selectedObj = data.find((el) => el.id === selectedRow);
      setSelectedRowObj(selectedObj);
    } else {
      setSelectedRowObj({});
    }
  }, [selectedRow]);

  const handleClickRow = (
    e: React.MouseEvent<HTMLTableRowElement>,
    id: number
  ) => {
    console.log(e.detail);
    console.log(e.currentTarget);
    const selectObj = data.find((el) => el.id === id);
    console.log(selectObj);
    if (e.detail === 2) {
    }

    if (id === selectedRow) {
      setSelectedRow(0);
    } else {
      setSelectedRow(id);
    }
  };

  const handleSetSort = (col: string) => {
    if (col === sortCol) {
      setOrder(order === EOrder.asc ? EOrder.desc : EOrder.asc);
    } else {
      setOrder(EOrder.asc);
      setSortCol(col);
    }
  };


      const handleOpen = () => {
        if (selectedRow>0) {
          setActionType(EActionType.open);
          setShowModal(true);
        }
      };

      const handleEdit = () => {
        if (selectedRow>0) {
          setActionType(EActionType.edit);
          setShowModal(true);
        }
      };

      const handleCreate = () => {
        setActionType(EActionType.create);
        setShowModal(true);
      };



  return (
    <div>
      <Actions
        setShowColumns = {setShowColumns}
        handleOpen ={handleOpen}
        handleEdit ={handleEdit}
        handleCreate ={handleCreate}
      />
      {/* {showModal && <Modal/>} */}
      <Filter
        columns={columns}
        filterCol={filterCol}
        filterCompare={filterCompare}
        filterValue={filterValue}
        setFilterCol={setFilterCol}
        setFilterCompare={setFilterCompare}
        setFilterValue={setFilterValue}
      />

      <div className="data-table">
        <table>
          <thead>
            <tr>
              {columns.map(
                (col) =>
                  col.visible && (
                    <th
                      onClick={() => handleSetSort(col.title)}
                      key={col.title}
                      style={{width:col.width,maxWidth:col.width}}
                    >
                      {col.title}
                      <SortBlock sortType={sortType(col.title)} />
                    </th>
                  )
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={`table-row ${
                    selectedRow === row.id ? "table-row-selected" : ""
                  }`}
                  onClick={(e) => handleClickRow(e, row.id)}
                >
                  {columns.map((col) => {
                    return (
                      col.visible && <td   style={{width:col.width}} key={col.title}>{row[col.title]}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showColumns && (
        <ColumnsVisible
          columns={columns}
          changeVisible={changeVisibleColumns}
          setShowColumns={setShowColumns}
        />
      )}


      {showModal && (
        <Modal
          setShowModal={setShowModal}
          obj={selectedRowObj}
          actionType={actionType}
          fetchUpdate={fetchUpdate}
          updateData = {()=>fetchData(fetchOptions())}
        />
      )}

      <Pagination
        page={page}
        setPage={setPage}
        infinityScroll={false}
        handleChangeInfinityScroll={() => {}}
      />
    </div>
  );
}

function SortBlock({ sortType }: any) {
  return (
    <span className="sort-block">
      <span className={sortType === EOrder.asc ? "arr-ordered" : "arr"}>
        &#8595;
      </span>
      <span className={sortType === EOrder.desc ? "arr-ordered" : "arr"}>
        &#8593;
      </span>
    </span>
  );
}
