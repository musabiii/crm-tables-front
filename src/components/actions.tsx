import React, { FC, useState } from "react";
import { EActionType, IColumn } from "../models/models";
import { ColumnsVisible } from "./columns-visible";
import { Modal } from "./modal";

interface ActionsProps {
  columns: IColumn[];
  changeVisible: Function;
  handleShowModal: Function;
  obj: object;
  fetchUpdate: Function;
  updateData: Function;
}

export const Actions: FC<ActionsProps> = ({
  columns,
  changeVisible,
  handleShowModal,
  obj,
  fetchUpdate,
  updateData,
}) => {
  const [showColumns, setShowColumns] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<EActionType>(EActionType.open);

  const handleVisible = () => {
    setShowColumns(!showColumns);
  };

  const handleOpen = () => {
    setActionType(EActionType.open);
    setShowModal(true);
  };

  const handleEdit = () => {
    setActionType(EActionType.edit);
    setShowModal(true);
  };

  const handleCreate = () => {
    setActionType(EActionType.create);
    setShowModal(true);
  };

  return (
    <div className="actions">
      <div className="open-action action" onClick={handleOpen}>
        open
      </div>
      <div className="edit-action action" onClick={handleEdit}>
        edit
      </div>
      <div className="create-action action" onClick={handleCreate}>
        create
      </div>

      <div className="visible-action action" onClick={handleVisible}>
        columns
      </div>

      {showColumns && (
        <ColumnsVisible
          columns={columns}
          changeVisible={changeVisible}
          setShowColumns={setShowColumns}
        />
      )}
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          obj={obj}
          actionType={actionType}
          fetchUpdate={fetchUpdate}
          updateData={updateData}
        />
      )}
    </div>
  );
};
