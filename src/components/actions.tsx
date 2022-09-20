import { FC } from "react";

interface ActionsProps {
  setShowColumns:Function
  handleOpen:Function
  handleEdit:Function
  handleCreate:Function
  handleDelete:Function
  selectedRow:number
}

export const Actions: FC<ActionsProps> = ({
  setShowColumns,
  handleOpen,
  handleEdit,
  handleCreate,
  handleDelete,
  selectedRow
}) => {

  return (
    <div className="actions">
      <div className={`open-action ${selectedRow!==0?"action__active":""} action`} onClick={()=>handleOpen()}>
        open
      </div>
      <div className={`edit-action ${selectedRow!==0?"action__active":""} action`} onClick={()=>handleEdit()}>
        edit
      </div>
      <div className={`delete-action ${selectedRow!==0?"action__active":""} action`} onClick={()=>handleDelete()}>
        delete
      </div>
      <div className="create-action action__active action" onClick={()=>handleCreate()}>
        create
      </div>

      <div className="visible-action action__active action" onClick={()=>setShowColumns(true)}>
        columns
      </div>
    </div>
  );
};
