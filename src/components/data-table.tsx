import React, { useState } from "react";
import { EOrder, IColumn } from "../models/models";

interface IDataTable {
  data: any[];
  columns: IColumn[];
  sortCol: string;
  order: EOrder;
  setSortCol: Function;
  setOrder: Function;
}

export default function DataTable({ data, columns,sortCol,order,setSortCol,setOrder}: IDataTable) {

  const [selectedRow,setSelectedRow] = useState(0)

  // const [list,setList] = useState(data);

  const sortType = (col:string) => {
    if (sortCol === col) {
      return order;
    }
    return null;
  }

  const handleClickRow = (e:React.MouseEvent<HTMLTableRowElement>,id:number) => {
    console.log(e.detail);
    if (e.detail === 2) {

    }

    if (id===selectedRow) {
      setSelectedRow(0)
    } else {
      setSelectedRow(id)
    }
  }

  const handleSetSort = (col:string) => {
    if (col===sortCol) {
      setOrder(order === EOrder.asc?EOrder.desc:EOrder.asc)
    } else {
      setOrder(EOrder.asc)
      setSortCol(col)
    }
  }

  return (
    <div className="data-table">
      <table >
        <thead>
          <tr>
            {columns.map(
              (col) => col.visible && <td onClick={()=>handleSetSort(col.title)} key={col.title}>{col.title}<SortBlock sortType={sortType(col.title)} /></td>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id} className={`table-row ${selectedRow===row.id?"table-row-selected":""}`} onClick={(e)=>handleClickRow(e,row.id)}>
                {columns.map((col) => {
                  return (
                    col.visible && <td key={col.title}>{row[col.title]}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}


function SortBlock({sortType}:any) {

  return (
  <span className="sort-block" ><span className={sortType===EOrder.asc?'arr-ordered':'arr'}>&#8595;</span><span className={sortType===EOrder.desc?'arr-ordered':'arr'}>&#8593;</span></span>
  )
}