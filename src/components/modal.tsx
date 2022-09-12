import React, { FC, useEffect, useState } from "react";
import { EActionType } from "../models/models";

interface IModal {
  setShowModal: Function;
  obj: object;
  actionType: EActionType;
  fetchUpdate:Function
  updateData:Function
}

export const Modal: FC<IModal> = ({ setShowModal, obj, actionType, fetchUpdate,updateData }) => {

  const [editObj, setEditObj] = useState(obj);

  const [fetchUpdateDirect,{isFulfilled,isError,isLoading,data}] = fetchUpdate()

  useEffect(() => {
    console.log('datarow')
    console.log('isLoading',isLoading)
    console.log('isFulfilled',isFulfilled)
    // setShowModal(false)
    updateData()
  }, [data])

  useEffect(()=>{
    console.log('isError',isError)
    if (isError) {

    }
  },[isError])

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

  const handleSubmit = (e:React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit')
    fetchUpdateDirect(editObj);
  }

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
          id {editObj["id" as keyof object]}
          </div>
          {actionType === EActionType.open &&
            Object.keys(editObj).map((el) => {
              if (el==='id') return ""
              return (
                <p>
                <span className="modal-prop">{el}</span>:{editObj[el as keyof object]}
              </p>
                )
            })}
          {actionType === EActionType.edit &&
            Object.keys(editObj).map((el) => {
              if (el==='id') return ""
              return (
                <p>
                  <label className="modal-prop" htmlFor={el}>{el}</label>:
                  <input className="modal-input"
                    id={el}
                    value={editObj[el as keyof object]}
                    onChange={(e) => handleChangeInput(e, el as keyof object)}
                  />
                </p>
              );
            })}
          <div className="action-btns">
          {actionType !== EActionType.open && <button className="modal-btn btn-cancel">cancel</button>}
          {actionType !== EActionType.open && <button type="submit" className="modal-btn btn-save">save</button>}
          </div>
        </>
      </form>
    </div>
  );
};
