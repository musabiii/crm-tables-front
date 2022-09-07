import { FC } from "react";

interface IModal {
    setShowModal:Function
    obj:object
}

export const Modal: FC<IModal> = ({setShowModal,obj}) => {
    console.log(obj)
    for (let v in obj) {
        console.log(v)
    }
  return (
    <div className="modal">
      <div className="modal-back" onClick={() => setShowModal(false)} ></div>
      <div className="modal-box">
        <>
        modal box
        {Object.keys(obj).map(el=><p>{el}:{obj[el as keyof object]}</p>)}
        </>
      </div>
    </div>
  );
};
