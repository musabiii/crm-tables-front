import React, { FC, useEffect, useState } from "react";
import { IOption } from "../models/models";

interface IMoldaList {
  getList: Function;
  value: string;
  clickOption:Function
}

export const ModalList: FC<IMoldaList> = ({ getList, value,clickOption }) => {

    const [boundValue, setBoundValue] = useState(value)

    useEffect(() => {

      let ttime = setTimeout(() => {
        setBoundValue(value);
      }, 500);

      return () => {
        console.log("ttime",ttime);
        clearTimeout(ttime);
      }
    }, [value])



  const { data: optionsData } = getList({ title: boundValue });
  console.log("optionsData", optionsData);

  const options: IOption[] = optionsData as IOption[];

  const handleClick = (el:IOption) => {
    console.log(el);
    clickOption(el);
  }

  return (
    <div className="modal-list">
      {optionsData &&
        options.map((el) => {
          return (
            <div className="modal-list__el"
            onClick={()=>handleClick(el)}>
              <p>{el.value}:{el.text}</p>
            </div>
          );
        })}
    </div>
  );
};
