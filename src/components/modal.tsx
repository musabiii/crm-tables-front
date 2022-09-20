import React, { FC, useEffect, useState } from "react";
import { EActionType, IColumn, IOption } from "../models/models";
import { ModalList } from "./modal-list";

interface IModal {
  setShowModal: Function;
  obj: object;
  actionType: EActionType;
  fetchUpdate: Function;
  fetchCreate: Function;
  fetchDelete: Function;
  updateData: Function;
  createProps: string[];
  columns: IColumn[];
}

export const Modal: FC<IModal> = ({
  setShowModal,
  obj,
  actionType,
  fetchUpdate,
  fetchDelete,
  updateData,
  createProps,
  fetchCreate,
  columns,
}) => {
  const baseObject = actionType === EActionType.create ? {} : obj;
  const [editObj, setEditObj] = useState(baseObject);
  const [disabled, setDisabled] = useState(false);
  const [focusRow, setFocusRow] = useState<string>("");

  const [fetchUpdateDirect, { isFulfilled, isLoading, data }] = fetchUpdate();
  const [fetchCreateDirect, { data: createData }] = fetchCreate();
  const [fetchDeleteDirect, { data: deleteData }] = fetchDelete();

  useEffect(() => {
    updateData();
    if (data) {
      setShowModal(false);
    }
  }, [data]);

  useEffect(() => {
    console.log("createData", createData);
    if (createData) {
      setShowModal(false);
    }
  }, [createData]);

  useEffect(() => {
    updateData();
    if (deleteData) {
      setShowModal(false);
    }
  }, [deleteData]);

  const handleChangeInput = (
    e: React.SyntheticEvent<HTMLInputElement>,
    el: keyof object
  ) => {
    console.log(e.currentTarget.value, el);
    let newObj: any = {};
    newObj[el] = e.currentTarget.value;
    newObj = { ...editObj, ...newObj };
    setEditObj(newObj);
  };

  const handleFocusInput = (
    e: React.SyntheticEvent<HTMLInputElement>,
    title: string
  ) => {
    setFocusRow(title);
    if (title.endsWith("_title")) {
      console.log("focus input");
      console.log(editObj[title as keyof object]);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (actionType === EActionType.edit) {
      fetchUpdateDirect(editObj);
    } else if (actionType === EActionType.create) {
      createProps.forEach((el) => {
        if (
          !editObj[el as keyof object] &&
          editObj[el as keyof object] !== "id"
        ) {
          console.log("fill", el);
        }
      });

      fetchCreateDirect(editObj);
    } else if (actionType === EActionType.delete)  {
      console.log('submit delete')
      fetchDeleteDirect(editObj["id" as keyof object])
    }
  };

  const handleDelete = () => {

  }

  const clickOption = (option:IOption, title:string) => {
    console.log(title);
    console.log("option",option);
    if (title.endsWith('_title')) {
      const id = title.slice(0,title.length - 5) + "id";
      let newObj: any = {};
      newObj[title] = option.text;
      newObj[id] = option.value;
      newObj = { ...editObj, ...newObj };
      setEditObj(newObj);
    }
    setFocusRow('');
  };

  return (
    <div className="modal">
      <div className="modal-back" onClick={() => setShowModal(false)}></div>
      <form className="modal-box" onSubmit={handleSubmit}>
        <div className="modal-box-inner">
          <div className="exit-flex">
            <div className="exit-btn" onClick={() => setShowModal(false)}>
              X
            </div>
          </div>
          <div className="modal-title">
            {actionType !== EActionType.create && (
              <span>id {editObj["id" as keyof object]}</span>
            )}
            {actionType === EActionType.create && <span>New record</span>}
          </div>
          {actionType !== EActionType.delete && columns.map((el) => {
            if (el.title.endsWith("id")) return "";
            const zIndex = el.title===focusRow?100:0;
            return (
              <p key={el.title} className="modal-row" style={{zIndex: zIndex}}>
                <label className="modal-prop" htmlFor={el.title + "edit"}>
                  {el.title}
                </label>
                :
                <input
                  disabled = {actionType === EActionType.open}
                  className="modal-input"
                  id={el + "edit"}
                  value={editObj[el.title as keyof object]}
                  onChange={(e) =>
                    handleChangeInput(e, el.title as keyof object)
                  }
                  onFocus={(e) => handleFocusInput(e, el.title as keyof object)}
                />
                 {/* {!editObj[el.title as keyof object]?"fill":""} */}
                {el.title.endsWith("_title") &&
                  focusRow === el.title &&
                  el.getOptions && (
                    <ModalList
                      clickOption={(option:IOption) => clickOption(option,el.title)}
                      getList={el.getOptions}
                      value={editObj[el.title as keyof object]}
                    />
                  )}
              </p>
            );
          })}
          <div className="action-btns">
            {actionType !== EActionType.open && (
              <button
                type="button"
                className="modal-btn btn-cancel"
                onClick={() => setShowModal(false)}
              >
                cancel
              </button>
            )}
            {actionType !== EActionType.open &&
            actionType !== EActionType.delete &&
            (
              <button
                type="submit"
                className="modal-btn btn-save"
                disabled={disabled}
              >
                save
              </button>
            )}
            {actionType === EActionType.delete && (
              <button
                type="submit"
                className="modal-btn btn-delete"
                disabled={disabled}
                onClick={() => handleDelete()}
              >
                delete
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
