import React, { FC, useEffect } from "react";
import { IColumn } from "../models/models";

interface ActionsProps {
  columns: IColumn[];
  changeVisible: Function;
  setShowColumns: Function;
}

export const ColumnsVisible: FC<ActionsProps> = ({
  columns,
  changeVisible,
  setShowColumns,
}) => {
  return (
    <div className="columns-visible">
      <div
        className="columns-visible-back"
        onClick={() => setShowColumns(false)}
      ></div>
      <div className="columns-visible-box">
        <div className="exit-flex">
          <div className="exit-btn" onClick={() => setShowColumns(false)}>
            X
          </div>
        </div>
        {columns.map((col) => {
          return (
            <div key={col.title}>
              <p>
                <input
                  type="checkbox"
                  checked={col.visible}
                  name=""
                  id={col.title}
                  onChange={() =>
                    changeVisible({ title: col.title, visible: !col.visible })
                  }
                />
                <label htmlFor={col.title}>{col.title}</label>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
