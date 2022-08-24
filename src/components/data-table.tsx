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
              <tr key={row.id}>
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
