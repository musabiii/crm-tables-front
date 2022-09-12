import { FC } from "react";

interface ActionsProps {
  setShowColumns:Function
  handleOpen:Function
  handleEdit:Function
  handleCreate:Function
}

export const Actions: FC<ActionsProps> = ({
  setShowColumns,
  handleOpen,
  handleEdit,
  handleCreate
}) => {

  return (
    <div className="actions">
      <div className="open-action action" onClick={()=>handleOpen()}>
        open
      </div>
      <div className="edit-action action" onClick={()=>handleEdit()}>
        edit
      </div>
      <div className="create-action action" onClick={()=>handleCreate()}>
        create
      </div>

      <div className="visible-action action" onClick={()=>setShowColumns(true)}>
        columns
      </div>
    </div>
  );
};
