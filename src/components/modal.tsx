import React, { FC, useEffect, useState } from "react";
import { EActionType } from "../models/models";

interface IModal {
  setShowModal: Function;
  obj: object;
  actionType: EActionType;
  fetchUpdate: Function;
  fetchCreate: Function;
  updateData: Function;
  createProps: string[];
}

export const Modal: FC<IModal> = ({
  setShowModal,
  obj,
  actionType,
  fetchUpdate,
  updateData,
  createProps,
  fetchCreate,
}) => {
  const baseObject = actionType === EActionType.create ? {} : obj;
  const [editObj, setEditObj] = useState(baseObject);
  const [disabled, setDisabled] = useState(false)

  const [fetchUpdateDirect, { isFulfilled, isLoading, data }] =
    fetchUpdate();
  const [fetchCreateDirect, { data: createData }] = fetchCreate();

  useEffect(() => {
    console.log("datarow");
    console.log("isLoading", isLoading);
    console.log("isFulfilled", isFulfilled);
    // setShowModal(false)
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

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submit");
    if (actionType === EActionType.edit) {
      fetchUpdateDirect(editObj);
    } else if (actionType === EActionType.create) {
      createProps.forEach((el) => {
        if (!editObj[el as keyof object] && editObj[el as keyof object] !== 'id') {
          console.log('fill',el)
        }
      });

      fetchCreateDirect(editObj);
    }
  };

  return (
    <div className="modal">
      <div className="modal-back" onClick={() => setShowModal(false)}></div>
      <form className="modal-box" onSubmit={handleSubmit}>
        <>
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
          {actionType === EActionType.open &&
            Object.keys(editObj).map((el) => {
              if (el === "id") return "";
              return (
                <p key={el}>
                  <span className="modal-prop">{el}</span>:
                  {editObj[el as keyof object]}
                </p>
              );
            })}
          {actionType === EActionType.edit &&
            Object.keys(editObj).map((el) => {
              if (el === "id") return "";
              return (
                <p key={el}>
                  <label className="modal-prop" htmlFor={el + "edit"}>
                    {el}
                  </label>
                  :
                  <input
                    className="modal-input"
                    id={el + "edit"}
                    value={editObj[el as keyof object]}
                    onChange={(e) => handleChangeInput(e, el as keyof object)}
                  />
                </p>
              );
            })}
          {actionType === EActionType.create &&
            createProps.map((el) => {
              if (el === "id") return "";
              return (
                <p key={el}>
                  <label className="modal-prop" htmlFor={el + "create"}>
                    {el}
                  </label>
                  :
                  <input
                    className="modal-input"
                    id={el + "create"}
                    value={editObj[el as keyof object]}
                    onChange={(e) => handleChangeInput(e, el as keyof object)}
                  />
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
            {actionType !== EActionType.open && (
              <button type="submit" className="modal-btn btn-save" disabled = {disabled}>
                save
              </button>
            )}
          </div>
        </>
      </form>
    </div>
  );
};
