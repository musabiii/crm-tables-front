import React, { useState } from "react";
import { IColumn } from "../models/models";

interface IDataTable {
  data: any[];
  columns: IColumn[];
}

export default function DataTable({ data, columns }: IDataTable) {

  const [selectedRow,setSelectedRow] = useState(0)

  // const [list,setList] = useState(data);

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

  return (
    <div className="data-table">
      <table >
        <thead>
          <tr>
            {columns.map(
              (col) => col.visible && <td key={col.title}>{col.title}</td>
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
