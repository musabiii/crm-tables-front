import React, { FC, useState } from "react";
import { IColumn } from "../models/models";
import { ColumnsVisible } from "./columns-visible";
import { Modal } from "./modal";

interface ActionsProps {
  columns: IColumn[];
  changeVisible:Function
  handleShowModal:Function
}

export const Actions: FC<ActionsProps> = ({ columns,changeVisible,handleShowModal }) => {
  const [showColumns, setShowColumns] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVisible = () => {
    setShowColumns(!showColumns);
  };

  const handleOpen = () => {
    // setShowModal(!showModal);
    handleShowModal()
  }

  return (
    <div className="actions">
      <div
      className="open-action action"
      onClick={handleOpen}
      >open</div>
      <div className="edit-action action">edit</div>
      <div className="create-action action">create</div>

      <div className="visible-action action" onClick={handleVisible}>
        columns
      </div>

      {showColumns && <ColumnsVisible columns={columns} changeVisible={changeVisible} setShowColumns = {setShowColumns} />}
      {showModal && <Modal/>}
    </div>
  );
};
