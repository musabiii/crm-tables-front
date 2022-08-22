import React from "react";
import { IColumn } from "../models/models";

interface IDataTable {
  data: any[];
  columns: IColumn[];
}

export default function DataTable({ data, columns }: IDataTable) {
  return (
    <div>
      <table>
        <tr>{columns.map((col) => col.visible && <td>{col.title}</td>)}</tr>
        {data.map((row) => {
          return (
            <tr>
              {columns.map((col) => {
                return col.visible && <td>{row[col.title]}</td>;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
}
