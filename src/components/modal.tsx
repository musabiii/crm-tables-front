import React, { FC, useState } from "react";
import { EActionType } from "../models/models";

interface IModal {
  setShowModal: Function;
  obj: object;
  actionType: EActionType;
}

export const Modal: FC<IModal> = ({ setShowModal, obj, actionType }) => {
  // console.log(obj);
  for (let v in obj) {
    console.log(v);
  }

  const [editObj, setEditObj] = useState(obj);

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
  }

  return (
    <div className="modal">
      <div className="modal-back" onClick={() => setShowModal(false)}></div>
      <form className="modal-box" onSubmit={handleSubmit}>
        <>
          <div className="exit-flex">
            <div className="exit-btn" onClick={() => {}}>
              X
            </div>
          </div>
          modal box
          {actionType === EActionType.open &&
            Object.keys(editObj).map((el) => (
              <p>
                {el}:{editObj[el as keyof object]}
              </p>
            ))}
          {actionType === EActionType.edit &&
            Object.keys(editObj).map((el) => {
              return (
                <p>
                  <label htmlFor={el}>{el}</label>:
                  <input
                    id={el}
                    value={editObj[el as keyof object]}
                    onChange={(e) => handleChangeInput(e, el as keyof object)}
                  />
                </p>
              );
            })}
          <div className="action-btns">
            <button className="cancel">cancel</button>
            <button type="submit" className="save">save</button>
          </div>
        </>
      </form>
    </div>
  );
};
