import React, { FC, useState } from "react";
import { IColumn } from "../models/models";
import { ColumnsVisible } from "./columns-visible";

interface ActionsProps {
  columns: IColumn[];
  changeVisible:Function
}

export const Actions: FC<ActionsProps> = ({ columns,changeVisible }) => {
  const [showColumns, setShowColumns] = useState(false);

  const handleVisible = () => {
    setShowColumns(!showColumns);
  };

  return (
    <div className="actions">
      <div className="open-action action">open</div>
      <div className="edit-action action">edit</div>
      <div className="create-action action">create</div>

      <div className="visible-action action" onClick={handleVisible}>
        columns
      </div>

      {showColumns && <ColumnsVisible columns={columns} changeVisible={changeVisible} setShowColumns = {setShowColumns} />}
    </div>
  );
};
